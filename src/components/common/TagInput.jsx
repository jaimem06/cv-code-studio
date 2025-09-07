import { useState } from "react";

export default function TagInput({ label, values, onAdd, onRemove, placeholder = "Añadir y Enter" }) {
  const [t, setT] = useState("");

  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
        {label}
      </label>

      <div className="flex items-center gap-3 mb-3">
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
          className="input-base flex-1"
        />
        <button
          type="button"
          onClick={() => {
            if (t.trim()) {
              onAdd(t.trim());
              setT("");
            }
          }}
          className="btn-primary text-sm px-4 py-3"
        >
          ✨ Añadir
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
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