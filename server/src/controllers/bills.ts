import { Request, Response } from "express";
import { getActor } from "./actor";
import axios from "axios";
import { audience } from "../constants";

export const payBills = async (req: Request, res: Response) => {
  try {
    const {
      subscriberAccountNumber,
      amount,
      billerId,
      referenceId,
      additionalInfo,
      txnId,
      cashback,
    } = req.body;
    const accessToken = req.cookies.reloadly_access_token;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    if (
      !subscriberAccountNumber ||
      !amount ||
      !billerId ||
      !referenceId ||
      !additionalInfo ||
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
      subscriberAccountNumber: subscriberAccountNumber,
      amount: amount,
      billerId: billerId,
      referenceId: referenceId,
      additionalInfo: additionalInfo,
    };

    const response = await axios.post(
      `https://bills${audience}.reloadly.com/pay`,
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
      const _res = await actor.cashbackTxn(BigInt(txnId), cashback.percentage);
      if ("err" in _res) {
        return res.status(400).json({ error: _res.err });
      } else {
        return res.json(response.data);
      }
    }

    const res3 = await actor.completeTxn(BigInt(txnId));

    if ("err" in res3) {
      return res.status(400).json({ error: res3.err });
    }

    res.json(response.data);
  } catch (error) {
    console.error("Error paying bills:", error);

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

export const getBillers = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.reloadly_access_token;

    const { countryCode } = req.query;

    if (!accessToken) {
      return res.status(401).json({ error: "Access token not found" });
    }

    const response = await axios.get(
      `https://utilities${audience}.reloadly.com/billers?id=12&name=Eko%20Electricity&type=ELECTRICITY_BILL_PAYMENT&serviceType=PREPAID&countryISOCode=KE&page=1&size=10`,
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

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching billes:", error);

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
