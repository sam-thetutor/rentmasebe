import axios from "axios";
import dotenv from "dotenv";
import { Request, Response } from "express";
import { getActor } from "./actor";
import { audience } from "../constants";
dotenv.config();

export const airTimeDataTopUp = async (req: Request, res: Response) => {
  try {
    const {
      phoneNumber,
      amount,
      countryCode,
      operatorId,
      useLocalAmount = false,
      txnId,
      cashback,
    } = req.body;
    
    const accessToken = req.cookies.reloadly_access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    if (!phoneNumber || !amount || !countryCode || !operatorId || !txnId) {
      return res
        .status(400)
        .json({
          error: `Missing required parameters ${phoneNumber} ${amount} ${countryCode} ${operatorId} ${txnId}`,
        });
    }

    const actor = await getActor();
    const res1 = await actor.transferTransaction(BigInt(txnId));

    if ("err" in res1) {
      return res
        .status(400)
        .json({ error: `Failed to transfer txn tokens: ${res1.err}` });
    }

    const senderPhone = {
      countryCode: process.env.RELOADLY_SENDER_PHONE_COUNTRY_CODE,
      number: process.env.RELOADLY_SENDER_PHONE_NUMBER,
    };

    const payload = {
      recipientPhone: {
        countryCode,
        number: phoneNumber,
      },
      amount: amount,
      operatorId: operatorId,
      useLocalAmount: useLocalAmount,
      senderPhone: senderPhone,
    };

    const response = await axios.post(
      `https://topups${audience}.reloadly.com/topups`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.data.error) {
      return res
        .status(400)
        .json({ error: `Failed to top-up airtime: ${response.data.error}` });
    }

    
    const reloadlyTxnId = String(response.data.transactionId);

    if (cashback) {
      const _res = await actor.cashbackTxn(BigInt(txnId), cashback.percentage, reloadlyTxnId);
      if ("err" in _res) {
        return res
          .status(400)
          .json({ error: `Failed to cashback transaction: ${_res.err}` });
      } else {
        return res.json(response.data);
      }
    }

    const res3 = await actor.completeTxn(BigInt(txnId), reloadlyTxnId);

    if ("err" in res3) {
      return res.status(400).json({
        error: `Failed to complete transaction: ${res3.err}`,
      });
    }
    res.json(response.data);
  } catch (error) {
    console.error("Error processing airtime top-up:", error);

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

export const getNumberOperator = async (req: Request, res: Response) => {
  try {
    const { countryCode, phoneNumber, iso } = req.query;
    const accessToken = req.cookies.reloadly_access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    if (!countryCode) {
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const response = await axios.get(
      `https://topups${audience}.reloadly.com/operators/auto-detect/phone/${phoneNumber}/countries/${iso}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error getting operators:", error);

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

export const getCountryOperators = async (req: Request, res: Response) => {
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
      `https://topups${audience}.reloadly.com/operators/countries/${countryCode}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
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

export const getAllOperators = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.reloadly_access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    const response = await axios.get(
      "https://topups${audience}.reloadly.com/operators",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error getting operators:", error);

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
