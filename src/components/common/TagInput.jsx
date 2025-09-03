import { useState } from "react";

export default function TagInput({ label, values, onAdd, onRemove, placeholder = "Añadir y Enter" }) {
  const [t, setT] = useState("");

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>

      <div className="flex items-center gap-2">
        <input
          value={t}
          onChange={(e) => setT(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && t.trim()) {
              e.preventDefault();
              onAdd(t.trim());
              setT("");
            }
          }}
          placeholder={placeholder}
          className="input-base"
        />
        <button
          type="button"
          onClick={() => {
            if (t.trim()) {
              onAdd(t.trim());
              setT("");
            }
          }}
          className="btn-primary text-sm px-3 py-2"
        >
          + Añadir
        </button>
      </div>
      <div className="mt-2 flex flex-wrap gap-2">
        {values.map((v, i) => (
          <span key={i} className="tag">
            {v}
            <button
              type="button"
              onClick={() => onRemove(i)}
              className="tag-remove"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}