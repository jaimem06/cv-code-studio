import html2canvas from "html2canvas";
import jsPDF from "jspdf";

/**
 * Exporta el elemento 'el' a UNA sola página A4.
 * Escala todo el contenido para que quepa completo sin cortes.
 * fullBleed = true -> sin márgenes; false -> añade padding.
 */
export async function exportSinglePagePDF(el, { fullBleed = true, maxScale = 2.5 } = {}) {
  if (!el) return;

  const dpr = Math.min(window.devicePixelRatio || 1, maxScale);
  const canvas = await html2canvas(el, {
    scale: dpr,
    backgroundColor: getComputedStyle(el).backgroundColor || "#0b1321",
    useCORS: true,
    logging: false,
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({ orientation: "p", unit: "pt", format: "a4", compress: true });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  const padding = fullBleed ? 0 : 16; // margen opcional fino
  const fitW = pageW - padding * 2;
  const fitH = pageH - padding * 2;

  // 🔥 Clave: usar el mínimo para encajar COMPLETO en una sola página
  const ratio = Math.min(fitW / canvas.width, fitH / canvas.height);
  const w = canvas.width * ratio;
  const h = canvas.height * ratio;

  const x = (pageW - w) / 2;
  const y = (pageH - h) / 2;

  pdf.addImage(imgData, "PNG", x, y, w, h, undefined, "FAST");
  pdf.save("cv.pdf");
}
