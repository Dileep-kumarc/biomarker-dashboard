import React, { useState, useRef } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, ResponsiveContainer, Tooltip, ReferenceLine } from "recharts"
import { ChevronRight, X, Info } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { addMonths, subYears, isAfter, parseISO } from "date-fns"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

interface BiomarkerBlockProps {
  name: string
  value: number
  unit: string
  timestamp: string
  referenceRange: string
  status: "normal" | "borderline" | "abnormal"
  trendData: { date: string; value: number }[]
  onClick?: () => void
}

const statusColors = {
  normal: "bg-green-100 text-green-800 border-green-300",
  borderline: "bg-yellow-100 text-yellow-800 border-yellow-300",
  abnormal: "bg-red-100 text-red-800 border-red-300",
}

const statusLabels = {
  normal: "Normal: Value is within the healthy reference range.",
  borderline: "Borderline: Value is close to the limit, monitor closely.",
  abnormal: "Abnormal: Value is outside the healthy range, consult a doctor.",
}

// Example clinical context (could be expanded or made dynamic)
const clinicalDescriptions: Record<string, string> = {
  "Total Cholesterol": "High cholesterol increases risk of heart disease. Maintain a healthy diet and exercise regularly.",
  "HDL Cholesterol": "HDL is 'good' cholesterol. Higher values are protective.",
  "LDL Cholesterol": "LDL is 'bad' cholesterol. Lower values are better.",
  "Triglycerides": "High triglycerides can increase risk of heart disease.",
  "Creatinine": "Creatinine is a marker of kidney function.",
  "BUN": "BUN is a marker of kidney function.",
  "Uric Acid": "High uric acid can cause gout and kidney stones.",
  "Vitamin D": "Vitamin D is important for bone and immune health.",
  "Vitamin B12": "B12 is essential for nerve and blood health.",
  "Folate (B9)": "Folate is important for cell growth and metabolism.",
  "HbA1c": "HbA1c reflects average blood sugar over 3 months.",
  "Fasting Blood Sugar (FBS)": "FBS is a measure of blood sugar after fasting.",
  "Postprandial Blood Sugar (PPBS)": "PPBS is a measure of blood sugar after eating.",
  "SGPT (ALT)": "ALT is a liver enzyme. High values may indicate liver damage.",
  "SGOT (AST)": "AST is a liver enzyme. High values may indicate liver damage.",
  "ALP": "ALP is a liver enzyme. High values may indicate liver or bone issues.",
  "TSH": "TSH is a thyroid hormone. Abnormal values may indicate thyroid dysfunction.",
  "CRP": "CRP is a marker of inflammation.",
  "Hemoglobin (Hb)": "Hemoglobin carries oxygen in the blood.",
  "RBC Count": "Red blood cell count. Low values may indicate anemia.",
  "WBC Count": "White blood cell count. High or low values may indicate infection or immune issues.",
}

function filterByTime(trendData: { date: string; value: number }[], timeFilter: '3M' | '6M' | '1Y' | 'ALL') {
  if (timeFilter === 'ALL') return trendData
  const lastDate = trendData.length ? parseISO(trendData[trendData.length - 1].date) : new Date()
  let cutoff: Date
  if (timeFilter === '3M') cutoff = addMonths(lastDate, -3)
  else if (timeFilter === '6M') cutoff = addMonths(lastDate, -6)
  else cutoff = subYears(lastDate, 1)
  return trendData.filter(d => isAfter(parseISO(d.date), cutoff))
}

