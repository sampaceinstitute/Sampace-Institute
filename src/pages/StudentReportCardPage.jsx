import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
  getAcademicTerms, getStudentResults, getResultsByTerm,
  getGradingTemplate, getUserOrganisations,
} from '../lib/resultsService';
import {
  computeGPA, computeClassPositions, computeGrade, ordinal, DEFAULT_GRADING_SCALE,
} from '../lib/gradingUtils';

export default function StudentReportCardPage() {
  const [studentId, setStudentId] = useState('');
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [terms, setTerms] = useState([]);
  const [termId, setTermId] = useState('');
  const [results, setResults] = useState([]);
  const [gradingScale, setGradingScale] = useState(DEFAULT_GRADING_SCALE);
  const [positions, setPositions] = useState({});
  const [totalStudents, setTotalStudents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Bootstrap
  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        setStudentId(user.id);
        const myOrgs = await getUserOrganisations();
        const studentOrgs = myOrgs.filter((o) => o.role === 'student');
        setOrgs(studentOrgs);
        if (studentOrgs[0]) setOrgId(studentOrgs[0].organisation_id);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load terms + template
  useEffect(() => {
    if (!orgId) return;
    (async () => {
      try {
        const [t, tmpl] = await Promise.all([getAcademicTerms(orgId), getGradingTemplate(orgId)]);
        setTerms(t);
        setTermId(t[0]?.id || '');
        if (tmpl?.grading_scale) setGradingScale(tmpl.grading_scale);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [orgId]);

  // Load results + class ranking
  useEffect(() => {
    if (!studentId || !termId) return;
    (async () => {
      try {
        const [mine, allForTerm] = await Promise.all([
          getStudentResults({ studentId, termId }),
          getResultsByTerm({ organisationId: orgId, termId }),
        ]);
        setResults(mine);
        const { positions: p, totalStudents: n } = computeClassPositions(
          allForTerm.map((r) => ({ student_id: r.student_id, total: r.total }))
        );
        setPositions(p);
        setTotalStudents(n);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, [studentId, termId, orgId]);

  const gradeStats = useMemo(() => computeGPA(results, gradingScale), [results, gradingScale]);
  const currentTerm = terms.find((t) => t.id === termId);

  if (loading) return <div className="p-8">Loading report card…</div>;
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>;
  if (!orgs.length) return <div className="p-8">No student enrolment found.</div>;

  const myPosition = positions[studentId];

  return (
    <div className="max-w-4xl mx-auto p-6 print:p-0">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white; }
          .report-card { box-shadow: none !important; border: 1px solid #000 !important; }
        }
      `}</style>

      <div className="flex items-center justify-between mb-4 no-print">
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display' }}>
          Report Card
        </h1>
        <button onClick={() => window.print()} className="bg-emerald-700 text-white px-4 py-2 rounded text-sm">
          Print / Save as PDF
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 no-print">
        <div>
          <label className="block text-xs font-medium mb-1">Organisation</label>
          <select value={orgId} onChange={(e) => setOrgId(e.target.value)} className="border rounded px-3 py-2 w-full">
            {orgs.map((o) => (
              <option key={o.organisation_id} value={o.organisation_id}>{o.organisation?.name || o.organisation_id}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Term</label>
          <select value={termId} onChange={(e) => setTermId(e.target.value)} className="border rounded px-3 py-2 w-full">
            {terms.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
      </div>

      <div className="report-card bg-white border-2 border-emerald-800 rounded-lg p-8 shadow-lg">
        <header className="border-b border-emerald-800 pb-4 mb-6 text-center">
          <h2 className="text-xl font-bold text-emerald-900" style={{ fontFamily: 'Playfair Display' }}>
            SAMPACE EDUCATIONAL LTD
          </h2>
          <p className="text-xs text-gray-600">Continuous Assessment &amp; Examination Report</p>
          <p className="text-sm mt-2">
            <strong>{currentTerm?.name || '—'}</strong>
          </p>
        </header>

        {results.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No results published for this term yet.</p>
        ) : (
          <>
            <table className="w-full text-sm mb-6 border-collapse">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="border p-2 text-left">Subject</th>
                  <th className="border p-2">CA1</th>
                  <th className="border p-2">CA2</th>
                  <th className="border p-2">Exam</th>
                  <th className="border p-2">Total</th>
                  <th className="border p-2">Grade</th>
                  <th className="border p-2 text-left">Remark</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => {
                  const band = computeGrade(r.total, gradingScale);
                  return (
                    <tr key={r.id}>
                      <td className="border p-2">{r.subject?.name || r.subject_id}</td>
                      <td className="border p-2 text-center">{r.ca1}</td>
                      <td className="border p-2 text-center">{r.ca2}</td>
                      <td className="border p-2 text-center">{r.exam}</td>
                      <td className="border p-2 text-center font-semibold">{r.total}</td>
                      <td className="border p-2 text-center">{band.grade}</td>
                      <td className="border p-2">{band.remark}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="border rounded p-3">
                <div className="text-xs text-gray-500">Subjects</div>
                <div className="text-lg font-bold">{gradeStats.subjectCount}</div>
              </div>
              <div className="border rounded p-3">
                <div className="text-xs text-gray-500">GPA</div>
                <div className="text-lg font-bold text-emerald-800">{gradeStats.gpa.toFixed(2)}</div>
              </div>
              <div className="border rounded p-3">
                <div className="text-xs text-gray-500">Class Position</div>
                <div className="text-lg font-bold">
                  {myPosition ? ordinal(myPosition) : '—'}
                  <span className="text-xs text-gray-500 ml-1">of {totalStudents}</span>
                </div>
              </div>
            </div>

            <footer className="mt-8 pt-4 border-t border-gray-300 text-xs text-gray-500 flex justify-between">
              <span>Generated: {new Date().toLocaleDateString()}</span>
              <span>SAMPACE Educational Ltd · RC 9677766</span>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}
