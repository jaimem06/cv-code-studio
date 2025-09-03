import Collapsible from "../common/Collapsible.jsx";
import Input from "../common/Input.jsx";

export default function EducationEditor({ education, setEducation }) {
  const add = () => setEducation((xs) => [...xs, { level: "", field: "", date: "", institution: "" }]);
  const remove = (i) => setEducation((xs) => xs.filter((_, j) => j !== i));
  const update = (i, k, v) => setEducation((xs) => xs.map((x, j) => (j === i ? { ...x, [k]: v } : x)));

  return (
    <Collapsible title="Educación" defaultOpen>
      <div className="flex items-center justify-end pb-3">
        <button onClick={add} type="button" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow">+ Añadir estudio</button>
      </div>
      {education.map((ed, i) => (
        <div key={i} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nivel" value={ed.level} onChange={(v) => update(i, "level", v)} placeholder="Bachelor / Master / etc" />
            <Input label="Campo" value={ed.field} onChange={(v) => update(i, "field", v)} placeholder="Computer Science" />
            <Input label="Año" value={ed.date} onChange={(v) => update(i, "date", v)} placeholder="2024" />
            <Input label="Institución" value={ed.institution} onChange={(v) => update(i, "institution", v)} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={() => remove(i)} className="inline-flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200">Eliminar</button>
          </div>
        </div>
      ))}
    </Collapsible>
  );
}
