import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
dotenv.config(); 

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

