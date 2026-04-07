import { NextRequest } from 'next/server';
import { type UserMessage } from '@/types'

import { generateCompletion } from '@/lib/ai/chat'

export async function POST(request: NextRequest) {
    const { message } = await request.json() as { message: UserMessage }

    const completion = await generateCompletion(message)

    console.log(completion);
}
