import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { getActor } from "./actor";
import { audience } from "../constants";
dotenv.config();

export const getCountryGiftCards = async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.query; 
    const accessToken = req.cookies.reloadly_access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    if (!countryCode) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const response = await axios.get(
      `https://giftcards${audience}.reloadly.com/countries/${countryCode}/products`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error getting gift cards:", error);

    if (error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from Reloadly API" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const buyGiftCard = async (req: Request, res: Response) => {
  try {
    const {
      countryCode,
      productId,
      unitPrice,
      recipientEmail,
      recipientPhone,
      customIdentifier,
      quantity,
      senderName,
      txnId,
      cashback,
    } = req.body;
    const accessToken = req.cookies.reloadly_access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    if (
      !countryCode ||
      !productId ||
      !quantity ||
      !unitPrice ||
      !recipientPhone ||
      !recipientEmail ||
      !senderName ||
      !txnId
    ) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const actor = await getActor();
    const res1 = await actor.transferTransaction(BigInt(txnId));

    if ("err" in res1) {
      return res.status(400).json({ error: res1.err });
    }

    const payload = {
      productId: productId,
      countryCode: countryCode,
      quantity: quantity,
      unitPrice: unitPrice,
      customIdentifier,
      recipientEmail: recipientEmail,
      recipientPhoneDetails: {
        countryCode: countryCode,
        phoneNumber: recipientPhone,
      },
    };

    const response = await axios.post(
      `https://giftcards${audience}.reloadly.com/orders`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.error) {
      return res.status(400).json({ error: response.data.error });
    }

    if (cashback) {
      const _res = await actor.cashbackTxn(BigInt(txnId), cashback.percentage, response.data.transactionId);
      if ("err" in _res) {
        console.log("Error cashbacking txn:", _res.err);
        return res.status(400).json({ error: _res.err });
      } else {
        return res.json(response.data);
      }
    }

    const res3 = await actor.completeTxn(BigInt(txnId), response.data.transactionId);

    if ("err" in res3) {
      return res.status(400).json({ error: res3.err });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error buying gift card:", error);

    if (error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).json({ error: "No response received from Reloadly API" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
