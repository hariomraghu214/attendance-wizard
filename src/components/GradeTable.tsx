import { GRADE_COLORS } from '@/lib/grading';

interface GradeRow {
  g: string;
  range: string;
  gp: number;
}

interface GradeTableProps {
  title: string;
  rows: GradeRow[];
}

export function GradeTable({ title, rows }: GradeTableProps) {
  return (
    <div className="card-surface overflow-hidden mb-3.5">
      <div className="px-4 py-3.5 border-b border-border flex items-center gap-2">
        <div className="w-1 h-4 bg-primary rounded-sm" />
        <div className="text-sm font-semibold text-foreground">{title}</div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface">
            {['Grade', 'Marks Range', 'Grade Points'].map((h, i) => (
              <th key={i} className={`px-3.5 py-2.5 text-[11px] text-muted-foreground font-semibold tracking-wider ${i === 2 ? 'text-center' : 'text-left'}`}>
                {h.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              <td className="px-3.5 py-2.5">
                <span
                  className="px-3 py-0.5 rounded text-[13px] font-bold"
                  style={{ background: GRADE_COLORS[r.g] + '22', color: GRADE_COLORS[r.g] }}
                >
                  {r.g}
                </span>
              </td>
              <td className="px-3.5 py-2.5 text-[13px] text-foreground">{r.range}</td>
              <td className="px-3.5 py-2.5 text-sm font-bold text-center text-foreground">{r.gp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
