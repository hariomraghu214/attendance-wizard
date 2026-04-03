import { useState, useEffect } from 'react';
import { GradeCalculatorTab } from '@/components/GradeCalculatorTab';
import { SGPACalculatorTab } from '@/components/SGPACalculatorTab';
import { ReferenceTab } from '@/components/ReferenceTab';
import { AttendanceCalculatorTab } from '@/components/AttendanceCalculatorTab';
import { ShareDialog } from '@/components/ShareDialog';
import { useInstallPrompt } from '@/hooks/useInstallPrompt';
import logo from '@/assets/logo.png';

const tabs = ['Grade Calc', 'SGPA Calc', 'Attendance', 'Reference'];

export default function Index() {
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const { canInstall, install } = useInstallPrompt();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-[720px] mx-auto px-4 py-3 flex items-center gap-2.5 justify-between">
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="SVNIT Academic Dashboard" className="w-8 h-8 rounded-[9px] flex-shrink-0" />
            <div className="hidden sm:block">
              <div className="text-[13px] font-bold text-foreground leading-tight">SVNIT</div>
              <div className="text-[10px] text-muted-foreground leading-tight">Academic Dashboard</div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:flex gap-1 bg-background rounded-2xl sm:rounded-3xl p-1 flex-shrink min-w-0">
            {tabs.map((t, i) => (
              <div
                key={i}
                className="tab-pill text-center"
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

          <div className="flex items-center gap-1.5 flex-shrink-0">
            {/* Share Button */}
            <button
              onClick={() => setShareOpen(true)}
              title="Share"
              className="bg-transparent border border-border rounded-lg p-[7px] cursor-pointer text-muted-foreground flex items-center justify-center flex-shrink-0"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>

            {/* Theme Toggle */}
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
      </div>

      {/* Install Banner */}
      {canInstall && (
        <div className="max-w-[720px] mx-auto px-4 pt-3">
          <button
            onClick={install}
            className="w-full bg-primary text-primary-foreground border-none rounded-xl px-4 py-2.5 cursor-pointer text-sm font-medium flex items-center justify-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Install App
          </button>
        </div>
      )}

      {/* Content */}
      <div className="max-w-[720px] mx-auto p-4 pb-20">
        {tab === 0 && <GradeCalculatorTab />}
        {tab === 1 && <SGPACalculatorTab />}
        {tab === 2 && <AttendanceCalculatorTab />}
        {tab === 3 && <ReferenceTab />}
      </div>

      <ShareDialog open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  );
}
