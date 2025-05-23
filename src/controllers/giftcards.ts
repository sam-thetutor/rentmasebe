import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { getActor } from "./actor";
import { audience } from "../constants";
dotenv.config();

export const getCountryGiftCards = async (req: Request, res: Response) => {
  try {
    console.log("country code ", req);
    const { countryCode } = req.query;
    console.log('Cookies received:', req.cookies); // Debug log

    // const accessToken = req.cookies["reloadly_access_token"];
    const accessToken = 'eyJraWQiOiJjNGE1ZWU1Zi0xYmE2LTQ1N2UtOTI3Yi1lYzdiODliNzcxZTIiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyNjMyOSIsImlzcyI6Imh0dHBzOi8vcmVsb2FkbHktc2FuZGJveC5hdXRoMC5jb20vIiwiaHR0cHM6Ly9yZWxvYWRseS5jb20vc2FuZGJveCI6dHJ1ZSwiaHR0cHM6Ly9yZWxvYWRseS5jb20vcHJlcGFpZFVzZXJJZCI6IjI2MzI5IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwiYXVkIjoiaHR0cHM6Ly9naWZ0Y2FyZHMtc2FuZGJveC5yZWxvYWRseS5jb20iLCJuYmYiOjE3NDQ1NzE2NTksImF6cCI6IjI2MzI5Iiwic2NvcGUiOiJkZXZlbG9wZXIiLCJleHAiOjE3NDQ2NTgwNTksImh0dHBzOi8vcmVsb2FkbHkuY29tL2p0aSI6IjU0ODFjNWM2LTFhZWEtNGU3Ni05Y2MzLThjYWI4NWEzMzE1MSIsImlhdCI6MTc0NDU3MTY1OSwianRpIjoiM2MyNWQ0MmQtYzk3Mi00ZjY0LWI3YzItZmI3M2Q5MWNjZDNhIn0.5p7bWr94hKnVFvhxO4lR3kCUzFlbFhUWIJKqygNLiB4';
    console.log("accessToken", accessToken);

    if (!accessToken) {
      console.log('No access token found in cookies'); // Debug log
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
    console.log("req.body cccccccccccc", req.body);
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
    const res1 = await actor.transferTransaction(txnId);

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
      await actor.refundFailedTxn(txnId);
      return res.status(400).json({ error: response.data.error });
    }

    const reloadlyTxnId = String(response.data.transactionId);
    
    if (cashback) {
      const _res = await actor.cashbackTxn(
        txnId,
        Number(cashback),
        reloadlyTxnId
      );
      if ("err" in _res) {
        console.log("Error cashbacking txn:", _res.err);
        return res.status(400).json({ error: _res.err });
      } else {
        return res.json(response.data);
      }
    }

    const res3 = await actor.completeTxn(txnId, reloadlyTxnId);

    if ("err" in res3) {
      return res.status(400).json({ error: res3.err });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error buying gift card:", error);

    if (error.response) {
      res
        .status(error.response.status)
        .json({ error: error.response.data});
    } else if (error.request) {
      res.status(500).json({ error: "No response received from Reloadly API" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};
