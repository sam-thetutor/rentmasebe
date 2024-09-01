import axios from "axios";
import { Request, Response } from "express";

export const airTimeDataTopUp = async (req: Request, res: Response) => {
  try {
    const { phoneNumber, amount, countryCode } = req.body;
    const accessToken = req.cookies.reloadly_access_token;
    if (!accessToken) {
      return res.status(401).json({ error: 'Access token not found' });
    }

    const response = await axios.post(
      'https://topups.reloadly.com/topups',
      {
        recipientPhone: {
          countryCode,
          number: phoneNumber,
        },
        amount: amount,
        operatorId: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Reloadly access token:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
}