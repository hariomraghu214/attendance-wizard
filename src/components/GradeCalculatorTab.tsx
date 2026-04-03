import { useState, useRef } from 'react';
import { Toggle } from './Toggle';
import { InputRow } from './InputRow';
import { GRADE_POINTS, GRADE_COLORS, getGrade100, getGrade125 } from '@/lib/grading';

export function GradeCalculatorTab() {
  const [withTutorial, setWithTutorial] = useState(false);
  const [attendance, setAttendance] = useState(false);
  const [midSem, setMidSem] = useState('');
  const [endSem, setEndSem] = useState('');
  const [quiz1, setQuiz1] = useState('');
  const [quiz2, setQuiz2] = useState('');
  const [tutorial, setTutorial] = useState('');

  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (raw: string) => {
    if (raw === '' || raw === '-') { setter(''); return; }
    setter(raw);
  };

  const handleBlur = (setter: React.Dispatch<React.SetStateAction<string>>, max: number) => () => {
    setter((prev) => {
      const n = parseFloat(prev);
      if (isNaN(n) || prev === '') return '';
      return String(Math.min(Math.max(0, n), max));
    });
  };

  const maxTotal = withTutorial ? 125 : 100;
  const clamp = (v: string, max: number) => { const n = parseFloat(v); return isNaN(n) ? 0 : Math.min(Math.max(0, n), max); };
  const total = clamp(midSem, 30) + clamp(endSem, 50) + clamp(quiz1, 10) + clamp(quiz2, 10) + (withTutorial ? clamp(tutorial, 25) : 0);
  const grade = withTutorial ? getGrade125(total) : getGrade100(total);
  let gp = GRADE_POINTS[grade];
  if (attendance) gp = Math.max(0, gp - 1);

  const fields = [
    { label: 'Mid-Sem', max: 30, value: midSem, setter: setMidSem, ref: refs[0], next: refs[1] },
    { label: 'End-Sem', max: 50, value: endSem, setter: setEndSem, ref: refs[1], next: refs[2] },
    { label: 'Quiz 1', max: 10, value: quiz1, setter: setQuiz1, ref: refs[2], next: refs[3] },
    { label: 'Quiz 2', max: 10, value: quiz2, setter: setQuiz2, ref: refs[3], next: withTutorial ? refs[4] : null },
    ...(withTutorial ? [{ label: 'Tutorial', max: 25, value: tutorial, setter: setTutorial, ref: refs[4], next: null }] : []),
  ];

  return (
    <div>
      <div className="card-surface p-4 mb-3.5">
        <div className="section-label">Options</div>
        <div className="flex items-center gap-2.5 mb-3">
          <Toggle on={withTutorial} onChange={(v) => { setWithTutorial(v); if (!v) setTutorial(''); }} />
          <span className="text-sm text-foreground">With Tutorial (125 Marks)</span>
        </div>
        <div className="flex items-center gap-2.5">
          <Toggle on={attendance} onChange={setAttendance} />
          <span className="text-sm text-foreground">Attendance 60–75% (−1 GP)</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--warning))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
      </div>

      <div className="card-surface p-4 mb-3.5">
        <div className="section-label">Marks Input</div>
        {fields.map((f) => (
          <InputRow
            key={f.label}
            label={f.label}
            max={f.max}
            value={f.value}
            inputRef={f.ref}
            onChange={handleChange(f.setter)}
            onBlur={handleBlur(f.setter, f.max)}
            onEnter={() => { if (f.next?.current) f.next.current.focus(); }}
          />
        ))}
      </div>

      <div className="card-surface p-4 mb-3.5">
        <div className="section-label">Result</div>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { label: 'Total Marks', value: total.toFixed(1), sub: `/ ${maxTotal}`, color: 'hsl(var(--foreground))' },
            { label: 'Grade', value: grade, sub: '', color: GRADE_COLORS[grade] },
            { label: 'Grade Points', value: String(gp), sub: '/ 10', color: 'hsl(var(--primary))' },
          ].map((item, i) => (
            <div key={i} className="result-box">
              <div className="text-[11px] text-muted-foreground mb-1.5">{item.label}</div>
              <div className="text-2xl font-bold leading-none" style={{ color: item.color }}>{item.value}</div>
              {item.sub && <div className="text-[11px] text-muted-foreground mt-1">{item.sub}</div>}
            </div>
          ))}
        </div>
        {attendance && (
          <div className="mt-3 bg-warning/10 border border-warning/30 rounded-lg px-3.5 py-2.5 text-[13px] text-warning flex gap-2 items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
            Attendance penalty applied: −1 GP (base grade: {grade} = {GRADE_POINTS[grade]} GP)
          </div>
        )}
      </div>
    </div>
  );
}
