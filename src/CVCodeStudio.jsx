import React, { useEffect, useRef, useState, useCallback } from "react";
import { emptyCV, LS_KEY } from "./constants/sampleData.js";
import { toMarkdown } from "./utils/markdown.js";
import { download } from "./utils/download.js";
import CodePreview from "./components/CodePreview.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { printPreviewOnePage } from "./utils/print.js";

export default function CVCodeStudio() {
  const [data, setData] = useState(() => {
    try { 
      const raw = localStorage.getItem(LS_KEY); 
      return raw ? JSON.parse(raw) : emptyCV; 
    } catch { 
      return emptyCV; 
    }
  });

  const [isLightMode, setIsLightMode] = useState(() => {
    const saved = localStorage.getItem("cv-light-mode");
    return saved === "true";
  });

  const previewRef = useRef(null);
  const [previewHeight, setPreviewHeight] = useState(null);

  useEffect(() => { 
    localStorage.setItem(LS_KEY, JSON.stringify(data)); 
  }, [data]);

  useEffect(() => {
    localStorage.setItem("cv-light-mode", isLightMode.toString());
    if (isLightMode) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [isLightMode]);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  const onPrintPDF = () =>
    printPreviewOnePage(previewRef.current, {
      orientation: "portrait",
      pageBg: isLightMode ? "#ffffff" : "#0b1321",
      marginMM: 0,
      showGutter: true,
      showHeader: true,
      isLightMode: isLightMode,
    });

  const exportMD = () => download("cv.md", toMarkdown(data), "text/markdown;charset=utf-8");
  const loadDemo = () => setData(emptyCV);
  const resetAll = () => setData({ 
    ...emptyCV, 
    photoUrl: "", 
    info: { 
      ...emptyCV.info, 
      name: "", 
      title: "", 
      email: "", 
      phone: "", 
      location: "", 
      age: "" 
    } 
  });

  return (
    <div className="min-h-screen transition-theme">
      <div className="container-app">
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">CV Code Studio</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              CV estilo editor de código — preview + edición + exportación.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={toggleTheme} 
              className="btn-secondary"
              title={isLightMode ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            >
              {isLightMode ? "🌙" : "☀️"}
            </button>
            
            <button onClick={onPrintPDF} className="btn-secondary">
              Imprimir
            </button>
            
            <button onClick={exportMD} className="btn-secondary">
              Exportar Markdown
            </button>
            
            <button onClick={loadDemo} className="btn-primary">
              Cargar demo
            </button>

            <button onClick={resetAll} className="btn-ghost">
              Reset
            </button>
          </div>
        </header>

        <div className="grid-dashboard">
          <div className="space-y-4">
            <CodePreview 
              data={data} 
              previewRef={previewRef} 
              onHeightChange={setPreviewHeight}
              isLightMode={isLightMode}
            />
          </div>
          <Dashboard 
            data={data} 
            setData={setData} 
            previewHeight={previewHeight}
            isLightMode={isLightMode}
          />
        </div>
      </div>

      <footer className="mt-8 text-center text-xs" style={{ color: "var(--text-muted)" }}>
        Crear CV como codigo desde el navegador.
      </footer>
    </div>
  );
}