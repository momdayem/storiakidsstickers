import jsPDF from 'jspdf';

export async function generatePDF(pages) {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  for (let i = 0; i < pages.length; i++) {
    if (i > 0) {
      pdf.addPage();
    }

    try {
      // Add page image
      const imgData = pages[i];
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4 size in mm
    } catch (error) {
      console.error(`Error adding page ${i + 1}:`, error);
    }
  }

  return pdf;
}

export function downloadPDF(pdf, filename = 'sticker-book.pdf') {
  pdf.save(filename);
}

export function downloadImage(dataUrl, filename) {
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
