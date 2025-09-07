import Collapsible from "../common/Collapsible.jsx";
import Input from "../common/Input.jsx";

export default function EducationEditor({ education, setEducation }) {
  const safeEducation = Array.isArray(education) ? education : [];

  const add = () => {
    setEducation((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return [...safePrev, { level: "", field: "", date: "", institution: "" }];
    });
  };

  const remove = (i) => {
    setEducation((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.filter((_, j) => j !== i);
    });
  };

  const update = (i, k, v) => {
    setEducation((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.map((x, j) => (j === i ? { ...x, [k]: v } : x));
    });
  };

  return (
    <Collapsible title="Educación" defaultOpen>
      <div className="flex items-center justify-end pb-3">
        <button
          onClick={add}
          type="button"
          className="btn-primary"
        >
          ➕ Añadir estudio
        </button>
      </div>
      {safeEducation.map((ed, i) => (
        <div key={i} className="added-item-education">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nivel"
              value={ed.level || ""}
              onChange={(v) => update(i, "level", v)}
              placeholder="Bachelor / Master / etc"
            />
            <Input
              label="Campo"
              value={ed.field || ""}
              onChange={(v) => update(i, "field", v)}
              placeholder="Computer Science"
            />
            <Input
              label="Año"
              value={ed.date || ""}
              onChange={(v) => update(i, "date", v)}
              placeholder="2024"
            />
            <Input
              label="Institución"
              value={ed.institution || ""}
              onChange={(v) => update(i, "institution", v)}
            />
          </div>
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