const EMOJI_KEY = 'emojirl_seen_emojis';
const ENEMY_KEY = 'emojirl_seen_enemies';
const KILL_COUNT_KEY = 'emojirl_kill_counts';

export function markEmojiSeen(emoji: string): void {
  try {
    const seen = new Set<string>(JSON.parse(localStorage.getItem(EMOJI_KEY) ?? '[]'));
    if (!seen.has(emoji)) {
      seen.add(emoji);
      localStorage.setItem(EMOJI_KEY, JSON.stringify([...seen]));
    }
  } catch { /* ignore quota/parse errors */ }
}

export function markEnemySeen(emoji: string): void {
  try {
    const seen = new Set<string>(JSON.parse(localStorage.getItem(ENEMY_KEY) ?? '[]'));
    if (!seen.has(emoji)) {
      seen.add(emoji);
      localStorage.setItem(ENEMY_KEY, JSON.stringify([...seen]));
    }
  } catch { /* ignore quota/parse errors */ }
}

export function getSeenEmojis(): Set<string> {
  try { return new Set<string>(JSON.parse(localStorage.getItem(EMOJI_KEY) ?? '[]')); }
  catch { return new Set(); }
}

export function getSeenEnemies(): Set<string> {
  try { return new Set<string>(JSON.parse(localStorage.getItem(ENEMY_KEY) ?? '[]')); }
  catch { return new Set(); }
}

export function markEnemyKilled(emoji: string): void {
  try {
    const counts: Record<string, number> = JSON.parse(localStorage.getItem(KILL_COUNT_KEY) ?? '{}');
    counts[emoji] = (counts[emoji] ?? 0) + 1;
    localStorage.setItem(KILL_COUNT_KEY, JSON.stringify(counts));
  } catch { /* ignore quota/parse errors */ }
}

export function getEnemyKillCounts(): Record<string, number> {
  try { return JSON.parse(localStorage.getItem(KILL_COUNT_KEY) ?? '{}'); }
  catch { return {}; }
}
