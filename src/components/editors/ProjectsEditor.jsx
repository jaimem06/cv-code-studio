import Collapsible from "../common/Collapsible.jsx";
import Input from "../common/Input.jsx";
import TextArea from "../common/TextArea.jsx";
import TagInput from "../common/TagInput.jsx";

export default function ProjectsEditor({ projects, setProjects }) {
  const safeProjects = Array.isArray(projects) ? projects : [];

  const add = () => {
    setProjects((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return [...safePrev, { name: "", link: "", summary: "", stack: [] }];
    });
  };

  const remove = (i) => {
    setProjects((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((_, j) => j !== i);
    });
  };

  const update = (i, k, v) => {
    setProjects((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => (j === i ? { ...x, [k]: v } : x));
    });
  };

  const addTag = (i, text) => {
    setProjects((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => j === i ? { ...x, stack: [...(x.stack || []), text] } : x);
    });
  };

  const remTag = (i, ti) => {
    setProjects((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => j === i ? { ...x, stack: (x.stack || []).filter((_, k) => k !== ti) } : x);
    });
  };

  return (
    <Collapsible title="Proyectos">
      <div className="flex items-center justify-end pb-3">
        <button onClick={add} type="button" className="btn-primary">🚀 Añadir proyecto</button>
      </div>
      {safeProjects.map((p, i) => (
        <div key={i} className="added-item-project">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nombre" value={p.name || ""} onChange={(v) => update(i, "name", v)} />
            <Input label="Link" value={p.link || ""} onChange={(v) => update(i, "link", v)} placeholder="https://..." />
          </div>
          <TextArea label="Resumen" value={p.summary || ""} onChange={(v) => update(i, "summary", v)} rows={3} />
          <TagInput label="Stack" values={p.stack || []} onAdd={(t) => addTag(i, t)} onRemove={(ti) => remTag(i, ti)} />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={() => remove(i)} className="btn-danger px-3 py-2 text-xs">🗑️ Eliminar</button>
          </div>
        </div>
      ))}
    </Collapsible>
  );
}
