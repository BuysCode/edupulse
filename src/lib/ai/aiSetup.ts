'use server'

import { OpenRouter } from '@openrouter/sdk';

export const ai = new OpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY as string,
});