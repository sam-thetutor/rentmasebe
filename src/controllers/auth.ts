import e, { Request, Response } from "express";
import "dotenv/config";
import axios from "axios";


const getReloadlyAccessToken = async (audience: string) => {
  try {
    const response = await axios.post(
      'https://auth.reloadly.com/oauth/token',
      {
        client_id: process.env.RELOADLY_CLIENT_ID,
        client_secret: process.env.RELOADLY_CLIENT_SECRET,
        grant_type: 'client_credentials',
        audience: `https://${audience}.reloadly.com`,
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
    const audience = req.body.audience;
    const accessToken = await getReloadlyAccessToken(audience);
    
    res.cookie('reloadly_access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    });

    res.json({ message: "Access token set successfully" });
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    res.status(500).json({ error: 'Failed to fetch access token' });
  }
}

export const logout = (req: Request, res: Response) => {
  res.clearCookie('reloadly_access_token');
  res.json({ message: 'Access token removed from cookie' });
}