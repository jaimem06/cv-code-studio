import { useState } from "react";

export default function Collapsible({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  
  return (
    <div className="collapsible animate-fade-in">
      <button 
        type="button" 
        onClick={() => setOpen(!open)} 
        className="collapsible-trigger"
      >
        <span>{title}</span>
        <span className={`transition-transform ${open ? "rotate-180" : ""}`}>⌃</span>
      </button>
      {open && (
        <div className="collapsible-content animate-slide-down">
          {children}
        </div>
      )}
    </div>
  );
}