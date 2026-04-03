import { useState, useEffect } from 'react';
import { GradeCalculatorTab } from '@/components/GradeCalculatorTab';
import { SGPACalculatorTab } from '@/components/SGPACalculatorTab';
import { ReferenceTab } from '@/components/ReferenceTab';
import { AttendanceCalculatorTab } from '@/components/AttendanceCalculatorTab';

const tabs = ['Grade Calc', 'SGPA Calc', 'Attendance', 'Reference'];

export default function Index() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-[720px] mx-auto px-4 py-3 flex items-center gap-2.5 justify-between">
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-[9px] flex items-center justify-center flex-shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="2" strokeLinecap="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <div className="text-[13px] font-bold text-foreground leading-tight">SVNIT</div>
              <div className="text-[10px] text-muted-foreground leading-tight">Academic Dashboard</div>
            </div>
          </div>

          <div className="flex gap-1 bg-background rounded-3xl p-1 overflow-x-auto flex-shrink">
            {tabs.map((t, i) => (
              <div
                key={i}
                className="tab-pill"
                onClick={() => setTab(i)}
                style={{
                  background: tab === i ? 'hsl(var(--primary))' : 'transparent',
                  color: tab === i ? 'hsl(var(--primary-foreground))' : 'hsl(var(--muted-foreground))',
                }}
              >
                {t}
              </div>
            ))}
          </div>

          <button
            onClick={() => setDark(!dark)}
            title="Toggle theme"
            className="bg-transparent border border-border rounded-lg p-[7px] cursor-pointer text-muted-foreground flex items-center justify-center flex-shrink-0"
          >
            {dark ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[720px] mx-auto p-4 pb-20">
        {tab === 0 && <GradeCalculatorTab />}
        {tab === 1 && <SGPACalculatorTab />}
        {tab === 2 && <AttendanceCalculatorTab />}
        {tab === 3 && <ReferenceTab />}
      </div>
    </div>
  );
}
