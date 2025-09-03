import Collapsible from "../common/Collapsible.jsx";
import Input from "../common/Input.jsx";
import TextArea from "../common/TextArea.jsx";
import TagInput from "../common/TagInput.jsx";

export default function ProjectsEditor({ projects, setProjects }) {
  const add = () => setProjects((xs) => [...xs, { name: "", link: "", summary: "", stack: [] }]);
  const remove = (i) => setProjects((xs) => xs.filter((_, j) => j !== i));
  const update = (i, k, v) => setProjects((xs) => xs.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const addTag = (i, text) => setProjects((xs) => xs.map((x, j) => j === i ? { ...x, stack: [...x.stack, text] } : x));
  const remTag = (i, ti) => setProjects((xs) => xs.map((x, j) => j === i ? { ...x, stack: x.stack.filter((_, k) => k !== ti) } : x));

  return (
    <Collapsible title="Proyectos">
      <div className="flex items-center justify-end pb-3">
        <button onClick={add} type="button" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow">+ Añadir proyecto</button>
      </div>
      {projects.map((p, i) => (
        <div key={i} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Nombre" value={p.name} onChange={(v) => update(i, "name", v)} />
            <Input label="Link" value={p.link} onChange={(v) => update(i, "link", v)} placeholder="https://..." />
          </div>
          <TextArea label="Resumen" value={p.summary} onChange={(v) => update(i, "summary", v)} rows={3} />
          <TagInput label="Stack" values={p.stack} onAdd={(t) => addTag(i, t)} onRemove={(ti) => remTag(i, ti)} />
          <div className="flex justify-end">
            <button type="button" onClick={() => remove(i)} className="inline-flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200">Eliminar</button>
          </div>
        </div>
      ))}
    </Collapsible>
  );
}
