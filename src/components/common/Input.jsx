export default function Input({ label, value, onChange, placeholder = "", type = "text" }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
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