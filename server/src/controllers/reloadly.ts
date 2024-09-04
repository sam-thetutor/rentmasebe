import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config();
import { Actor, HttpAgent } from "@dfinity/agent";

//@ts-ignore
const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Reward = IDL.Record({
    'claimed' : IDL.Bool,
    'claimedAt' : IDL.Opt(Time),
    'timestamp' : Time,
    'amount' : IDL.Nat,
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'createdAt' : Time,
    'referrals' : IDL.Vec(IDL.Principal),
    'email' : IDL.Text,
    'lastupdated' : Time,
    'gender' : IDL.Opt(IDL.Text),
    'rewards' : IDL.Vec(Reward),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const PublicUser = IDL.Record({
    'id' : IDL.Principal,
    'referrals' : IDL.Vec(IDL.Principal),
    'rewards' : IDL.Vec(Reward),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Vec(Reward), 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const UserPayload = IDL.Record({
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'referrerCode' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserUpdatePayload = IDL.Record({
    'dob' : IDL.Opt(Time),
    'refferalCode' : IDL.Text,
    'email' : IDL.Text,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  return IDL.Service({
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getPublicUsers' : IDL.Func([], [IDL.Vec(PublicUser)], ['query']),
    'getUnclaimedRewards' : IDL.Func([], [Result_2], ['query']),
    'getUser' : IDL.Func([], [Result], ['query']),
    'isReferralCodeUnique' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'redeemRewards' : IDL.Func([IDL.Principal, IDL.Nat], [Result_1], []),
    'registerUser' : IDL.Func([UserPayload], [Result], []),
    'updateProfile' : IDL.Func([UserUpdatePayload], [Result], []),
  });
};

const getActor = async () => {
const agent = await HttpAgent.create({
  host: "http://localhost:4943",
});

if (process.env.ENV === 'local') {
  agent.fetchRootKey();
}

const actor = Actor.createActor(idlFactory, {
  agent,
  canisterId: process.env.CANISTER_ID,
});
return actor;
};

export const airTimeDataTopUp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, amount, countryCode, operatorId, useLocalAmount = false } = req.body;
    const accessToken = req.cookies.reloadly_access_token;
    
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token not found' });
    }

    if (!phoneNumber || !amount || !countryCode || !operatorId) {
      console.log("phoneNumber", phoneNumber, "amount", amount, "countryCode", countryCode, "operatorId", operatorId);
      return res.status(400).json({ error: 'Missing required parameters' });
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
  const actor = await getActor();
  const users = await actor.getPublicUsers();
  console.log("users", users);
  // res.json(users);
  // try {
  //   const accessToken = req.cookies.reloadly_access_token;
    
  //   if (!accessToken) {
  //     return res.status(401).json({ error: 'Access token not found' });
  //   }

  //   const response = await axios.get(
  //     'https://topups-sandbox.reloadly.com/operators',
  //     {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     }
  //   );

  //   res.json(response.data);
  // } catch (error) {
  //   console.error('Error getting operators:', error);

  //   if (error.response) {
  //     res.status(error.response.status).json({ error: error.response.data.message });
  //   } else if (error.request) {
  //     res.status(500).json({ error: 'No response received from Reloadly API' });
  //   } else {
  //     res.status(500).json({ error: 'An unexpected error occurred' });
  //   }
  // }
}

