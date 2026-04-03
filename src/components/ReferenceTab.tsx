import { GradeTable } from './GradeTable';
import { GRADE_POINTS, GRADE_COLORS } from '@/lib/grading';

export function ReferenceTab() {
  const rows100 = [
    { g: 'AA', range: '≥ 80 marks', gp: 10 }, { g: 'AB', range: '70 – 79 marks', gp: 9 },
    { g: 'BB', range: '60 – 69 marks', gp: 8 }, { g: 'BC', range: '50 – 59 marks', gp: 7 },
    { g: 'CC', range: '45 – 49 marks', gp: 6 }, { g: 'CD', range: '40 – 44 marks', gp: 5 },
    { g: 'DD', range: '36 – 39 marks', gp: 4 }, { g: 'FF', range: '< 36 marks', gp: 0 },
  ];
  const rows125 = [
    { g: 'AA', range: '≥ 100 marks', gp: 10 }, { g: 'AB', range: '88 – 99 marks', gp: 9 },
    { g: 'BB', range: '75 – 87 marks', gp: 8 }, { g: 'BC', range: '63 – 74 marks', gp: 7 },
    { g: 'CC', range: '56 – 62 marks', gp: 6 }, { g: 'CD', range: '50 – 55 marks', gp: 5 },
    { g: 'DD', range: '45 – 49 marks', gp: 4 }, { g: 'FF', range: '< 45 marks', gp: 0 },
  ];

  return (
    <div>
      <div className="bg-primary/10 border border-primary/25 rounded-xl px-3.5 py-3 mb-3.5 text-[13px] text-primary leading-relaxed">
        <strong>SVNIT Grading System</strong> — Grades are awarded based on total marks out of 100 (without tutorial) or 125 (with tutorial). Attendance below 75% incurs a −1 GP deduction from the final grade point.
      </div>
      <GradeTable title="Out of 100 Marks — Standard Scheme" rows={rows100} />
      <GradeTable title="Out of 125 Marks — With Tutorial" rows={rows125} />
      <div className="card-surface p-4">
        <div className="text-[13px] font-semibold text-foreground mb-3">Quick Grade Points Reference</div>
        <div className="flex flex-wrap gap-2">
          {Object.entries(GRADE_POINTS).map(([g, gp]) => (
            <div key={g} className="flex items-center gap-1.5 bg-surface rounded-lg px-3.5 py-1.5 border border-border">
              <span className="font-bold text-sm" style={{ color: GRADE_COLORS[g] }}>{g}</span>
              <span className="text-xs text-muted-foreground">= {gp} GP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
