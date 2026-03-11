export type AgentState = 'idle' | 'thinking' | 'replying';
export type AvatarMode = 'placeholder' | 'glb';

export type ChatMessage = {
  id: string;
  role: 'user' | 'agent';
  content: string;
};
