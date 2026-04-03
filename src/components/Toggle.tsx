interface ToggleProps {
  on: boolean;
  onChange: (val: boolean) => void;
}

export function Toggle({ on, onChange }: ToggleProps) {
  return (
    <div
      onClick={() => onChange(!on)}
      className="w-11 h-6 rounded-full cursor-pointer transition-colors relative flex-shrink-0"
      style={{ background: on ? 'hsl(var(--primary))' : 'hsl(var(--border))' }}
    >
      <div
        className="w-[18px] h-[18px] bg-primary-foreground rounded-full absolute top-[3px] transition-[left] shadow-sm"
        style={{ left: on ? '23px' : '3px' }}
      />
    </div>
  );
}
