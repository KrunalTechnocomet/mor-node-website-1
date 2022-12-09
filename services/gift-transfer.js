import Gifts from "../models/gift.js";
import Transactions from "../models/transactions.js";
import Rates from "../models/rates.js";
import mongoose from "mongoose";
import Users from "../models/user.js";
import { USER } from "../constants/roles.js";
import { GIFT_TRANSACTION } from "../constants/transaction-types.js";
import { CELEBRITY, OFFICIAL_HOST } from "../constants/host-types.js";
import Levels from "../models/levels.js";
import axios from "axios";
import TransactionInitiation from "../models/transaction-initiation.js";
import { FIAT_TO_DIAMONDS } from "../constants/transaction-types.js";
const rzrpayId = process.env.RAZORPAY_KEY_ID;
const rzrpaySecret = process.env.RAZORPAY_KEY_SECRET;
/**
 * Gift transaction
 * {
 *  id: {uuid},
 * transactionType: 'GIFT_TRANSACTION',
 *  initiatedBy: {
 *    id: 10000,
 *    morId: 10000,
 *    country: India,
 *    membershipType: SILVER
 *    host: ISOFFICIALHOST,
 *    fullName: Nagaraj,
 *    displayName: Test,
 *    openingBalance: 1000
 *    clsingBalance: 900,
 *    registeredOn: 20/10/2021
 *  },
 * receivedBy: {
 *    id: 10001,
 *    morId: 10001,
 *    country: India,
 *    membershipType: SILVER
 *    host: USER,
 *    fullName: Nagaraj,
 *    displayName: Test,
 *    openingBalance: 200,
 *    clsingBalance: 300,
 *    registeredOn: 10/10/2021
 *  },
 * giftID:
 * utility: DIAMONDS,
 * utilityQuantity: 10,
 * giftQuantity: 1
 * }
 */

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

const generateGiftTransaction = ({
  sender,
  receiver,
  senderBalance,
  receierBlance,
  giftDetails,
  giftQuantity,
}) => {
  const initiatedBy = {
    id: sender?.id,
    morId: sender?.morId,
    countryName: sender?.countryName,
    hostType: getHostType(sender),
    fullName: sender?.fullName,
    displayName: sender?.displayName,
    registeredOn: sender?.createdAt,
    ...senderBalance,
  };

  const receivedBy = {
    id: receiver?.id,
    morId: receiver?.morId,
    countryName: receiver?.countryName,
    hostType: getHostType(receiver),
    fullName: receiver?.fullName,
    displayName: receiver?.displayName,
    registeredOn: receiver?.createdAt,
    ...receierBlance,
  };
  return {
    transactionType: GIFT_TRANSACTION, // Todo,
    initiatedBy,
    receivedBy,
    giftId: giftDetails?.id,
    utilityType: giftDetails?.utilityType,
    utilityQuantity: giftDetails?.utilityValue,
    giftQuantity,
  };
};

const createTransaction = async (data, session) => {
  await Transactions.create(data, { session });
};

