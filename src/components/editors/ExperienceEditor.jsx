import Collapsible from "../common/Collapsible.jsx";
import Input from "../common/Input.jsx";
import TagInput from "../common/TagInput.jsx";

export default function ExperienceEditor({ experiences, setExperiences }) {
  const add = () => setExperiences((xs) => [...xs, { company: "", role: "", type: "", start: "", end: "", bullets: [] }]);
  const remove = (i) => setExperiences((xs) => xs.filter((_, j) => j !== i));
  const update = (i, k, v) => setExperiences((xs) => xs.map((x, j) => (j === i ? { ...x, [k]: v } : x)));
  const addBullet = (i, t) => setExperiences((xs) => xs.map((x, j) => j === i ? { ...x, bullets: [...x.bullets, t] } : x));
  const remBullet = (i, k) => setExperiences((xs) => xs.map((x, j) => j === i ? { ...x, bullets: x.bullets.filter((_, idx) => idx !== k) } : x));

  return (
    <Collapsible title="Experiencia" defaultOpen>
      <div className="flex items-center justify-end pb-3">
        <button onClick={add} type="button" className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow">+ Añadir experiencia</button>
      </div>
      {experiences.map((ex, i) => (
        <div key={i} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4 mb-4">
          <div className="grid grid-cols-2 gap-3">
            <Input label="Empresa" value={ex.company} onChange={(v) => update(i, "company", v)} />
            <Input label="Rol" value={ex.role} onChange={(v) => update(i, "role", v)} />
            <Input label="Tipo" value={ex.type} onChange={(v) => update(i, "type", v)} placeholder="Startup / Full-time / Freelance" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Inicio" value={ex.start} onChange={(v) => update(i, "start", v)} placeholder="2021" />
              <Input label="Fin" value={ex.end} onChange={(v) => update(i, "end", v)} placeholder="Present" />
            </div>
          </div>
          <TagInput label="Logros / responsabilidades" values={ex.bullets} onAdd={(t) => addBullet(i, t)} onRemove={(k) => remBullet(i, k)} />
          <div className="flex justify-end">
            <button type="button" onClick={() => remove(i)} className="inline-flex items-center gap-2 text-sm text-rose-300 hover:text-rose-200">Eliminar</button>
          </div>
        </div>
      ))}
    </Collapsible>
  );
}
