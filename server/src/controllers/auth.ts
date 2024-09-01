
import { Request, Response } from "express";
import "dotenv/config";
import axios from "axios";


const getReloadlyAccessToken = async () => {
  try {
    const response = await axios.post(
      'https://auth.reloadly.com/oauth/token',
      {
        client_id: process.env.RELOADLY_CLIENT_ID,
        client_secret: process.env.RELOADLY_CLIENT_SECRET,
        grant_type: 'client_credentials',
        audience: 'https://topups-sandbox.reloadly.com',
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Reloadly access token:', error);
    throw error;
  }
}

export const getAccessToken = async (req: Request, res: Response) => {
  try {
    const accessToken = await getReloadlyAccessToken();
    res.cookie('reloadly_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 60 * 60 * 1000, 
    });

    res.json({ message: 'Access token saved in HTTP-only cookie' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
}