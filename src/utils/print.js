// Imprime SOLO el preview en 1 página A4 con texto copiable y COLORES,
// forzando 2 columnas en modo impresión y respetando el tema seleccionado.
export async function printPreviewOnePage(
  previewEl,
  {
    orientation = "portrait",      // "portrait" | "landscape"
    pageBg = "#ffffff",            // Color de fondo
    marginMM = 0,                  // 0 = full-bleed
    showGutter = true,             // muestra/oculta la columna de líneas
    showHeader = true,             // muestra/oculta la barra de título
    isLightMode = true,            // Modo claro/oscuro
  } = {}
) {
  if (!previewEl) return;

  const win = window.open("", "_blank");
  if (!win) {
    alert("Activa las ventanas emergentes para imprimir el CV.");
    return;
  }

  const pageWmm = orientation === "landscape" ? 297 : 210;
  const pageHmm = orientation === "landscape" ? 210 : 297;

  // Variables CSS según el modo seleccionado
  const themeVars = isLightMode ? {
    bgPrimary: '#ffffff',
    bgSecondary: '#f8fafc',
    bgTertiary: '#e2e8f0',
    bgCode: '#f8fafc',
    bgCodeHeader: '#e2e8f0',
    bgCodeGutter: '#f1f5f9',
    textPrimary: '#0f172a',
    textSecondary: '#334155',
    textMuted: '#64748b',
    textCodeKeyword: '#059669',
    textCodeType: '#0284c7',
    textCodeVariable: '#7c3aed',
    textCodeString: '#d97706',
    borderPrimary: '#e2e8f0',
    borderSecondary: '#cbd5e1'
  } : {
    bgPrimary: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    bgCode: '#0b1321',
    bgCodeHeader: '#0e1628',
    bgCodeGutter: '#0a0f1a',
    textPrimary: '#f1f5f9',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
    textCodeKeyword: '#34d399',
    textCodeType: '#7dd3fc',
    textCodeVariable: '#c4b5fd',
    textCodeString: '#fde68a',
    borderPrimary: '#334155',
    borderSecondary: '#475569'
  };

  // Documento base de impresión con estilos globales integrados
  const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Print CV</title>
<style>
  @page { 
    size: A4 ${orientation}; 
    margin: ${marginMM}mm; 
  }
  
  /* ==================== VARIABLES CSS PARA IMPRESIÓN ==================== */
  :root {
    --bg-primary: ${themeVars.bgPrimary};
    --bg-secondary: ${themeVars.bgSecondary};
    --bg-tertiary: ${themeVars.bgTertiary};
    --bg-code: ${themeVars.bgCode};
    --bg-code-header: ${themeVars.bgCodeHeader};
    --bg-code-gutter: ${themeVars.bgCodeGutter};
    
    --text-primary: ${themeVars.textPrimary};
    --text-secondary: ${themeVars.textSecondary};
    --text-muted: ${themeVars.textMuted};
    --text-code-keyword: ${themeVars.textCodeKeyword};
    --text-code-type: ${themeVars.textCodeType};
    --text-code-variable: ${themeVars.textCodeVariable};
    --text-code-string: ${themeVars.textCodeString};
    
    --border-primary: ${themeVars.borderPrimary};
    --border-secondary: ${themeVars.borderSecondary};
  }

  html, body { 
    height: 100%; 
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }
  
  body {
    margin: 0 !important;
    background: ${pageBg} !important;
    color: var(--text-primary) !important;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
    color-adjust: exact !important;
  }
  
  .page {
    width: ${pageWmm}mm;
    height: ${pageHmm}mm;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    background: ${pageBg};
    display: grid;
    place-items: start;
  }
  
  .scale-root { 
    transform-origin: top left; 
    will-change: transform; 
  }

  /* ==================== ESTILOS DE CÓDIGO ==================== */
  .code-container {
    background-color: var(--bg-code);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    border: 1px solid var(--border-secondary);
    max-width: 100%;
    height: fit-content;
  }
  
  .code-header {
    background-color: var(--bg-code-header);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--border-secondary);
  }
  
  .code-gutter {
    background-color: var(--bg-code-gutter);
    padding: 1.5rem 0.75rem;
    font-size: 0.75rem;
    user-select: none;
    flex-shrink: 0;
    color: var(--text-muted);
    width: 3rem;
    text-align: right;
  }
  
  .code-content {
    padding: 1.5rem;
    font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', Consolas, monospace;
    font-size: 0.875rem;
    color: var(--text-primary);
    height: auto;
    min-height: auto;
  }
  
  .code-keyword { color: var(--text-code-keyword); }
  .code-type { color: var(--text-code-type); }
  .code-variable { color: var(--text-code-variable); }
  .code-string { color: var(--text-code-string); }
  .code-comment { color: var(--text-muted); }

  /* ==================== LAYOUT ==================== */
  .leading-7 { line-height: 1.75rem; }
  .whitespace-pre-wrap { white-space: pre-wrap; }
  .ml-6 { margin-left: 1.5rem; }
  .mt-6 { margin-top: 1.5rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mt-4 { margin-top: 1rem; }
  .mb-6 { margin-bottom: 1.5rem; }
  .gap-4 { gap: 1rem; }
  .gap-12 { gap: 3rem; }
  .flex { display: flex; }
  .items-start { align-items: flex-start; }
  .flex-shrink-0 { flex-shrink: 0; }
  .flex-1 { flex: 1 1 0%; }
  .grid { display: grid; }
  .place-content-center { place-content: center; }
  .w-40 { width: 10rem; }
  .h-40 { height: 10rem; }
  .w-20 { width: 5rem; }
  .h-20 { height: 5rem; }
  .rounded-lg { border-radius: 0.5rem; }
  .object-cover { object-fit: cover; }

  /* ==================== FORZAR 2 COLUMNAS EN IMPRESIÓN ==================== */
  .two-col {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    column-gap: 3rem !important;
    row-gap: 1.5rem !important;
  }

  /* Mostrar/ocultar partes */
  ${showGutter ? "" : ".gutter { display: none !important; }"}
  ${showHeader ? "" : ".print-hide-header { display: none !important; }"}

  /* Asegurar colores/fondo en todos los nodos */
  * { 
    -webkit-print-color-adjust: exact !important; 
    print-color-adjust: exact !important; 
  }
  
  @media print { 
    html, body { overflow: hidden; }
    .two-col {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      column-gap: 3rem !important;
      row-gap: 1.5rem !important;
    }
  }
</style>
</head>
<body>
  <div class="page"><div id="scaleRoot" class="scale-root"></div></div>
</body>
</html>`;

  win.document.open("text/html", "replace");
  win.document.write(html);
  win.document.close();

  // En lugar de copiar estilos externos, ya tenemos todo integrado
  // Solo esperamos que el documento esté listo
  await new Promise(resolve => {
    if (win.document.readyState === 'complete') {
      resolve();
    } else {
      win.addEventListener('load', resolve);
    }
  });

  // Clonar SOLO el preview
  const scaleRoot = win.document.getElementById("scaleRoot");
  const inner = previewEl.querySelector(".print-scale") || previewEl;
  const clone = win.document.importNode(inner, true);
  scaleRoot.appendChild(clone);

  // Esperar fonts/imagenes/layout
  const waitFrame = () => new Promise(r => win.requestAnimationFrame(() => win.requestAnimationFrame(r)));
  const waitImgs = () => Promise.all(
    Array.from(win.document.images).map(img =>
      img.complete ? Promise.resolve() : new Promise(res => (img.onload = img.onerror = res))
    )
  );
  
  await waitImgs();
  await waitFrame();

  // Escalar para encajar TODO en 1 A4
  const page = win.document.querySelector(".page");
  const a4 = page.getBoundingClientRect();
  clone.style.transform = "none";
  clone.style.transformOrigin = "top left";
  await waitFrame();

  const cr = clone.getBoundingClientRect();
  const scale = Math.min(a4.width / cr.width, a4.height / cr.height);
  clone.style.transform = `scale(${scale})`;

  setTimeout(() => {
    win.focus();
    win.print();
    win.addEventListener("afterprint", () => win.close());
  }, 300);
}
