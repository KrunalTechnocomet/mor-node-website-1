const OfficialHost = require("../models/applicationofficialhost");
const { uploadFileToS3 } = require("../services/s3.js");
const {
  PENDING,
  APPROVED,
  REJECTED,
  WAITLISTED,
} = require("../constants/application-official-host.js");
const User = require("../models/user.js");
const Staff = require("../models/staff.js");
const { imageType } = require("../constants/image-types.js");
const {
  MobileNotVerifiedError,
  NoUserError,
  DataNotAvailable,
  FailedOperationError,
  AbsenceOfRequiredField,
} = require("../errors/auth.js");
const { ApplicationAlreadyRegistered } = require("../errors/general.js");
const { role, staffRoleObj } = require("../constants/roles.js");
const Zone = require("../models/zone.js");
const { CELEBRITY, OFFICIAL_HOST } = require("../constants/host-types.js");
const { bucketNameForOfficialHostImage } = require("../constants/bucketList.js");

const shortId = () => Math.floor(100000 + Math.random() * 900000);

exports.createOfficialHost = async (req, res, next) => {
  try {
    const { talentTags, countryCode, clubId, input, country, state, hostTypes } =
      req.body;
     var Documents = req.files
     console.log("req.files",Documents);

     for (let index = 0; index < Documents.length; index++) {
      const element = Documents[index];
      const s3Path = `uploads/${element.fieldname}/${element.filename}`;
      const results = await uploadFileToS3(element.path, s3Path, {
        ContentType: element.mimetype,
        Bucket: bucketNameForOfficialHostImage,
      });
      console.log(results);
    }
     return  res.json({
      status: true,
      message:"hi",
      statusCode: 200,
      response: "result",
    });
    const user = await User.findOne({ mobile, countryCode });
    const searchQuery = {};

    if (!user) {
      const error = new MobileNotVerifiedError();
      return next(error);
    }

    if (clubId) {
      Object.assign(searchQuery, {
        morId: { $regex: clubId, $options: "i" },
        role: staffRoleObj.CLUB,
      });

      const clubHeadDetails = await Staff.findOne(searchQuery);

      if (!clubHeadDetails) {
        const error = new NoUserError(clubId);
        console.log(error);
        return next(error);
      }
      req.body.clubId = clubHeadDetails?.id;
      req.body.clubName =
        clubHeadDetails?.firstName + " " + clubHeadDetails?.lastName;
      req.body.clubOwner = clubHeadDetails?.displayName;
      req.body.admin = clubHeadDetails?.admin;
    }

    const userAlreadyRegistered = await OfficialHost.find({ morId });

    let applicationAlreadyExist = userAlreadyRegistered?.some((userDetails) => {
      if (userDetails && userDetails?.status !== REJECTED) {
        return true;
      }
    });

    if (applicationAlreadyExist) {
      const error = new ApplicationAlreadyRegistered();
      return next(error);
    }
    const zoneDetails = await Zone.findOne({
      country,
      states: { $in: [state] },
    });

    if (!zoneDetails) {
      req.body.zone = null;
      req.body.zoneName = "UNASSIGNED";
    }
    req.body.zone = zoneDetails?.id;
    req.body.zoneName = zoneDetails?.name;

    const userDetails = await User.findOne({ morId });
    req.body.displayName = userDetails?.displayName;

    if (!userDetails) {
      const error = new NoUserError(morId);
      return next(error);
    }

    switch (hostTypes) {
      case CELEBRITY:
        await User.findOneAndUpdate({ morId }, { isCelebrity: true });
        break;
      case OFFICIAL_HOST:
        await User.findOneAndUpdate({ morId }, { isOfficialHost: true });
        break;
      default:
        console.log("Host Type not updated");
        break;
    }

   
    const officalhost = new OfficialHost(req.body);
    const result = await officalhost.save();

    if (!result) {
      const error = new FailedOperationError("Register");
      return next(error);
    }

    const message = 0;
    req.body.zone === "UNASSIGNED"
      ? "We have recieved your application, we will get back to you shortly"
      : "Registration complete";

    res.json({
      status: true,
      message,
      statusCode: 200,
      response: result,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplications = async (req, res, next) => {
  try {
    const { offset, limit, morId, status, startDate, endDate, country, zone } =
      req.query;
    const searchQuery = {};
    const { tokenData } = req;

    if (!offset || !limit) {
      const error = new AbsenceOfRequiredField("Offset and Limit");
      return next(error);
    }
    if (morId) {
      Object.assign(searchQuery, {
        morId: { $regex: morId, $options: "i" },
      });
    }

    if (tokenData?.role === staffRoleObj.COUNTRY_HEAD) {
      const countryHeadDetails = await User.findOne({ id: tokenData?.userId });
      searchQuery.country = countryHeadDetails?.country;
    }

    if (tokenData?.role === staffRoleObj.ZONAL_HEAD) {
      const zonalHeadDetails = await User.findOne({ id: tokenData?.userId });
      searchQuery.zone = zonalHeadDetails?.zone;
    }

    if (status) {
      searchQuery.status = {
        $in: Array.isArray(status) ? status : [status],
      };
    }

    if (country) {
      searchQuery.country = {
        $in: Array.isArray(country) ? country : [country],
      };
    }

    if (zone) {
      searchQuery.zoneName = {
        $in: Array.isArray(zone) ? zone : [zone],
      };
    }
    if (startDate && endDate) {
      searchQuery.createdAt = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    const [result, total] = await Promise.all([
      OfficialHost.find(searchQuery)
        .skip(+offset)
        .limit(+limit),
      OfficialHost.countDocuments(searchQuery),
    ]);

    res.json({
      result,
      total,
    });
  } catch (error) {
    next(error);
  }
};

exports.getApplicationByMorId = async (req, res, next) => {
  try {
    const result = await OfficialHost.findOne({ morId: req.params.morId });
    res.json({ statusCode: 200, status: true, response: result });
  } catch (err) {
    next(err);
  }
};

exports.getApplicationById = async (req, res, next) => {
  try {
    const result = await OfficialHost.findOne({ id: req.params.id }); //application's Id
    res.json({ statusCode: 200, status: true, response: result });
  } catch (error) {
    next(error);
  }
};

exports.getOfficialApplicationStatusStats = async (req, res, next) => {
  try {
    const { tokenData } = req;
    const searchQuery = {};

    if (tokenData?.role === staffRoleObj.COUNTRY_HEAD) {
      const countryHeadDetails = await User.findOne({ id: tokenData?.userId });
      searchQuery.country = countryHeadDetails?.country;
    }

    if (tokenData?.role === staffRoleObj.ZONAL_HEAD) {
      const zonalHeadDetails = await User.findOne({ id: tokenData?.userId });
      searchQuery.zone = zonalHeadDetails?.zone;
    }
    const [totalPending, totalApproved, totalRejected, totalWaitlisted] =
      await Promise.all([
        OfficialHost.countDocuments({ ...searchQuery, status: PENDING }),
        OfficialHost.countDocuments({ ...searchQuery, status: APPROVED }),
        OfficialHost.countDocuments({ ...searchQuery, status: REJECTED }),
        OfficialHost.countDocuments({ ...searchQuery, status: WAITLISTED }),
      ]);

    res.json({
      totalPending,
      totalWaitlisted,
      totalRejected,
      totalApproved,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateApplication = async (req, res, next) => {
  try {
    const { status, id } = req.body;

    if (status === APPROVED) {
      req.body.status = status;
      req.body.isApproved = true;
      const result = await OfficialHost.findOneAndUpdate({ id }, req.body);
      res.json({ statusCode: 200, status: true, response: result });
      return;
    }
    if (status === REJECTED) {
      const result = await OfficialHost.findOneAndUpdate(
        { id },
        {
          status: REJECTED,
        }
      );
      res.json({ statusCode: 200, status: true, response: result });
      return;
    }
    if (status === WAITLISTED) {
      const result = await OfficialHost.findOneAndUpdate(
        { id },
        {
          status: WAITLISTED,
        }
      );
      res.json({ statusCode: 200, status: true, response: result });
      return;
    }
  } catch (error) {
    next(error);
  }
};
exports.uploadImage = async (req, res, next) => {
  try {
    const { userId } = req.tokenData;
    if (!req.file) {
      const error = new AbsenceOfRequiredField("Image");
      return next(error);
    }
    const { type } = req.body;

    if (!type) {
      const error = new AbsenceOfRequiredField("Type Of Image");
      return next(error);
    }

    if (!imageType.includes(type)) {
      const error = new DataNotAvailable(type);
      return next(error);
    }

    const s3Path = `uploads/${type}/${req.file.filename}`;
    const result = await uploadFileToS3(req.file.path, s3Path, {
      ContentType: req.file.mimetype,
      Bucket: bucketNameForOfficialHostImage,
    });

    res.json({
      status: true,
      ImageType: `${type}`,
      statusCode: 200,
      response: result.Location,
    });
  } catch (error) {
    next(error);
  }
};