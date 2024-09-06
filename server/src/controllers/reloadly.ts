import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();
import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { _SERVICE } from './rentmase_backend.did';

//@ts-ignore
const idlFactory = ({ IDL }) => {
  const TxnStatus = IDL.Variant({
    'TokensTransfered' : IDL.Null,
    'Initiated' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransferData = IDL.Record({ 'from' : Account, 'amount' : IDL.Nat });
  const GiftCardPurchase = IDL.Record({
    'productId' : IDL.Text,
    'countryCode' : IDL.Text,
    'quantity' : IDL.Int,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
    'recipientEmail' : IDL.Text,
  });
  const BillsPayment = IDL.Record({
    'subscriberAccount' : IDL.Text,
    'reference' : IDL.Text,
    'billerId' : IDL.Text,
    'amount' : IDL.Text,
    'biller' : IDL.Text,
  });
  const AirtimeTopup = IDL.Record({
    'operator' : IDL.Text,
    'countryCode' : IDL.Text,
    'operaterId' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
  });
  const DataTopup = IDL.Record({
    'operator' : IDL.Text,
    'countryCode' : IDL.Text,
    'operaterId' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
  });
  const TxnType = IDL.Variant({
    'GiftCardPurchase' : GiftCardPurchase,
    'BillsPayment' : BillsPayment,
    'AirtimeTopup' : AirtimeTopup,
    'DataTopup' : DataTopup,
  });
  const Time = IDL.Int;
  const InternalTxn = IDL.Record({
    'id' : IDL.Nat,
    'status' : TxnStatus,
    'userEmail' : IDL.Text,
    'transferData' : TransferData,
    'txnType' : TxnType,
    'userPrincipal' : IDL.Principal,
    'timestamp' : Time,
  });
  const Result_1 = IDL.Variant({ 'ok' : InternalTxn, 'err' : IDL.Text });
  const Rentmase = IDL.Service({
    'completeTxn' : IDL.Func([IDL.Int], [Result_1], []),
    'transferTransaction' : IDL.Func([IDL.Int], [Result_1], []),
  });
  return Rentmase;
};



const getActor = async () => {
const agent = await HttpAgent.create({
  host: "http://localhost:4943",
});

if (process.env.ENV === 'local') {
  agent.fetchRootKey();
}

const actor : ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.CANISTER_ID,
});
return actor;
};

export const airTimeDataTopUp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, amount, countryCode, operatorId, useLocalAmount = false, txnId } = req.body;
    const accessToken = req.cookies.reloadly_access_token;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token not found' });
    }

    if (!phoneNumber || !amount || !countryCode || !operatorId || !txnId) {
      console.log("phoneNumber", phoneNumber, "amount", amount, "countryCode", countryCode, "operatorId", operatorId);
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const actor = await getActor();

    const res1 = await actor.transferTransaction(txnId);

    if ("err" in res1) {
      console.log("res1", res1);
      return res.status(400).json({ error: res1.err });
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
      'https://topups-sandbox.reloadly.com/topups',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log("response", response);

    if (response.data.error) {
      return res.status(400).json({ error: response.data.error });
    }

    const res3 = await actor.completeTxn(txnId);

    if ("err" in res3) {
      console.log("res3", res3);
      return res.status(400).json({ error: res3.err });
    }
    res.json(response.data);
  } catch (error) {
    console.error('Error processing airtime top-up:', error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).json({ error: 'No response received from Reloadly API' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
};

export const getNumberOperator = async (req: Request, res: Response) => {
  try {
    const { countryCode, phoneNumber, iso } = req.query;
    const accessToken = req.cookies.reloadly_access_token;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token not found' });
    }

    if (!countryCode) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await axios.get(
      `https://topups-sandbox.reloadly.com/operators/auto-detect/phone/${phoneNumber}/countries/${iso}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error getting operators:', error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).json({ error: 'No response received from Reloadly API' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

export const getCountryOperators = async (req: Request, res: Response) => {
  try {
    const { countryCode } = req.query;
    const accessToken = req.cookies.reloadly_access_token;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token not found' });
    }

    if (!countryCode) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const response = await axios.get(
      `https://topups-sandbox.reloadly.com/operators/countries/${countryCode}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error getting operators:', error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).json({ error: 'No response received from Reloadly API' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

export const getAllOperators = async (req: Request, res: Response) => {
  try {
    const accessToken = req.cookies.reloadly_access_token;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token not found' });
    }

    const response = await axios.get(
      'https://topups-sandbox.reloadly.com/operators',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error getting operators:', error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data.message });
    } else if (error.request) {
      res.status(500).json({ error: 'No response received from Reloadly API' });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
}

