import axios from "axios";
import { Request, Response } from "express";

export const getPairExchangeRate = async (req: Request, res: Response) => {
    try {
        const apiKey = process.env.CURRENCY_API_KEY;
    const {curr1, curr2} = req.query

    const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${curr1}/${curr2}`,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return res.json(response.data);
    } catch (error) {
        console.error("Error getting exchange rate:", error);

        if (error.response) {
            res
                .status(error.response.status)
                .json({ error: error.response.data.message });
        } else if (error.request) {
            res.status(500).json({ error: "No response received from Currency API" });
        } else {
            res.status(500).json({ error: "An unexpected error occurred" });
        }
    }

};