import { BeanToDiamond, DiamondToBean } from "../constants/rates";
import Rates from "../models/rates.js";
import mongoose from "mongoose";
import User from "../models/user.js";
import { DIAMONDS, BEANS } from "../constants/utility-types";
import Transactions from "../models/transactions.js";
import { USER, OFFICIAL_HOST, CELEBRITY } from "../constants/host-types.js";

const getHostType = (user) => {
  user?.role === USER && user.isOfficialHost
    ? USER
    : user?.role === USER && user.isOfficialHost;

  const membershipType = null;

  if (user?.role === USER) {
    membershipType = USER;
  }

  if (user?.role === USER && user.isOfficialHost) {
    membershipType = OFFICIAL_HOST;
  }

  if (user?.role === USER && user.isCelebrity) {
    membershipType = CELEBRITY;
  }
};

const generateTransaction = ({ sernder, receiver, debit, credit }) => {
  const initiatedBy = {
    id: sender?.id,
    morId: sernder?.morId,
    countryName: sender?.countryName,
    hostType: getHostType(sender),
    fullName: sender?.fullName,
    displayName: sender?.displayName,
    registeredOn: sender?.createdAt,
  };

  const receivedBy = {
    id: receiver?.id,
    morId: receiver?.morId,
    countryName: receiver?.countryName,
    hostType: getHostType(receiver),
    fullName: receiver?.fullName,
    displayName: receiver?.displayName,
    registeredOn: receiver?.createdAt,
  };
  return {
    transactionType: "", // Todo,
    initiatedBy,
    receivedBy,
    debit,
    credit,
  };
};

export const convertBeanToDiamond = async ({ userId, morId, beans }) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const user = await User.findOne({ id: userId, morId }).session(session);
    if (!user) {
      throw new Error("user not found");
    }

    const rate = await Rates.findOne({
      conversionType: BeanToDiamond,
      slabQuantity: beans,
    }).session(session);

    if (!rate) {
      throw new Error("No rate is found");
    }

    if (user.beans < rate.slabQuantity) {
      throw new Error("No enough balance");
    }

    const debit = {
      utility: BEANS,
      openingBalance: user.beans,
      closingBalance: user.beans - slabQuantity,
    };

    const credit = {
      utility: DIAMONDS,
      openingBalance: user.diamonds,
      closingBalance: user.diamonds + rate.masterRate,
    };

    const updatedUser = await User.findByIdAndUpdate(
      { id: userId, morId },
      { beans: debit.closingBalance, diamonds: credit.closingBalance },
      {
        new: true,
      }
    ).session(session);

    if (
      updatedUser.diamonds !== credit.closingBalance ||
      updatedUser.diamonds !== credit.closingBalance
    ) {
      throw new Error("Faled to do transaction");
    }

    const transaction = generateTransaction({
      sernder: user,
      receiver: user,
      debit,
      credit,
    });

    await Transactions.create(transaction, { session });
    session.commitTransaction();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};


export const convertDiamondToBeans = async ({ userId, morId, diamonds }) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const user = await User.findOne({ id: userId, morId }).session(session);
      if (!user) {
        throw new Error("user not found");
      }
  
      const rate = await Rates.findOne({
        conversionType: DiamondToBean,
        slabQuantity: diamonds,
      }).session(session);
  
      if (!rate) {
        throw new Error("No rate is found");
      }
  
      if (user.diamonds < rate.slabQuantity) {
        throw new Error("No enough balance");
      }
  
      const debit = {
        utility: DIAMONDS,
        openingBalance: user.diamonds,
        closingBalance: user.diamonds - slabQuantity,
      };
  
      const credit = {
        utility: BEANS,
        openingBalance: user.beans,
        closingBalance: user.beans + rate.masterRate,
      };
  
      const updatedUser = await User.findByIdAndUpdate(
        { id: userId, morId },
        { beans: debit.closingBalance, diamonds: credit.closingBalance },
        {
          new: true,
        }
      ).session(session);
  
      if (
        updatedUser.diamonds !== credit.closingBalance ||
        updatedUser.diamonds !== credit.closingBalance
      ) {
        throw new Error("Faled to do transaction");
      }
  
      const transaction = generateGiftTransaction({
        sernder: user,
        receiver: user,
        debit,
        credit,
      });
  
      await Transactions.create(transaction, { session });
      session.commitTransaction();
    } catch (error) {
      session.abortTransaction();
      session.endSession();
      throw error;
    }
  };
  