export const sendGift = async ({
  giftId,
  senderId,
  receiverId,
  giftQuantity,
}) => {
  const transactionId = uuid();
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const gift = await Gifts.findOne({ id: giftId, isActive: true });
    if (!gift) {
      throw new Error("Gift not found");
    }

    if (gift.utilityType === "DIAMONDS") {
      const [sender, receiver] = await Promise.all([
        Users.findOne({ id: senderId }).session(Session),
        Users.findOne({ id: receiverId }).session(Session),
      ]);

      if (!sender || !receiver) {
        throw new Error("Sender/receiver not found");
      }

      const senderData = {
        openingBalance: sender?.diamonds ?? 0,
        diamondsSent: sender?.sentDiamonds ?? 0,
        utility: "DIAMONDS",
        // expPoints: sender?.expPoints,
        // nextLevel: sender?.nextLevel,
      };

      const receiverData = {
        openingBalance: receiver?.beans ?? 0,
        beansReceived: receiver?.receivedBeans ?? 0,
        utility: "BEANS",
        // expPoints: reciever?.expPoints,
        // nextLevel: reciever?.nextLevel,
      };

      if (openingBalance < gift.utilityValue * giftQuantity) {
        throw new Error("Not enough diamonds to send gift");
      }
      senderExpStatus = sender?.isVip ? 8 : 6;
      recieverExpStatus = sender?.isVip ? 3 : 4;
      const senderDataAfterSendingGift = await Users.findOneAndUpdate(
        { id: senderId },
        {
          diamonds:
            senderData?.openingBalance - gift.utilityValue * giftQuantity,
          sentDiamonds:
            senderData?.diamondsSent + gift.utilityValue * giftQuantity,
          // expPoints:
          //   senderData?.expPoints +
          //   +senderExpStatus * (gift.utilityValue * giftQuantity),
        },
        {
          new: true,
        }
      ).session(session);

      const receiverDataAfterReceivinggGift = await Users.findOneAndUpdate(
        { id: receiverId },
        {
          beans:
            receiverData?.openingBalance + gift.utilityValue * giftQuantity,
          receivedBeans:
            receiverData?.beansReceived + gift.utilityValue * giftQuantity,
          // expPoints:
          //   receiverData?.expPoints +
          //   +recieverExpStatus * (gift.utilityValue * giftQuantity),
        },
        {
          new: true,
        }
      ).session(session);

      // sender level check
      // if (senderDataAfterSendingGift?.expPoints >= sender.nextLevel) {
      //   const getExp = await Levels.findOne({ level: +sender?.level + 1 });
      //   const userUpdate = await User.findOneAndUpdate(
      //     { id: sender.id },
      //     {
      //       nextLevel: getExp?.exp,
      //       level: +sender?.level + 1,
      //     },
      //     {
      //       new: true,
      //     }
      //   );
      // }

      // if (receiverDataAfterReceivinggGift?.expPoints >= reciever.nextLevel) {
      //   const getExp = await Levels.findOne({ level: +reciever?.level + 1 });
      //   const userUpdate = await User.findOneAndUpdate(
      //     { id: reciever.id },
      //     {
      //       nextLevel: getExp?.exp,
      //       level: +reciever?.level + 1,
      //     },
      //     {
      //       new: true,
      //     }
      //   );
      // }

      senderData.closingBalance = senderDataAfterSendingGift.diamonds;
      receiverData.closingBalance = receiverDataAfterReceivinggGift.beans;

      const transactionData = generateGiftTransaction({
        sender,
        receiver,
        senderBalance: senderData,
        receierBlance: receiverData,
        giftDetails: gift,
        giftQuantity,
      });

      await createTransaction(transactionData, session);

      session.commitTransaction();
      return true;
    }
    return false;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const buyDiamonds = async (transactionId, userId, paymentId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const rzrpayUrl = `https://${rzrpayId}:${rzrpaySecret}@api.razorpay.com/v1/payments/${paymentId}`;

    const result = await axios.get(rzrpayUrl);
    console.log("result", result);

    const transactionDetails = await TransactionInitiation.findOne({
      userId: userId,
      id: transactionId,
    }).session(session);
    console.log("transactionDetails", transactionDetails);

    const userDetails = await Users.findOne({ id: userId }).session(session);
    console.log("userDetails", userDetails);

    const userDiamonds = +userDetails?.diamonds ?? 0;
    console.log("userDiamonds", userDiamonds);

    if (result?.data?.status === "captured") {
      console.log("enetered captured loop");
      const paidAmt =
        Math.round((+(result?.data?.amount / 100) + Number.EPSILON) * 100) /
        100;
      const totalTax = (paidAmt / 118) * 18;
      const TaxOnAmount = totalTax - +result?.data?.tax / 100;
      const qbAmt = +paidAmt - (+totalTax + +result?.data?.fee / 100);

      if (paidAmt === transactionDetails?.masterRate) {
        console.log("enetered master rate");
        const userDiamondUpdate = await Users.findOneAndUpdate(
          { id: userId },
          {
            diamonds: userDiamonds + transactionDetails?.slabQuantity,
          },
          {
            new: true,
          }
        ).session(session);
        console.log("userDiamondUpdate", userDiamondUpdate);

        const transactionData = {
          id: transactionId,
          morId: userDetails?.morId,
          userId: userId,
          amount: paidAmt,
          taxOnAmount: Math.round((+TaxOnAmount + Number.EPSILON) * 100) / 100,
          platformCharges: +result?.data?.fee / 100 - +result?.data?.tax / 100,
          taxByPlatform: +result?.data?.tax / 100,
          qbAmount: Math.round((+qbAmt + Number.EPSILON) * 100) / 100,
          diamondsPurchased: +transactionDetails?.slabQuantity,
          transactionType: FIAT_TO_DIAMONDS,
        };
        await createTransaction(transactionData, session);
        session.commitTransaction();
        return true;
      } else {
        return false;
      }
    }
    return false;
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    throw error;
  }
};
