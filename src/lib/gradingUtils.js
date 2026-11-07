// Pure computation — no Supabase, no React. Fully unit-testable.

export const DEFAULT_GRADING_SCALE = [
  { min: 75, max: 100, grade: 'A1', remark: 'Excellent', points: 4.0 },
  { min: 70, max: 74,  grade: 'B2', remark: 'Very Good', points: 3.5 },
  { min: 65, max: 69,  grade: 'B3', remark: 'Good',      points: 3.0 },
  { min: 60, max: 64,  grade: 'C4', remark: 'Credit',    points: 2.5 },
  { min: 55, max: 59,  grade: 'C5', remark: 'Credit',    points: 2.0 },
  { min: 50, max: 54,  grade: 'C6', remark: 'Credit',    points: 1.5 },
  { min: 45, max: 49,  grade: 'D7', remark: 'Pass',      points: 1.0 },
  { min: 40, max: 44,  grade: 'E8', remark: 'Pass',      points: 0.5 },
  { min: 0,  max: 39,  grade: 'F9', remark: 'Fail',      points: 0.0 },
];

/**
 * Compute the grade band for a total score.
 * @param {number} total - 0..100
 * @param {Array} gradingScale
 * @returns {{grade:string, remark:string, points:number, min:number, max:number}}
 */
export function computeGrade(total, gradingScale = DEFAULT_GRADING_SCALE) {
  const t = Number(total) || 0;
  const band = gradingScale.find((b) => t >= b.min && t <= b.max);
  return band || { grade: 'F9', remark: 'Fail', points: 0, min: 0, max: 39 };
}

/**
 * Grade + remark + points from raw component scores.
 */
export function computeTotalAndGrade(ca1, ca2, exam, gradingScale = DEFAULT_GRADING_SCALE) {
  const total = (Number(ca1) || 0) + (Number(ca2) || 0) + (Number(exam) || 0);
  const band = computeGrade(total, gradingScale);
  return { total, ...band };
}

/**
 * Compute GPA from an array of result rows.
 * Each row needs { total, credit_units }.
 */
export function computeGPA(results = [], gradingScale = DEFAULT_GRADING_SCALE) {
  if (!results.length) return { gpa: 0, totalCredits: 0, totalPoints: 0, subjectCount: 0 };
  let totalCredits = 0;
  let totalPoints = 0;
  for (const r of results) {
    const band = computeGrade(r.total, gradingScale);
    const credits = Number(r.credit_units) || 1;
    totalCredits += credits;
    totalPoints += band.points * credits;
  }
  return {
    gpa: totalCredits ? Number((totalPoints / totalCredits).toFixed(2)) : 0,
    totalCredits: Number(totalCredits.toFixed(2)),
    totalPoints: Number(totalPoints.toFixed(2)),
    subjectCount: results.length,
  };
}

/**
 * Compute rank map: { student_id: position }.
 * Ties share the same position (standard competition ranking).
 * @param {Array<{student_id:string, total:number}>} rows
 */
export function computeClassPositions(rows = []) {
  const byStudent = new Map();
  for (const r of rows) {
    const cur = byStudent.get(r.student_id) || 0;
    byStudent.set(r.student_id, cur + (Number(r.total) || 0));
  }
  const sorted = [...byStudent.entries()].sort((a, b) => b[1] - a[1]);
  const positions = {};
  let lastScore = null;
  let lastRank = 0;
  sorted.forEach(([sid, score], idx) => {
    if (lastScore === null || score < lastScore) {
      lastRank = idx + 1;
      lastScore = score;
    }
    positions[sid] = lastRank;
  });
  return { positions, sorted, totalStudents: sorted.length };
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
