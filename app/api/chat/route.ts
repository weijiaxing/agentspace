import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as { message?: string };
  const message = body.message?.trim() || '';

  return NextResponse.json({
    reply: message
      ? `收到：${message}\n\n这是 Agent Space 的 mock 回复。下一步我们可以把这里接到真实的 agent backend。`
      : '先给我一句话，我再回你。'
  });
}
