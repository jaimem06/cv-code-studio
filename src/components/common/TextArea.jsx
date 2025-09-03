export default function TextArea({ label, value, onChange, rows = 4, placeholder = "" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="input-base"
      />
    </div>
  );
}