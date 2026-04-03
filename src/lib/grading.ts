export const GRADE_POINTS: Record<string, number> = {
  AA: 10, AB: 9, BB: 8, BC: 7, CC: 6, CD: 5, DD: 4, FF: 0,
};

export const GRADE_COLORS: Record<string, string> = {
  AA: '#10b981', AB: '#34d399', BB: '#6366f1', BC: '#8b5cf6',
  CC: '#f59e0b', CD: '#f97316', DD: '#ef4444', FF: '#dc2626',
};

export function getGrade100(t: number): string {
  if (t >= 80) return 'AA';
  if (t >= 70) return 'AB';
  if (t >= 60) return 'BB';
  if (t >= 50) return 'BC';
  if (t >= 45) return 'CC';
  if (t >= 40) return 'CD';
  if (t >= 36) return 'DD';
  return 'FF';
}

export function getGrade125(t: number): string {
  if (t >= 100) return 'AA';
  if (t >= 88) return 'AB';
  if (t >= 75) return 'BB';
  if (t >= 63) return 'BC';
  if (t >= 56) return 'CC';
  if (t >= 50) return 'CD';
  if (t >= 45) return 'DD';
  return 'FF';
}
