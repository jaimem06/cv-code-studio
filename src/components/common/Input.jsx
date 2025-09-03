export default function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="mb-3">
      <label className="block text-sm font-medium mb-1" style={{ color: "var(--text-secondary)" }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base"
      />
    </div>
  );
}