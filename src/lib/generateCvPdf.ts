import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';
import cvData from '@/data/cv.json';

const { personal, education, certifications, experience, skills } = cvData;

const MARGIN = 14;
const PAGE_W = 210;
const PAGE_H = 297;
const COL_W = PAGE_W - MARGIN * 2;
const GRAY = '#888888';
const BLACK = '#111111';
const LIGHT = '#cccccc';

function setColor(doc: jsPDF, hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  doc.setTextColor(r, g, b);
}

function drawLine(doc: jsPDF, y: number, color = LIGHT) {
  const [r, g, b] = [color.slice(1, 3), color.slice(3, 5), color.slice(5, 7)].map(h => parseInt(h, 16));
  doc.setDrawColor(r, g, b);
  doc.line(MARGIN, y, PAGE_W - MARGIN, y);
}

// Adds a new page and resets y to top margin
function newPage(doc: jsPDF): number {
  doc.addPage();
  return MARGIN + 6;
}

// Ensures there's enough room; adds page if not
function ensureSpace(doc: jsPDF, y: number, needed: number): number {
  if (y + needed > PAGE_H - 14) return newPage(doc);
  return y;
}

function sectionTitle(doc: jsPDF, y: number, text: string): number {
  y = ensureSpace(doc, y, 10);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  setColor(doc, GRAY);
  doc.text(text.toUpperCase(), MARGIN, y);
  drawLine(doc, y + 1.5);
  return y + 6;
}

