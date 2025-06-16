# Biomarker Trend Analytics Dashboard

A modern, professional health dashboard web application built with Next.js, Tailwind CSS, Recharts, and Framer Motion. Visualize and analyze multiple health biomarkers over time with exportable, interactive visualizations, clinical context, and mobile-first responsive design.

## 🚀 Features

- **Biomarker Panel:**
  - Lipid Profile: Total Cholesterol, HDL, LDL, Triglycerides
  - Kidney Function: Creatinine, BUN, Uric Acid
  - Vitamins: Vitamin D, Vitamin B12, Folate (B9)
  - Blood Sugar: HbA1c, FBS, PPBS
  - Liver Function: SGPT (ALT), SGOT (AST), ALP
  - Thyroid & Inflammation: TSH, CRP
  - Blood: Hemoglobin (Hb), RBC Count, WBC Count
- **For Each Biomarker:**
  - Name, latest value, timestamp, reference range badge
  - Clinical status (Normal, Borderline, Abnormal) with tooltip
  - Sparkline/mini trend chart
  - Clickable card opens modal with:
    - Full interactive time-series chart (pan/zoom, threshold lines)
    - Export as PNG or PDF
    - Raw value table
    - Clinical info and AI insight
    - Time filter (3M, 6M, 1Y, All)
- **Dashboard Layout:**
  - Responsive grid (desktop), single-column stack (mobile)
  - Sticky summary banner with health status (traffic light, counts, sparkline)
  - Category filters (Lipids, Kidney, etc.)
- **Accessibility & UX:**
  - Semantic HTML, aria-labels, keyboard navigation
  - Tooltips, focus states, and visually hidden labels
  - Animations with Framer Motion
  - Dark mode support
- **Export:**
  - Export individual biomarker charts as PNG or PDF

## 🛠️ Tech Stack
- Next.js (React)
- Tailwind CSS
- Recharts
- Framer Motion
- html2canvas, jsPDF (for export)

## 📦 Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   # or
   pnpm install
   ```
2. **Run the development server:**
   ```sh
   npm run dev
   # or
   pnpm dev
   ```
3. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📊 Usage Notes
- Click any biomarker card to view detailed trends, export, and clinical info.
- Use the category filter bar to focus on specific biomarker groups.
- The dashboard is fully responsive and accessible.
- All charts and tables can be exported for reporting or sharing.

## 🩺 Clinical Disclaimer
This dashboard is for educational and informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult your healthcare provider for medical decisions.

## 📄 License
MIT
