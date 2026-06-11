interface StatBadgeProps {
  label: string;
  value: number;
  color?: string;
}

export function StatBadge({ label, value, color }: StatBadgeProps) {
  return (
    <div className="bg-card p-2 rounded border border-border flex justify-between items-center">
      <span className={`text-xs font-bold uppercase tracking-wide ${color ?? 'text-muted-foreground'}`}>{label}</span>
      <span className="font-bold tabular-nums">{value}</span>
    </div>
  );
}
