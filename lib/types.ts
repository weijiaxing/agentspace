export type AgentState = 'idle' | 'thinking' | 'replying';

export type ChatMessage = {
  id: string;
  role: 'user' | 'agent';
  content: string;
};
