type ChatRequest = {
  message: string;
};

type ChatResult = {
  reply: string;
  mode: 'mock' | 'openai-compatible';
};

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  return value && value.trim() ? value.trim() : undefined;
}

async function callOpenAICompatible(message: string): Promise<ChatResult> {
  const baseUrl = getEnv('AGENT_BACKEND_BASE_URL');
  const apiKey = getEnv('AGENT_BACKEND_API_KEY');
  const model = getEnv('AGENT_BACKEND_MODEL');
  const systemPrompt =
    getEnv('AGENT_BACKEND_SYSTEM_PROMPT') ||
    'You are Andy, an operator assistant inside Agent Space. Be direct, useful, and concise.';

  if (!baseUrl || !apiKey || !model) {
    throw new Error('Missing AGENT_BACKEND_BASE_URL, AGENT_BACKEND_API_KEY, or AGENT_BACKEND_MODEL');
  }

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Backend request failed (${response.status}): ${text}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };

  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) {
    throw new Error('Backend returned no assistant reply');
  }

  return { reply, mode: 'openai-compatible' };
}

async function callMock(message: string): Promise<ChatResult> {
  return {
    reply: message
      ? `收到：${message}\n\n这是 Agent Space 的 mock 回复。下一步我们可以把这里接到真实的 agent backend。`
      : '先给我一句话，我再回你。',
    mode: 'mock'
  };
}

export async function sendAgentMessage({ message }: ChatRequest): Promise<ChatResult> {
  const backendMode = getEnv('AGENT_BACKEND_MODE') || 'mock';

  if (backendMode === 'openai-compatible') {
    return callOpenAICompatible(message);
  }

  return callMock(message);
}
