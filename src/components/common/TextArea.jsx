export default function TextArea({ label, value, onChange, rows = 4, placeholder = "" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="input-base resize-none"
      />
    </div>
  );
}