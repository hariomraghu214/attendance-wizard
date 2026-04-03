import { useState } from 'react';

export function AttendanceCalculatorTab() {
  const [totalClasses, setTotalClasses] = useState('');
  const [attendedClasses, setAttendedClasses] = useState('');

  const total = parseInt(totalClasses) || 0;
  const attended = parseInt(attendedClasses) || 0;
  const percentage = total > 0 ? (attended / total) * 100 : 0;
  const isAbove75 = percentage >= 75;

  // How many classes can be bunked while staying at 75%
  // attended / (total + x) >= 0.75 is wrong; we want attended/(total) after bunking
  // If current attendance > 75%, how many more classes can be skipped:
  // attended / (total + canBunk) >= 0.75
  // attended >= 0.75 * (total + canBunk)
  // canBunk <= (attended / 0.75) - total
  const canBunk = isAbove75 ? Math.floor(attended / 0.75 - total) : 0;

  // If below 75%, how many consecutive classes to attend to reach 75%:
  // (attended + need) / (total + need) >= 0.75
  // attended + need >= 0.75 * total + 0.75 * need
  // 0.25 * need >= 0.75 * total - attended
  // need >= (0.75 * total - attended) / 0.25
  const needToAttend = !isAbove75 && total > 0 ? Math.ceil((0.75 * total - attended) / 0.25) : 0;

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const getColor = () => {
    if (percentage >= 75) return 'hsl(var(--success))';
    if (percentage >= 60) return 'hsl(var(--warning))';
    return 'hsl(var(--destructive))';
  };

  const handleBlur = (setter: React.Dispatch<React.SetStateAction<string>>, minVal: number) => () => {
    setter((prev) => {
      const n = parseInt(prev);
      if (isNaN(n) || prev === '') return '';
      return String(Math.max(minVal, n));
    });
  };

  return (
    <div>
      <div className="card-surface p-4 mb-3.5">
        <div className="section-label">Attendance Input</div>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1 text-sm text-foreground">Total Classes Held</div>
          <input
            type="number"
            min="0"
            className="input-field w-[100px] text-center"
            value={totalClasses}
            onChange={(e) => setTotalClasses(e.target.value)}
            onBlur={handleBlur(setTotalClasses, 0)}
            placeholder="0"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 text-sm text-foreground">Classes Attended</div>
          <input
            type="number"
            min="0"
            max={total || undefined}
            className="input-field w-[100px] text-center"
            value={attendedClasses}
            onChange={(e) => setAttendedClasses(e.target.value)}
            onBlur={() => {
              setAttendedClasses((prev) => {
                const n = parseInt(prev);
                if (isNaN(n) || prev === '') return '';
                return String(Math.min(Math.max(0, n), total || Infinity));
              });
            }}
            placeholder="0"
          />
        </div>
      </div>

      {total > 0 && (
        <>
          <div className="card-surface p-5 mb-3.5 flex flex-col items-center">
            <div className="section-label">Attendance Percentage</div>
            <svg width="160" height="160" viewBox="0 0 128 128">
              <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
              <circle
                cx="64" cy="64" r="54" fill="none"
                stroke={getColor()}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="circle-progress"
                style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)' }}
              />
              <text x="64" y="58" textAnchor="middle" fontSize="24" fontWeight="700" fill="hsl(var(--foreground))">
                {percentage.toFixed(1)}%
              </text>
              <text x="64" y="78" textAnchor="middle" fontSize="11" fill="hsl(var(--muted-foreground))">
                {attended} / {total} classes
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3.5">
            <div className="result-box card-surface">
              <div className="text-[11px] text-muted-foreground mb-1.5">Classes Attended</div>
              <div className="text-2xl font-bold text-foreground">{attended}</div>
              <div className="text-[11px] text-muted-foreground mt-1">/ {total} total</div>
            </div>
            <div className="result-box card-surface">
              <div className="text-[11px] text-muted-foreground mb-1.5">Classes Missed</div>
              <div className="text-2xl font-bold text-destructive">{total - attended}</div>
              <div className="text-[11px] text-muted-foreground mt-1">absent</div>
            </div>
          </div>

          {isAbove75 ? (
            <div className="card-surface p-4 mb-3.5">
              <div className="bg-success/10 border border-success/30 rounded-lg px-3.5 py-3 text-[13px] text-success flex gap-2 items-start">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 flex-shrink-0">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <div>
                  <div className="font-semibold mb-1">You're safe! ✅</div>
                  <div>You can bunk <span className="font-bold text-base">{canBunk}</span> more class{canBunk !== 1 ? 'es' : ''} and still maintain 75% attendance.</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="card-surface p-4 mb-3.5">
              <div className="bg-destructive/10 border border-destructive/30 rounded-lg px-3.5 py-3 text-[13px] text-destructive flex gap-2 items-start">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="mt-0.5 flex-shrink-0">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <div className="font-semibold mb-1">Attendance below 75%! ⚠️</div>
                  <div>You need to attend <span className="font-bold text-base">{needToAttend}</span> more consecutive class{needToAttend !== 1 ? 'es' : ''} to reach 75% attendance.</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
