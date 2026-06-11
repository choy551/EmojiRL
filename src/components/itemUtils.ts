import { EmojiItem } from '../game/types';

export const EQUIP_STAT_LABELS: Record<string, string> = {
  attack: 'ATK', defense: 'DEF', speed: 'SPD', evasion: 'EVA', luck: 'LCK', hp: 'HP', vitality: 'VIT',
};

export function getEquipBonusSuffix(item: EmojiItem): string {
  if (!item.isEquipment) return '';
  const parts = Object.entries(item.equipBonus ?? {})
    .filter(([, v]) => (v ?? 0) !== 0)
    .map(([k, v]) => `${(v as number) > 0 ? '+' : ''}${v} ${EQUIP_STAT_LABELS[k] ?? k.toUpperCase()}`);
  return parts.length > 0 ? ` · ${parts.join(', ')}` : '';
}

export function activeKindEmoji(activeKind: string | undefined): string | null {
  if (!activeKind) return null;
  const map: Record<string, string> = {
    bomb: '💣', gun: '🔫', boomerang: '🪃', rope: '🪢', freeze: '❄️',
  };
  return map[activeKind] ?? null;
}

export function canEquipItem(item: EmojiItem, playerClass: string): boolean {
  if (item.specialAmmoKind) return playerClass === '🧝';
  if (!item.weaponKind) return true;
  return (item.equipSlots ?? []).some(slot => {
    if (slot !== 'mainHand' && slot !== 'offHand') return true;
    if (playerClass === '🧙' && item.weaponKind !== 'staff') return false;
    if (playerClass === '🥷' && item.weaponKind !== 'blade') return false;
    if (playerClass === '🧝' && slot === 'mainHand' && !['bow', 'gun'].includes(item.weaponKind!)) return false;
    if (playerClass === '🤠' && item.weaponKind !== 'gun') return false;
    return true;
  });
}

export function equipRestrictionReason(item: EmojiItem, playerClass: string): string {
  const classLabels: Record<string, string> = { '🧙': 'Wizard', '🥷': 'Ninja', '🧝': 'Ranger', '🤠': 'Cowboy' };
  const cls = classLabels[playerClass] ?? playerClass;
  if (item.specialAmmoKind) return `${cls} cannot use special arrows — Ranger only.`;
  if (playerClass === '🤠' && item.weaponKind && item.weaponKind !== 'gun') return `Only real Cowboys fight with their fists!`;
  const kindLabels: Record<string, string> = { staff: 'staves/wands', blade: 'blades', bow: 'bows', gun: 'guns' };
  const classWeapons: Record<string, string> = { '🧙': 'staves/wands', '🥷': 'blades', '🧝': 'bows or guns (main) / blades (off)', '🤠': 'guns' };
  const kind = kindLabels[item.weaponKind ?? ''] ?? item.weaponKind ?? 'this weapon';
  const allowed = classWeapons[playerClass] ?? 'compatible weapons';
  return `${cls} cannot equip ${kind}. ${cls} weapons: ${allowed}.`;
}
