import type { AgentState } from '@/lib/types';

const labelMap: Record<AgentState, string> = {
  idle: 'Idle',
  thinking: 'Thinking',
  replying: 'Replying'
};

export function StatusBadge({ state }: { state: AgentState }) {
  return (
    <span className="badge">
      <span className="dot" />
      {labelMap[state]}
    </span>
  );
}