export async function generateCvPdf() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  const qrDataUrl = await QRCode.toDataURL('https://miguelarrabal.es', {
    width: 160,
    margin: 1,
    color: { dark: '#111111', light: '#ffffff' },
  });

  // ── HEADER ──────────────────────────────────────────────────────────
  const QR_SIZE = 26;
  const QR_X = PAGE_W - MARGIN - QR_SIZE;
  let y = 14;

  doc.addImage(qrDataUrl, 'PNG', QR_X, y - 1, QR_SIZE, QR_SIZE);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  setColor(doc, GRAY);
  doc.text('Portfolio extendido:', QR_X + QR_SIZE / 2, y + QR_SIZE + 2, { align: 'center' });
  doc.text('miguelarrabal.es', QR_X + QR_SIZE / 2, y + QR_SIZE + 4, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  setColor(doc, BLACK);
  doc.text(personal.nameDisplay, MARGIN, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  setColor(doc, GRAY);
  doc.text(personal.title + '  ·  ' + personal.subtitle, MARGIN, y + 13);

  y += 19;

  doc.setFontSize(8.5);
  setColor(doc, '#555555');
  const descLines = doc.splitTextToSize(personal.description, COL_W - QR_SIZE - 6);
  doc.text(descLines, MARGIN, y);
  y += descLines.length * 4.2 + 3;

  y = Math.max(y, 14 + QR_SIZE + 6);

  const contacts = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin?.replace('https://www.', ''),
    personal.web?.replace('https://', ''),
  ].filter(Boolean) as string[];

  doc.setFontSize(8);
  setColor(doc, '#444444');
  doc.text(contacts.join('   ·   '), MARGIN, y);
  y += 7;

  // ── EXPERIENCE ──────────────────────────────────────────────────────
  y += 2;
  y = sectionTitle(doc, y, 'Experiencia');

  experience.slice(0, 4).forEach((exp, idx) => {
    const descExp = doc.splitTextToSize(exp.description, COL_W);
    const showAchievements = idx < 2 && exp.achievements?.length > 0;
    const achLines = showAchievements ? exp.achievements : [];
    const needed = 8 + Math.min(descExp.length, 2) * 4 + (achLines.length * 3.8) + 4;
    y = ensureSpace(doc, y, needed);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setColor(doc, BLACK);
    doc.text(exp.position, MARGIN, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    setColor(doc, GRAY);
    doc.text(`${exp.company}  ·  ${exp.period}  ·  ${exp.location}`, MARGIN, y + 3.8);

    doc.setFontSize(8);
    setColor(doc, '#555555');
    doc.text(descExp.slice(0, 2), MARGIN, y + 8);
    let localY = y + 8 + Math.min(descExp.length, 2) * 4;

    if (showAchievements) {
      localY += 2;
      doc.setFontSize(7.5);
      setColor(doc, '#444444');
      achLines.forEach((ach: string) => {
        const achWrapped = doc.splitTextToSize(`· ${ach}`, COL_W - 3);
        doc.text(achWrapped, MARGIN + 2, localY);
        localY += achWrapped.length * 3.8;
      });
    }

    y = localY + 4;
  });

  // ── EDUCATION ───────────────────────────────────────────────────────
  y += 2;
  y = sectionTitle(doc, y, 'Formación reglada');

  education.forEach((ed) => {
    y = ensureSpace(doc, y, 11);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setColor(doc, BLACK);
    doc.text(ed.degree, MARGIN, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    setColor(doc, GRAY);
    const inst = ed.institution.split('—')[0].trim();
    doc.text(`${inst}  ·  ${ed.period}${ed.note ? '  ·  ' + ed.note : ''}`, MARGIN, y + 3.8);
    y += 10;
  });

  // ── CERTIFICATIONS ──────────────────────────────────────────────────
  y += 2;
  y = sectionTitle(doc, y, 'Formación no reglada & Certificaciones');

  const colMid = MARGIN + COL_W / 2 + 3;
  const ROW_H = 9;

  // Certifications render in pairs per row — calculate row by row
  for (let i = 0; i < certifications.length; i += 2) {
    y = ensureSpace(doc, y, ROW_H + 1);
    [certifications[i], certifications[i + 1]].forEach((cert, j) => {
      if (!cert) return;
      const col = j === 0 ? MARGIN : colMid;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8.5);
      setColor(doc, BLACK);
      const nameLine = doc.splitTextToSize(cert.name, COL_W / 2 - 4);
      doc.text(nameLine[0], col, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      setColor(doc, GRAY);
      doc.text(
        `${cert.issuer}  ·  ${cert.year}${cert.hours ? '  ·  ' + cert.hours + 'h' : ''}`,
        col,
        y + 4
      );
    });
    y += ROW_H;
  }

  // ── SKILLS PORTFOLIO ────────────────────────────────────────────────
  const pdfSkills = [
    ...skills.Web.filter((s) => s.pdf === 1).map((s) => ({ ...s, tab: 'Web' })),
    ...skills.WordPress.filter((s) => s.pdf === 1).map((s) => ({ ...s, tab: 'WordPress' })),
    ...skills.Datos.filter((s) => s.pdf === 1).map((s) => ({ ...s, tab: 'Datos' })),
  ];

  if (pdfSkills.length > 0) {
    y += 4;
    y = sectionTitle(doc, y, 'Portfolio');

    pdfSkills.forEach((skill) => {
      const descSkill = doc.splitTextToSize(skill.description, COL_W);
      const needed = 4 + descSkill.length * 4 + 5;
      y = ensureSpace(doc, y, needed);

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      setColor(doc, BLACK);
      doc.text(skill.title, MARGIN, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      setColor(doc, GRAY);
      const meta = [skill.year, skill.tab, skill.tags.join(', ')].filter(Boolean).join('  ·  ');
      doc.text(meta, MARGIN, y + 3.8);

      doc.setFontSize(8);
      setColor(doc, '#555555');
      doc.text(descSkill, MARGIN, y + 8);
      y += needed;
    });

    y = ensureSpace(doc, y, 10);
    y += 4;
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    setColor(doc, GRAY);
    doc.text('Puede ver más en https://miguelarrabal.es o escaneando el QR', MARGIN, y);
    y += 6;
  }

  // ── FOOTER (last page) ──────────────────────────────────────────────
  const totalPages = (doc as jsPDF & { getNumberOfPages(): number }).getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    drawLine(doc, PAGE_H - 10);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    setColor(doc, GRAY);
    doc.text(
      `CV generado desde miguelarrabal.es  ·  ${p} / ${totalPages}`,
      PAGE_W / 2,
      PAGE_H - 6,
      { align: 'center' }
    );
  }

  doc.save(`CV_Miguel_Arrabal_${new Date().getFullYear()}.pdf`);
}
