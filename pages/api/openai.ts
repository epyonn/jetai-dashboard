/** 
 * File Name: openai.ts
 * Purpose: Defines an API handler to interact with the OpenAI API, specifically for generating chat completions.
 * Created Date: 2024-03-14
 */

import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from "openai";
require('dotenv').config();

interface PostRequestBody {
  model: string;
  prompt: string;
  max_tokens: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }
  const {  prompt }: PostRequestBody = req.body;
  const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY });
  try {
    const response = await openai.chat.completions.create({
        messages: [
          {"role": "system", "content": prompt},
        ],
        model: "gpt-3.5-turbo",
      });
    console.log(response)
    return res.status(200).json(response);
  } catch (error) {
    console.error('OpenAI request failed:', error);
    return res.status(500).json({ error: 'Failed to fetch from OpenAI' });
  }
}
