import { NextResponse } from 'next/server';
import { sendAgentMessage } from '@/lib/agent';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { message?: string };
    const message = body.message?.trim() || '';

    const result = await sendAgentMessage({ message });

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      {
        reply: 'Agent backend 暂时不可用，当前先回退到可控错误提示。把环境变量配好后，这里就能接真实服务。',
        error: message,
        mode: 'mock'
      },
      { status: 500 }
    );
  }
}