export const BiomarkerBlock: React.FC<BiomarkerBlockProps> = ({
  name,
  value,
  unit,
  timestamp,
  referenceRange,
  status,
  trendData,
  onClick,
}) => {
  const [open, setOpen] = useState(false)
  const [timeFilter, setTimeFilter] = useState<'3M' | '6M' | '1Y' | 'ALL'>('ALL')
  const [showRefTooltip, setShowRefTooltip] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)

  // Filtered data for chart
  const filteredTrendData = filterByTime(trendData, timeFilter)

  // Parse reference range for threshold lines
  let refMin: number | undefined = undefined
  let refMax: number | undefined = undefined
  const refMatch = referenceRange.match(/([\d.]+)\s*-\s*([\d.]+)/)
  if (refMatch) {
    refMin = parseFloat(refMatch[1])
    refMax = parseFloat(refMatch[2])
  }

  // Export as PNG
  const handleExportPNG = async () => {
    if (!chartRef.current) return
    const canvas = await html2canvas(chartRef.current, { backgroundColor: null })
    const link = document.createElement('a')
    link.download = `${name.replace(/\s+/g, '_').toLowerCase()}_chart.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  // Export as PDF
  const handleExportPDF = async () => {
    if (!chartRef.current) return
    const canvas = await html2canvas(chartRef.current, { backgroundColor: null })
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = pageWidth - 40
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.text(`${name} Trend Analysis`, 40, 40)
    pdf.addImage(imgData, 'PNG', 20, 60, imgWidth, imgHeight)
    pdf.save(`${name.replace(/\s+/g, '_').toLowerCase()}_chart.pdf`)
  }

  return (
    <>
      <motion.article
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-md mx-auto group cursor-pointer focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 outline-none"
        aria-label={`Biomarker: ${name}, latest value ${value} ${unit}, status ${status}`}
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(true) }}
      >
        <Card
          className={
            "w-full h-full flex flex-col justify-between transition-all duration-300 border-l-4 border-blue-400 " +
            "hover:shadow-xl hover:border-blue-600 focus-within:shadow-xl focus-within:border-blue-600 " +
            "active:scale-[0.98] "
          }
        >
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-semibold text-gray-800 truncate max-w-[70%]">{name}</CardTitle>
            <div className="flex items-center gap-2">
              <span className="relative group">
                <Badge
                  className={`text-xs px-3 py-1.5 font-medium border ${statusColors[status]}`}
                  tabIndex={0}
                  aria-label={statusLabels[status]}
                >
                  {status.toUpperCase()}
                </Badge>
                <span className="absolute left-1/2 -translate-x-1/2 mt-2 z-20 hidden group-hover:block group-focus:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                  {statusLabels[status]}
                </span>
              </span>
              <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition" />
            </div>
          </CardHeader>
          <CardContent className="pt-0 flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-1 mb-1 w-full">
              <span className="text-3xl font-bold text-gray-900">{value} <span className="text-lg font-normal text-gray-500">{unit}</span></span>
              <span className="text-xs text-gray-500">{timestamp}</span>
            </div>
            <div className="flex items-center justify-between mb-1 w-full">
              <span className="text-xs text-gray-600">Ref: {referenceRange}</span>
            </div>
            <div className="w-full h-16 sm:h-12">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                  <Tooltip contentStyle={{ fontSize: 12 }} labelFormatter={() => ""} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.article>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-lg w-full mx-2 p-4 relative flex flex-col gap-4"
              initial={{ scale: 0.95, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 40 }}
              transition={{ type: "spring", stiffness: 180, damping: 18 }}
              onClick={e => e.stopPropagation()}
              role="document"
              aria-label={`${name} biomarker details`}
            >
              <button className="absolute top-2 right-2 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={() => setOpen(false)} aria-label="Close modal">
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-lg font-bold text-blue-700 mb-2">{name} Trend Analysis</h3>
              {/* Time filter buttons */}
              <div className="flex gap-2 mb-2" role="group" aria-label="Time filter">
                {['3M', '6M', '1Y', 'ALL'].map(tf => (
                  <button
                    key={tf}
                    className={`px-2 py-1 rounded text-xs font-medium border focus:outline-none focus:ring-2 focus:ring-blue-400 ${timeFilter === tf ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'}`}
                    onClick={() => setTimeFilter(tf as any)}
                    aria-pressed={timeFilter === tf}
                  >
                    {tf}
                  </button>
                ))}
              </div>
              {/* Full chart with pan/zoom and threshold lines, horizontally scrollable on mobile */}
              <div className="w-full h-48 mb-2 overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="min-w-[400px]">
                  <div ref={chartRef} aria-label={`${name} time-series chart`} role="figure" tabIndex={0}>
                    <ResponsiveContainer width="100%" height={180}>
                      <LineChart data={filteredTrendData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                        <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={true} />
                        <Tooltip contentStyle={{ fontSize: 12 }} labelFormatter={() => ""} />
                        {refMin !== undefined && <ReferenceLine y={refMin} stroke="#22c55e" strokeDasharray="3 3" label={{ value: 'Min', position: 'left', fill: '#22c55e', fontSize: 10 }} />}
                        {refMax !== undefined && <ReferenceLine y={refMax} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Max', position: 'left', fill: '#ef4444', fontSize: 10 }} />}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              {/* Clinical context under chart */}
              <div className="flex items-center gap-2 text-xs text-blue-900 dark:text-blue-100 mb-2">
                <Info className="w-4 h-4 text-blue-400" aria-hidden="true" />
                <span>{clinicalDescriptions[name] || "No clinical context available."}</span>
              </div>
              {/* Raw value table */}
              <div className="overflow-x-auto mb-2">
                <table className="min-w-full text-xs border rounded" aria-label={`${name} raw value table`}>
                  <thead>
                    <tr className="bg-blue-50 text-blue-700">
                      <th className="px-2 py-1 text-left">Date</th>
                      <th className="px-2 py-1 text-left">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTrendData.map((d, i) => (
                      <tr key={i} className="even:bg-gray-50 dark:even:bg-gray-800">
                        <td className="px-2 py-1">{d.date}</td>
                        <td className="px-2 py-1">{d.value} {unit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Clinical info and AI insights (placeholder) */}
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded p-2 text-xs text-blue-900 dark:text-blue-100">
                <strong>Status:</strong> {statusLabels[status]}<br />
                <strong>Reference Range:</strong>
                <span
                  className="inline-flex items-center ml-1 underline decoration-dotted cursor-help relative"
                  tabIndex={0}
                  aria-label="Reference range explanation"
                  onMouseEnter={() => setShowRefTooltip(true)}
                  onMouseLeave={() => setShowRefTooltip(false)}
                  onFocus={() => setShowRefTooltip(true)}
                  onBlur={() => setShowRefTooltip(false)}
                >
                  {referenceRange}
                  {showRefTooltip && (
                    <span className="absolute left-1/2 -translate-x-1/2 mt-6 z-30 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                      This is the clinically accepted healthy range for this biomarker.
                    </span>
                  )}
                </span>
                <br />
                <strong>AI Insight:</strong> <span className="italic">Consider vitamin D supplementation due to consistent deficiency.</span>
              </div>
              {/* Export buttons */}
              <div className="flex gap-2 mt-2">
                <button className="px-3 py-1 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleExportPNG}>Export PNG</button>
                <button className="px-3 py-1 rounded bg-gray-600 text-white text-xs font-semibold hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400" onClick={handleExportPDF}>Export PDF</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
} 