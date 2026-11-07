import { useEffect, useMemo, useState } from 'react';
import {
  getAcademicTerms, getSubjects, getStudentsInOrganisation,
  getResultsByTerm, upsertResults, getGradingTemplate,
  getUserOrganisations,
} from '../lib/resultsService';
import { computeTotalAndGrade, computeClassPositions, ordinal, DEFAULT_GRADING_SCALE } from '../lib/gradingUtils';

export default function AdminResultsEntryPage() {
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [terms, setTerms] = useState([]);
  const [termId, setTermId] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [subjectId, setSubjectId] = useState('');
  const [students, setStudents] = useState([]);
  const [rows, setRows] = useState({}); // { student_id: { ca1, ca2, exam } }
  const [gradingScale, setGradingScale] = useState(DEFAULT_GRADING_SCALE);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Load orgs
  useEffect(() => {
    (async () => {
      try {
        const myOrgs = await getUserOrganisations();
        const staffOrgs = myOrgs.filter((o) =>
          ['super_admin', 'admin', 'teacher'].includes(o.role)
        );
        setOrgs(staffOrgs);
        if (staffOrgs[0]) setOrgId(staffOrgs[0].organisation_id);
      } catch (e) {
        setMessage('Error: ' + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Load terms when org changes
  useEffect(() => {
    if (!orgId) return;
    (async () => {
      try {
        const [t, tmpl] = await Promise.all([
          getAcademicTerms(orgId),
          getGradingTemplate(orgId),
        ]);
        setTerms(t);
        setTermId(t[0]?.id || '');
        if (tmpl?.grading_scale) setGradingScale(tmpl.grading_scale);
      } catch (e) {
        setMessage('Error loading terms: ' + e.message);
      }
    })();
  }, [orgId]);

  // Load subjects + students when org changes
  useEffect(() => {
    if (!orgId) return;
    (async () => {
      try {
        const [subs, studs] = await Promise.all([
          getSubjects(orgId),
          getStudentsInOrganisation(orgId),
        ]);
        setSubjects(subs);
        setSubjectId(subs[0]?.id || '');
        setStudents(studs);
      } catch (e) {
        setMessage('Error loading subjects/students: ' + e.message);
      }
    })();
  }, [orgId]);

  // Load existing results for selected term+subject
  useEffect(() => {
    if (!orgId || !termId || !subjectId) return;
    (async () => {
      try {
        const existing = await getResultsByTerm({ organisationId: orgId, termId });
        const map = {};
        for (const r of existing) {
          if (r.subject_id === subjectId) {
            map[r.student_id] = { ca1: r.ca1, ca2: r.ca2, exam: r.exam };
          }
        }
        // Ensure every student has an entry
        const next = {};
        for (const s of students) {
          next[s.id] = map[s.id] || { ca1: 0, ca2: 0, exam: 0 };
        }
        setRows(next);
      } catch (e) {
        setMessage('Error loading results: ' + e.message);
      }
    })();
  }, [orgId, termId, subjectId, students]);

  function setScore(studentId, field, value) {
    setRows((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [field]: Number(value) || 0 },
    }));
  }

  // Live compute totals + positions for this subject
  const computed = useMemo(() => {
    const list = students.map((s) => {
      const r = rows[s.id] || { ca1: 0, ca2: 0, exam: 0 };
      const c = computeTotalAndGrade(r.ca1, r.ca2, r.exam, gradingScale);
      return {
        student_id: s.id,
        name: s.name || s.email || '—',
        ...r,
        ...c,
      };
    });
    const { positions } = computeClassPositions(
      list.map((r) => ({ student_id: r.student_id, total: r.total }))
    );
    return list.map((r) => ({ ...r, position: positions[r.student_id] }));
  }, [students, rows, gradingScale]);

  async function handleSave() {
    if (!orgId || !termId || !subjectId) {
      setMessage('Select org, term, and subject before saving.');
      return;
    }
    const subject = subjects.find((s) => s.id === subjectId);
    setSaving(true);
    setMessage('');
    try {
      const payload = computed.map((r) => ({
        student_id: r.student_id,
        subject_id: subjectId,
        term_id: termId,
        organisation_id: orgId,
        level: subject?.level || null,
        ca1: r.ca1,
        ca2: r.ca2,
        exam: r.exam,
        grade: r.grade,
        remark: r.remark,
        points: r.points,
      }));
      await upsertResults(payload);
      setMessage(`✅ Saved ${payload.length} results.`);
    } catch (e) {
      setMessage('❌ Save failed: ' + e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8">Loading…</div>;
  if (!orgs.length) return <div className="p-8">No staff access to any organisation.</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display' }}>
        Enter Results
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Enter CA1, CA2, and Exam scores. Totals, grades, and positions are computed live.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-xs font-medium mb-1">Organisation</label>
          <select value={orgId} onChange={(e) => setOrgId(e.target.value)} className="border rounded px-3 py-2 w-full">
            {orgs.map((o) => (
              <option key={o.organisation_id} value={o.organisation_id}>
                {o.organisation?.name || o.organisation_id}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Academic Term</label>
          <select value={termId} onChange={(e) => setTermId(e.target.value)} className="border rounded px-3 py-2 w-full">
            {terms.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Subject</label>
          <select value={subjectId} onChange={(e) => setSubjectId(e.target.value)} className="border rounded px-3 py-2 w-full">
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>{s.name}{s.level ? ` (${s.level})` : ''}</option>
            ))}
          </select>
        </div>
      </div>

      {!terms.length && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 mb-4 text-sm">
          No academic terms found. Ask an admin to create one.
        </div>
      )}

      {terms.length > 0 && subjects.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 p-3 mb-4 text-sm">
          No subjects found for this organisation. Add subjects in Admin → Subjects.
        </div>
      )}

      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">#</th>
              <th className="p-2 text-left">Student</th>
              <th className="p-2">CA1</th>
              <th className="p-2">CA2</th>
              <th className="p-2">Exam</th>
              <th className="p-2">Total</th>
              <th className="p-2">Grade</th>
              <th className="p-2">Pos.</th>
            </tr>
          </thead>
          <tbody>
            {computed.map((r, i) => (
              <tr key={r.student_id} className="border-t">
                <td className="p-2 text-gray-500">{i + 1}</td>
                <td className="p-2">{r.name}</td>
                <td className="p-1"><input type="number" min="0" value={r.ca1} onChange={(e) => setScore(r.student_id, 'ca1', e.target.value)} className="border rounded px-2 py-1 w-20" /></td>
                <td className="p-1"><input type="number" min="0" value={r.ca2} onChange={(e) => setScore(r.student_id, 'ca2', e.target.value)} className="border rounded px-2 py-1 w-20" /></td>
                <td className="p-1"><input type="number" min="0" value={r.exam} onChange={(e) => setScore(r.student_id, 'exam', e.target.value)} className="border rounded px-2 py-1 w-20" /></td>
                <td className="p-2 font-medium text-center">{r.total}</td>
                <td className="p-2 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">{r.grade}</span></td>
                <td className="p-2 text-center">{r.position ? ordinal(r.position) : '—'}</td>
              </tr>
            ))}
            {computed.length === 0 && (
              <tr><td colSpan="8" className="p-6 text-center text-gray-500">No students enrolled.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center gap-3 mt-4">
        <button onClick={handleSave} disabled={saving || !computed.length}
          className="bg-emerald-700 text-white px-5 py-2 rounded font-medium disabled:opacity-50">
          {saving ? 'Saving…' : 'Save All Results'}
        </button>
        {message && <span className="text-sm">{message}</span>}
      </div>
    </div>
  );
}
