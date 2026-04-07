'use server'

import type { UserMessage } from '@/types';
import { ai } from './aiSetup';

const SYSTEM_PROMPT = ``;

function getChatRequestData(message: UserMessage) {
    return {
        model: process.env.OPENROUTER_API_MODEL as string,
        messages: [
            {
                role: "system",
                content: SYSTEM_PROMPT
            },
            {
                role: 'user',
                content: message,
            },
        ],
        stream: false,
        temperature: 0.4
    } as any
};

export async function generateCompletion(message: UserMessage) {
    const chatRequestData = getChatRequestData(message)

    const completion = await ai.chat.send({
        chatRequest: chatRequestData
    });

    return completion.choices[0].message.content;
};