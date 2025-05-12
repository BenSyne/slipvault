import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateReceiptData } from '@/lib/validation';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { file } = await req.json();
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const base64 = file.split(',')[1];
    
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OPENAI_API_KEY environment variable');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    const oai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    const res = await oai.chat.completions.create({
      model: 'gpt-4o-mini-vision',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Extract merchant, date, items, subtotal, tax, total, warranty if present as JSON.' },
            { type: 'image_url', image_url: `data:image/jpeg;base64,${base64}` }
          ]
        }
      ],
      max_tokens: 300
    });

    if (!res.choices[0].message.content) {
      return NextResponse.json(
        { error: 'Failed to extract data from receipt' },
        { status: 500 }
      );
    }

    // Parse the extracted data
    const extractedData = JSON.parse(res.choices[0].message.content);
    
    // Validate the data
    const validationResult = validateReceiptData(extractedData);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Invalid receipt data', details: validationResult.error },
        { status: 400 }
      );
    }

    return NextResponse.json(extractedData);
  } catch (error) {
    console.error('Error processing receipt:', error);
    return NextResponse.json(
      { error: 'Failed to process receipt' },
      { status: 500 }
    );
  }
} 