import { useEffect, useState } from 'react';
import { getGradingTemplate, saveGradingTemplate, getUserOrganisations } from '../lib/resultsService';
import { DEFAULT_GRADING_SCALE } from '../lib/gradingUtils';

export default function AdminResultTemplatesPage() {
  const [orgs, setOrgs] = useState([]);
  const [orgId, setOrgId] = useState('');
  const [template, setTemplate] = useState({
    name: 'Default Template',
    grading_scale: DEFAULT_GRADING_SCALE,
    ca1_max: 20,
    ca2_max: 20,
    exam_max: 60,
    is_default: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const myOrgs = await getUserOrganisations();
        const adminOrgs = myOrgs.filter((o) =>
          ['super_admin', 'admin'].includes(o.role)
        );
        setOrgs(adminOrgs);
        if (adminOrgs[0]) setOrgId(adminOrgs[0].organisation_id);
      } catch (e) {
        setMessage('Error loading organisations: ' + e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!orgId) return;
    (async () => {
      try {
        const t = await getGradingTemplate(orgId);
        if (t) {
          setTemplate({
            name: t.name,
            grading_scale: t.grading_scale || DEFAULT_GRADING_SCALE,
            ca1_max: Number(t.ca1_max),
            ca2_max: Number(t.ca2_max),
            exam_max: Number(t.exam_max),
            is_default: t.is_default ?? true,
          });
        }
      } catch (e) {
        setMessage('Error loading template: ' + e.message);
      }
    })();
  }, [orgId]);

  function updateBand(idx, field, value) {
    const next = [...template.grading_scale];
    next[idx] = { ...next[idx], [field]: field === 'grade' || field === 'remark' ? value : Number(value) };
    setTemplate({ ...template, grading_scale: next });
  }

  function addBand() {
    setTemplate({
      ...template,
      grading_scale: [
        ...template.grading_scale,
        { min: 0, max: 0, grade: 'X', remark: 'New', points: 0 },
      ],
    });
  }

  function removeBand(idx) {
    setTemplate({
      ...template,
      grading_scale: template.grading_scale.filter((_, i) => i !== idx),
    });
  }

  async function handleSave() {
    setSaving(true);
    setMessage('');
    try {
      // Validate scale is contiguous (recommended, not enforced)
      const sorted = [...template.grading_scale].sort((a, b) => b.min - a.min);
      setTemplate({ ...template, grading_scale: sorted });
      await saveGradingTemplate({ organisation_id: orgId, ...template });
      setMessage('✅ Template saved successfully.');
    } catch (e) {
      setMessage('❌ Save failed: ' + e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="p-8">Loading templates…</div>;

  if (!orgs.length) {
    return <div className="p-8">You do not have admin access to any organisation.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display' }}>
        Result Template Builder
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Configure how CA1, CA2, Exam are weighted and how totals map to grades.
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Organisation</label>
        <select
          value={orgId}
          onChange={(e) => setOrgId(e.target.value)}
          className="border rounded px-3 py-2 w-full"
        >
          {orgs.map((o) => (
            <option key={o.organisation_id} value={o.organisation_id}>
              {o.organisation?.name || o.organisation_id}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1">CA1 Max</label>
          <input type="number" value={template.ca1_max}
            onChange={(e) => setTemplate({ ...template, ca1_max: Number(e.target.value) })}
            className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CA2 Max</label>
          <input type="number" value={template.ca2_max}
            onChange={(e) => setTemplate({ ...template, ca2_max: Number(e.target.value) })}
            className="border rounded px-3 py-2 w-full" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Exam Max</label>
          <input type="number" value={template.exam_max}
            onChange={(e) => setTemplate({ ...template, exam_max: Number(e.target.value) })}
            className="border rounded px-3 py-2 w-full" />
        </div>
      </div>

      <h2 className="font-semibold mb-2">Grading Scale</h2>
      <table className="w-full text-sm border-collapse mb-3">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Min</th>
            <th className="border p-2 text-left">Max</th>
            <th className="border p-2 text-left">Grade</th>
            <th className="border p-2 text-left">Remark</th>
            <th className="border p-2 text-left">Points</th>
            <th className="border p-2"></th>
          </tr>
        </thead>
        <tbody>
          {template.grading_scale.map((b, i) => (
            <tr key={i}>
              <td className="border p-1"><input type="number" value={b.min} onChange={(e) => updateBand(i, 'min', e.target.value)} className="w-full px-2 py-1" /></td>
              <td className="border p-1"><input type="number" value={b.max} onChange={(e) => updateBand(i, 'max', e.target.value)} className="w-full px-2 py-1" /></td>
              <td className="border p-1"><input value={b.grade} onChange={(e) => updateBand(i, 'grade', e.target.value)} className="w-full px-2 py-1" /></td>
              <td className="border p-1"><input value={b.remark} onChange={(e) => updateBand(i, 'remark', e.target.value)} className="w-full px-2 py-1" /></td>
              <td className="border p-1"><input type="number" step="0.1" value={b.points} onChange={(e) => updateBand(i, 'points', e.target.value)} className="w-full px-2 py-1" /></td>
              <td className="border p-1 text-center">
                <button onClick={() => removeBand(i)} className="text-red-600 text-xs">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addBand} className="text-sm text-emerald-700 mb-6">+ Add band</button>

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-700 text-white px-5 py-2 rounded font-medium disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save Template'}
        </button>
        {message && <span className="text-sm">{message}</span>}
      </div>
    </div>
  );
}
