import { RefObject } from 'react';

interface InputRowProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onBlur: () => void;
  max: number;
  inputRef?: RefObject<HTMLInputElement>;
  onEnter?: () => void;
}

export function InputRow({ label, value, onChange, onBlur, max, inputRef, onEnter }: InputRowProps) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 text-sm text-foreground">
        {label} <span className="text-xs text-muted-foreground">/ {max}</span>
      </div>
      <input
        ref={inputRef}
        type="number"
        min="0"
        max={max}
        className="input-field w-[100px] text-center"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={(e) => { if (e.key === 'Enter' && onEnter) onEnter(); }}
        placeholder="0"
      />
    </div>
  );
}
