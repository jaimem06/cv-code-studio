import Collapsible from "../common/Collapsible.jsx";
import Input from "../common/Input.jsx";
import TagInput from "../common/TagInput.jsx";

export default function ExperienceEditor({ experiences, setExperiences }) {
  // Ensure experiences is always an array
  const safeExperiences = Array.isArray(experiences) ? experiences : [];

  const add = () => {
    setExperiences((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return [...safePrev, { company: "", role: "", type: "", start: "", end: "", bullets: [] }];
    });
  };

  const remove = (i) => {
    setExperiences((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((_, j) => j !== i);
    });
  };

  const update = (i, k, v) => {
    setExperiences((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => (j === i ? { ...x, [k]: v } : x));
    });
  };

  const addBullet = (i, t) => {
    setExperiences((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => (j === i ? { ...x, bullets: [...(x.bullets || []), t] } : x));
    });
  };

  const remBullet = (i, k) => {
    setExperiences((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => (j === i ? { ...x, bullets: (x.bullets || []).filter((_, idx) => idx !== k) } : x));
    });
  };

  return (
    <Collapsible title="Experiencia" defaultOpen>
      <div className="flex items-center justify-end pb-3">
        <button
          onClick={add}
          type="button"
          className="btn-primary"
        >
          💼 Añadir experiencia
        </button>
      </div>
      {safeExperiences.map((ex, i) => (
        <div key={i} className="added-item-experience">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Empresa" value={ex.company || ""} onChange={(v) => update(i, "company", v)} />
            <Input label="Rol" value={ex.role || ""} onChange={(v) => update(i, "role", v)} />
            <Input label="Tipo" value={ex.type || ""} onChange={(v) => update(i, "type", v)} placeholder="Startup / Full-time / Freelance" />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Inicio" value={ex.start || ""} onChange={(v) => update(i, "start", v)} placeholder="2021" />
              <Input label="Fin" value={ex.end || ""} onChange={(v) => update(i, "end", v)} placeholder="Present" />
            </div>
          </div>
          <TagInput
            label="Logros / responsabilidades"
            values={ex.bullets || []}
            onAdd={(t) => addBullet(i, t)}
            onRemove={(k) => remBullet(i, k)}
          />
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={() => remove(i)}
              className="btn-danger px-3 py-2 text-xs"
            >
              🗑️ Eliminar
            </button>
          </div>
        </div>
      ))}
    </Collapsible>
  );
}
