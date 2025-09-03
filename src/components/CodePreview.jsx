import React, { useEffect, useRef, useState } from "react";

const K = ({ children }) => <span className="code-keyword">{children}</span>;
const T = ({ children }) => <span className="code-type">{children}</span>;
const V = ({ children }) => <span className="code-variable">{children}</span>;
const S = ({ children }) => <span className="code-string">{children}</span>;
const Line = ({ children, indent = false }) => (
  <div className={`whitespace-pre-wrap leading-7 ${indent ? "ml-6" : ""}`}>{children}</div>
);
const SectionTitle = ({ children }) => (
  <div className="mt-6 mb-2 code-comment leading-7">{children}</div>
);

function Enum({ title, items }) {
  return (
    <div className="mt-4">
      <Line>enum <K>{title}</K></Line>
      <Line indent>{items.length ? items.join(", ") : "// add items"}</Line>
    </div>
  );
}

function Block({ title, items }) {
  return (
    <div className="mt-4">
      <Line><K>{title}</K></Line>
      <Line indent>{items.length ? items.join(", ") : "// add items"}</Line>
    </div>
  );
}

export default function CodePreview({ data, previewRef, onHeightChange, isLightMode }) {
  const contentRef = useRef(null);
  const [lineCount, setLineCount] = useState(1);

  // Calcular líneas basado en elementos reales del DOM
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const compute = () => {
      // Contar elementos que tienen la clase leading-7 (nuestras líneas)
      const lineElements = el.querySelectorAll('.leading-7, .code-comment');
      const actualLineCount = Math.max(1, lineElements.length);
      setLineCount(actualLineCount);
    };

    const ro = new ResizeObserver(() => {
      setTimeout(compute, 50);
    });
    
    ro.observe(el);
    
    // Calcular inmediatamente
    compute();
    
    // Recalcular cuando cambien los datos
    setTimeout(compute, 100);

    return () => ro.disconnect();
  }, [data]);

  useEffect(() => {
    const el = previewRef.current;
    if (!el) return;
    
    const ro = new ResizeObserver(([entry]) => {
      const height = entry.contentRect.height;
      if (onHeightChange) {
        onHeightChange(height);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeightChange]);

  return (
    <div
      ref={previewRef}
      id="printRoot"
      className="code-container animate-fade-in"
    >
      {/* Header tipo ventana */}
      <div className="code-header print-hide-header">
        <span className="h-3 w-3 rounded-full bg-rose-500" />
        <span className="h-3 w-3 rounded-full bg-amber-500" />
        <span className="h-3 w-3 rounded-full bg-emerald-500" />
        <span className="ml-3 text-xs code-comment">cv/Resume.cs</span>
      </div>

      {/* Cuerpo con gutter izquierdo */}
      <div className="flex">
        {/* Gutter de líneas - ajustado al contenido real */}
        <div className="hidden md:block code-gutter gutter">
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} className="leading-7 text-right min-w-[2.5rem]">
              {i + 1}
            </div>
          ))}
        </div>

        {/* Contenido principal */}
        <div 
          ref={contentRef}
          className="print-scale code-content w-full"
        >
          {/* Top: foto + summary */}
          <div className="flex items-start gap-4 mb-6">
            {data.photoUrl ? (
              <img 
                src={data.photoUrl} 
                alt="avatar" 
                className="w-40 h-40 rounded-lg object-cover flex-shrink-0"
                style={{ border: `1px solid var(--border-secondary)` }}
              />
            ) : (
              <div 
                className="w-20 h-20 rounded-lg grid place-content-center code-comment flex-shrink-0"
                style={{ 
                  backgroundColor: "var(--bg-secondary)", 
                  border: `1px solid var(--border-secondary)` 
                }}
              >
                IMG
              </div>
            )}
            <div className="flex-1">
              {data.summary.filter(Boolean).map((s, i) => (
                <div key={i} className="code-comment leading-7">/// {s}</div>
              ))}
            </div>
          </div>

          {/* Dos columnas */}
          <div className="two-col grid md:grid-cols-2 gap-12">
            {/* Columna izquierda */}
            <div>
              {data.about && (
                <>
                  <SectionTitle>public static <K>ABOUT_ME</K></SectionTitle>
                  <Line>// {data.about}</Line>
                </>
              )}
              
              <SectionTitle>public <K>INFORMATION</K></SectionTitle>
              <Line>public <T>string</T> <V>name</V> = <S>"{data.info.name || "Your Name"}"</S>;</Line>
              <Line>public <T>string</T> <V>title</V> = <S>"{data.info.title || "Software Engineer"}"</S>;</Line>
              <Line>public <T>string</T> <V>email</V> = <S>"{data.info.email || "you@email.com"}"</S>;</Line>
              <Line>public <T>string</T> <V>PHONE</V> = <S>"{data.info.phone || "+000 000 000"}"</S>;</Line>
              <Line>public <T>string</T> <V>LOCATION</V> = <S>"{data.info.location || "City, Country"}"</S>;</Line>
              <Line><V>VEHICLE_LICENSE</V> = {String(Boolean(data.info.vehicleLicense))};</Line>
              <Line><V>AGE</V> = {data.info.age || 24};</Line>

              <SectionTitle>public <K>Developer</K></SectionTitle>
              <Enum title="PLATFORMS" items={data.platforms} />
              <Enum title="LANGUAGES" items={data.languages} />
              <Block title="TOOLS" items={data.tools} />
              <Block title="LANGUAGES SPOKEN" items={data.spoken} />
              <Block title="PROFILE" items={data.profile} />
            </div>

            {/* Columna derecha */}
            <div>
              <SectionTitle>public static class <K>EDUCATION</K></SectionTitle>
              {data.education.map((ed, i) => (
                <div key={i} className="ml-6">
                  <Line>private void <V>University{i + 1}</V>()</Line>
                  <Line indent>var <V>Level</V> = <S>"{ed.level}"</S>;</Line>
                  <Line indent>var <V>Field</V> = <S>"{ed.field}"</S>;</Line>
                  <Line indent>var <V>Date</V> = <S>"{ed.date}"</S>;</Line>
                  <Line indent>var <V>Institution</V> = <S>"{ed.institution}"</S>;</Line>
                </div>
              ))}

              <SectionTitle>public static <K>EXPERIENCE</K></SectionTitle>
              {data.experiences.map((ex, i) => (
                <div key={i} className="ml-6">
                  <Line>public void <V>{(ex.company || `Company${i + 1}`).replace(/\s+/g, "")}</V>()</Line>
                  <Line indent>var <V>Duration</V> = Range(<S>"{ex.start}"</S>, <S>"{ex.end || "Present"}"</S>);</Line>
                  <Line indent>var <V>Role</V> = <S>"{ex.role}"</S>;</Line>
                  <Line indent>var <V>Type</V> = <S>"{ex.type}"</S>;</Line>
                  {ex.bullets.filter(Boolean).map((b, bi) => (
                    <Line key={bi} indent>// {b}</Line>
                  ))}
                </div>
              ))}

              {data.projects.length > 0 && (
                <>
                  <SectionTitle>public static <K>PROJECTS</K></SectionTitle>
                  {data.projects.map((p, i) => (
                    <div key={i} className="ml-6">
                      <Line>public void <V>{(p.name || `Project${i + 1}`).replace(/\s+/g, "")}</V>()</Line>
                      {p.link && (<Line indent>var <V>Link</V> = <S>"{p.link}"</S>;</Line>)}
                      {p.summary && (<Line indent>// {p.summary}</Line>)}
                      {p.stack?.length > 0 && (
                        <Line indent>var <V>Stack</V> = [<S>"{p.stack.join('", "')}"</S>];</Line>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}