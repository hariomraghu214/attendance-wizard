import { useState } from 'react';
import { GRADE_POINTS, GRADE_COLORS } from '@/lib/grading';

interface Subject {
  id: number;
  name: string;
  credits: number;
  grade: string;
}

export function SGPACalculatorTab() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [name, setName] = useState('');
  const [credits, setCredits] = useState('3');
  const [grade, setGrade] = useState('AA');

  const placeholders = ['e.g., Thermodynamics', 'e.g., Engineering Graphics', 'e.g., Fluid Mechanics', 'e.g., Data Structures', 'e.g., Mathematics III'];
  const ph = placeholders[subjects.length % placeholders.length];

  const addSubject = () => {
    if (!name.trim()) return;
    setSubjects([...subjects, { id: Date.now(), name: name.trim(), credits: parseInt(credits), grade }]);
    setName('');
  };

  const totalCredits = subjects.reduce((a, s) => a + s.credits, 0);
  const weightedSum = subjects.reduce((a, s) => a + s.credits * GRADE_POINTS[s.grade], 0);
  const sgpa = totalCredits === 0 ? 0 : weightedSum / totalCredits;
  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (sgpa / 10) * circumference;

  return (
    <div>
      <div className="card-surface p-4 mb-3.5">
        <div className="section-label">Add Subject</div>
        <input
          className="input-field w-full mb-2.5"
          placeholder={ph}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addSubject()}
        />
        <div className="grid grid-cols-[1fr_1fr_auto] gap-2.5 items-end">
          <div>
            <div className="text-xs text-muted-foreground mb-1">Credits</div>
            <select className="input-field w-full cursor-pointer" value={credits} onChange={(e) => setCredits(e.target.value)}>
              {[1, 2, 3, 4, 5].map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <div className="text-xs text-muted-foreground mb-1">Grade</div>
            <select className="input-field w-full cursor-pointer" value={grade} onChange={(e) => setGrade(e.target.value)}>
              {Object.keys(GRADE_POINTS).map((g) => <option key={g} value={g}>{g} ({GRADE_POINTS[g]} GP)</option>)}
            </select>
          </div>
          <button className="btn-primary h-[38px] whitespace-nowrap rounded-lg" onClick={addSubject}>+ Add</button>
        </div>
      </div>

      <div className="card-surface overflow-hidden mb-3.5">
        {subjects.length === 0 ? (
          <div className="p-9 text-center text-muted-foreground">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="mx-auto mb-3 opacity-35">
              <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
            </svg>
            <div className="text-sm font-medium mb-1">No subjects added yet</div>
            <div className="text-[13px] opacity-70">Add a subject above to get started</div>
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-surface">
                {['Subject', 'Cr', 'Grade', 'GP', ''].map((h, i) => (
                  <th key={i} className={`px-3 py-2.5 text-[11px] text-muted-foreground font-semibold ${i === 0 ? 'text-left' : 'text-center'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="px-3 py-2.5 text-[13px] text-foreground max-w-[140px] overflow-hidden text-ellipsis whitespace-nowrap">{s.name}</td>
                  <td className="px-3 py-2.5 text-[13px] text-center text-muted-foreground">{s.credits}</td>
                  <td className="px-3 py-2.5 text-center">
                    <span className="px-2.5 py-0.5 rounded text-xs font-bold" style={{ background: GRADE_COLORS[s.grade] + '22', color: GRADE_COLORS[s.grade] }}>{s.grade}</span>
                  </td>
                  <td className="px-3 py-2.5 text-[13px] text-center font-semibold text-foreground">{GRADE_POINTS[s.grade]}</td>
                  <td className="px-2 py-2.5 text-center">
                    <button onClick={() => setSubjects(subjects.filter((x) => x.id !== s.id))} className="bg-transparent border-none cursor-pointer text-destructive text-lg leading-none px-1">×</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-3.5 items-stretch">
        <div className="card-surface p-5 text-center flex flex-col items-center justify-center">
          <div className="section-label">SGPA</div>
          <svg width="128" height="128" viewBox="0 0 128 128">
            <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
            <circle cx="64" cy="64" r="54" fill="none" stroke="hsl(var(--primary))" strokeWidth="10"
              strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round"
              className="circle-progress" style={{ transition: 'stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)' }} />
            <text x="64" y="60" textAnchor="middle" fontSize="22" fontWeight="700" fill="hsl(var(--foreground))">{sgpa.toFixed(2)}</text>
            <text x="64" y="78" textAnchor="middle" fontSize="12" fill="hsl(var(--muted-foreground))">out of 10</text>
          </svg>
        </div>
        <div className="grid grid-rows-2 gap-3.5">
          {[
            { label: 'Total Subjects', value: subjects.length, color: 'hsl(var(--foreground))' },
            { label: 'Total Credits', value: totalCredits, color: 'hsl(var(--primary))' },
          ].map((item, i) => (
            <div key={i} className="card-surface p-4 flex flex-col justify-center">
              <div className="text-xs text-muted-foreground mb-1.5">{item.label}</div>
              <div className="text-[28px] font-bold" style={{ color: item.color }}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
