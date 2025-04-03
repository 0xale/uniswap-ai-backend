// src/api/anthropic.ts
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';

export const anthropic = new Anthropic({
  apiKey: ANTHROPIC_API_KEY,
});
