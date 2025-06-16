"use client"

import type { ReactNode } from "react"
import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Activity,
  Heart,
  Droplets,
  Bone,
  Brain,
  Zap,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  Info,
  CheckCircle,
  Target,
  Stethoscope,
  BookOpen,
  Shield,
  Lightbulb,
  Calendar,
  User,
  FileText,
  BarChart3,
  AlertOctagon,
} from "lucide-react"
import {
  sampleBiomarkerData,
  clinicalRanges,
  getRiskLevel,
  getClinicalInterpretation,
  type BiomarkerData,
} from "@/lib/data-processor"
import { CustomLineChart } from "./custom-line-chart"
import { BiomarkerBlock } from "./BiomarkerBlock"
import { motion, AnimatePresence } from "framer-motion"
import { ResponsiveContainer, LineChart, Line } from "recharts"

interface BiomarkerCardProps {
  title: string
  value: number
  unit: string
  parameter: string
  icon: ReactNode
  trend?: "up" | "down" | "stable"
  previousValue?: number
  description: string
}

function BiomarkerCard({ title, value, unit, parameter, icon, trend, previousValue, description }: BiomarkerCardProps) {
  const riskLevel = getRiskLevel(value, parameter)

  const riskInfo = {
    optimal: {
      color: "bg-green-50 text-green-800 border-green-200",
      icon: <CheckCircle className="h-4 w-4" />,
      text: "Optimal",
      message: "Within healthy range",
    },
    borderline: {
      color: "bg-amber-50 text-amber-800 border-amber-200",
      icon: <AlertTriangle className="h-4 w-4" />,
      text: "Borderline",
      message: "Consider lifestyle modifications",
    },
    high: {
      color: "bg-red-50 text-red-800 border-red-200",
      icon: <AlertTriangle className="h-4 w-4" />,
      text: "Requires Attention",
      message: "Consult healthcare provider",
    },
  }

  const currentRisk = riskInfo[riskLevel]

  const getTrendIcon = () => {
    if (!trend || value === 0) return null
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-green-500" />
      case "stable":
        return <Minus className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendText = () => {
    if (!previousValue || value === 0) return ""
    const change = (((value - previousValue) / previousValue) * 100)
    const changeStr = change.toFixed(1)
    return (
      <span className="text-xs text-gray-600">
        {change > 0 ? "+" : ""}
        {changeStr}% from previous
      </span>
    )
  }

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500 group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
              {icon}
            </div>
            <div>
              <CardTitle className="text-sm font-semibold text-gray-800">{title}</CardTitle>
              <p className="text-xs text-gray-600 mt-1">{description}</p>
            </div>
          </div>
          <div className="flex items-center gap-1">{getTrendIcon()}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-center mb-4">
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {value} <span className="text-lg font-normal text-gray-500">{unit}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-center">
            <Badge className={`${currentRisk.color} text-xs px-3 py-1.5 flex items-center gap-1.5 font-medium`}>
              {currentRisk.icon}
              {currentRisk.text}
            </Badge>
          </div>

          <p className="text-xs text-center text-gray-600 font-medium">{currentRisk.message}</p>

          {previousValue && <div className="text-center">{getTrendText()}</div>}
        </div>
      </CardContent>
    </Card>
  )
}

// Enhanced biomarker explanations with more clinical depth
const biomarkerExplanations = {
  totalCholesterol: {
    simple: "Total Cholesterol",
    description: "A waxy, fat-like substance found in all cells of your body",
    whatItMeans:
      "Total cholesterol measures all cholesterol in your blood, including LDL (bad), HDL (good), and VLDL cholesterol. Higher levels increase cardiovascular disease risk by contributing to arterial plaque formation.",
    goodRange: "Less than 200 mg/dL is desirable, 200-239 mg/dL is borderline high, 240+ mg/dL is high",
    tips: "Reduce saturated and trans fats, increase soluble fiber (oats, beans), maintain healthy weight, exercise regularly, consider plant stanols/sterols.",
    clinicalSignificance:
      "Primary screening tool for cardiovascular risk assessment. Used with other lipid markers to calculate 10-year cardiovascular risk scores.",
    complications:
      "Elevated levels contribute to atherosclerosis, coronary artery disease, stroke, and peripheral arterial disease.",
    monitoring: "Recheck every 4-6 years for adults over 20, more frequently if elevated or on treatment.",
  },
  hdlCholesterol: {
    simple: "HDL Cholesterol (Good Cholesterol)",
    description: "High-density lipoprotein that transports cholesterol from tissues back to the liver",
    whatItMeans:
      "HDL cholesterol acts as a 'cholesterol scavenger,' removing excess cholesterol from arterial walls and transporting it to the liver for disposal. Higher levels provide cardiovascular protection.",
    goodRange: "40+ mg/dL for men, 50+ mg/dL for women. Levels above 60 mg/dL provide additional protection",
    tips: "Regular aerobic exercise (30+ minutes daily), healthy fats (olive oil, nuts, fish), moderate alcohol (if appropriate), avoid smoking, maintain healthy weight.",
    clinicalSignificance:
      "Strong inverse predictor of cardiovascular disease. Each 1 mg/dL increase in HDL reduces heart disease risk by 2-3%.",
    complications:
      "Low HDL (<40 mg/dL men, <50 mg/dL women) is an independent risk factor for coronary heart disease and metabolic syndrome.",
    monitoring:
      "Part of routine lipid panel. Target levels may be higher for patients with existing cardiovascular disease.",
  },
  ldlCholesterol: {
    simple: "LDL Cholesterol (Bad Cholesterol)",
    description: "Low-density lipoprotein that carries cholesterol from liver to tissues",
    whatItMeans:
      "LDL cholesterol deposits cholesterol in arterial walls, leading to plaque formation and atherosclerosis. It's the primary target for cholesterol-lowering therapy.",
    goodRange: "<100 mg/dL optimal, <70 mg/dL for high-risk patients, <55 mg/dL for very high-risk patients",
    tips: "Limit saturated fat (<7% of calories), eliminate trans fats, increase soluble fiber, consider statins if indicated, plant-based diet patterns.",
    clinicalSignificance:
      "Primary therapeutic target for cardiovascular disease prevention. Used to guide statin therapy decisions and intensity.",
    complications:
      "Directly contributes to atherosclerotic plaque formation, acute coronary syndromes, and cardiovascular mortality.",
    monitoring:
      "Monitor 4-12 weeks after starting therapy, then every 3-12 months. Adjust treatment based on risk category and response.",
  },
  triglycerides: {
    simple: "Triglycerides",
    description: "Most common type of fat in the blood, stored in fat cells for energy",
    whatItMeans:
      "Triglycerides are influenced by diet, especially carbohydrates and alcohol. Elevated levels increase cardiovascular disease risk and can cause pancreatitis at very high levels.",
    goodRange: "<150 mg/dL normal, 150-199 mg/dL borderline high, 200-499 mg/dL high, ≥500 mg/dL very high",
    tips: "Reduce simple carbohydrates and sugars, limit alcohol, increase omega-3 fatty acids, lose weight if overweight, regular physical activity.",
    clinicalSignificance:
      "Component of metabolic syndrome. High levels often associated with low HDL and insulin resistance. Marker of cardiovascular and diabetes risk.",
    complications:
      "Very high levels (>500 mg/dL) can cause acute pancreatitis. Moderate elevation increases cardiovascular disease risk.",
    monitoring:
      "Fasting sample preferred. Recheck after lifestyle changes or medication adjustments. May fluctuate more than other lipids.",
  },
  creatinine: {
    simple: "Serum Creatinine",
    description: "Waste product from normal muscle breakdown, filtered by kidneys",
    whatItMeans:
      "Creatinine levels reflect kidney function. As kidney function declines, creatinine levels rise. Used to calculate estimated glomerular filtration rate (eGFR).",
    goodRange: "0.7-1.18 mg/dL for adults (varies by age, sex, muscle mass, and ethnicity)",
    tips: "Stay well-hydrated, avoid nephrotoxic medications, control blood pressure and diabetes, limit protein if advised by physician.",
    clinicalSignificance:
      "Primary marker of kidney function. Used to stage chronic kidney disease and adjust medication dosing. Part of cardiovascular risk assessment.",
    complications:
      "Elevated levels indicate reduced kidney function, which increases cardiovascular disease risk and affects drug metabolism.",
    monitoring:
      "Annual screening for adults. More frequent monitoring for diabetes, hypertension, or known kidney disease.",
  },
  vitaminD: {
    simple: "Vitamin D (25-Hydroxyvitamin D)",
    description: "Fat-soluble vitamin essential for calcium absorption and bone health",
    whatItMeans:
      "Vitamin D deficiency affects bone mineralization, immune function, muscle strength, and cardiovascular health. Deficiency is common, especially in northern climates.",
    goodRange: "30-100 ng/mL sufficient, 20-29 ng/mL insufficient, <20 ng/mL deficient",
    tips: "Moderate sun exposure (10-30 minutes midday), vitamin D-rich foods (fatty fish, fortified dairy), supplementation (800-2000 IU daily if deficient).",
    clinicalSignificance:
      "Essential for bone health, immune function, and muscle strength. Deficiency linked to osteoporosis, fractures, and increased infection risk.",
    complications:
      "Deficiency causes rickets in children, osteomalacia in adults, increased fracture risk, muscle weakness, and immune dysfunction.",
    monitoring:
      "Check annually or when symptoms suggest deficiency. Recheck 2-3 months after starting supplementation.",
  },
  vitaminB12: {
    simple: "Vitamin B12 (Cobalamin)",
    description: "Essential vitamin for nerve function, DNA synthesis, and red blood cell formation",
    whatItMeans:
      "B12 deficiency can cause megaloblastic anemia, neurological problems, and cognitive impairment. Absorption decreases with age and certain medications.",
    goodRange: "211-911 pg/mL normal, 150-210 pg/mL borderline, <150 pg/mL deficient",
    tips: "Include animal products (meat, fish, dairy, eggs), fortified cereals, B12 supplements for vegans/vegetarians, address absorption issues.",
    clinicalSignificance:
      "Essential for neurological function and hematopoiesis. Deficiency can cause irreversible neurological damage if untreated.",
    complications:
      "Megaloblastic anemia, peripheral neuropathy, cognitive impairment, depression, increased homocysteine levels.",
    monitoring:
      "Check if symptoms of deficiency, high-risk groups (elderly, vegans, certain medications), or unexplained anemia.",
  },
  hba1c: {
    simple: "Hemoglobin A1c (HbA1c)",
    description: "Average blood glucose levels over the past 2-3 months",
    whatItMeans:
      "HbA1c reflects long-term glucose control by measuring glucose attached to hemoglobin. It's the gold standard for diabetes diagnosis and monitoring.",
    goodRange: "<5.7% normal, 5.7-6.4% prediabetes, ≥6.5% diabetes. Target <7% for most diabetics",
    tips: "Maintain healthy weight, regular physical activity, balanced carbohydrate intake, medication adherence if diabetic, stress management.",
    clinicalSignificance:
      "Primary tool for diabetes diagnosis and monitoring. Each 1% reduction in HbA1c reduces microvascular complications by 25%.",
    complications:
      "Elevated levels increase risk of diabetic complications: retinopathy, nephropathy, neuropathy, and cardiovascular disease.",
    monitoring:
      "Every 3-6 months for diabetics, annually for prediabetics, every 3 years for normal individuals over 45.",
  },
}

export function BiomarkerDashboard() {
  const [selectedBiomarker, setSelectedBiomarker] = useState("totalCholesterol")
  const biomarkerData = sampleBiomarkerData

  const latestData = biomarkerData[biomarkerData.length - 1]
  const previousData = biomarkerData.length > 1 ? biomarkerData[biomarkerData.length - 2] : undefined

  const getTrend = (current: number, previous?: number): "up" | "down" | "stable" => {
    if (!previous || current === 0) return "stable"
    const diff = Math.abs(current - previous)
    const threshold = current * 0.05 // 5% threshold
    if (diff < threshold) return "stable"
    return current > previous ? "up" : "down"
  }

  const biomarkerOptions = [
    { key: "totalCholesterol", label: "Total Cholesterol", icon: <Heart className="h-4 w-4" /> },
    { key: "hdlCholesterol", label: "HDL Cholesterol", icon: <Heart className="h-4 w-4" /> },
    { key: "ldlCholesterol", label: "LDL Cholesterol", icon: <Heart className="h-4 w-4" /> },
    { key: "triglycerides", label: "Triglycerides", icon: <Droplets className="h-4 w-4" /> },
    { key: "creatinine", label: "Creatinine", icon: <Activity className="h-4 w-4" /> },
    { key: "vitaminD", label: "Vitamin D", icon: <Bone className="h-4 w-4" /> },
    { key: "vitaminB12", label: "Vitamin B12", icon: <Brain className="h-4 w-4" /> },
    { key: "hba1c", label: "HbA1c", icon: <Zap className="h-4 w-4" /> },
  ]

  // Chart Data Generation
  const chartData = useMemo(() => {
    const data = biomarkerData
      .map((item) => {
        const value = item[selectedBiomarker as keyof BiomarkerData] as number
        return {
          date: new Date(item.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit",
          }),
          value: value || 0,
          fullDate: item.date,
        }
      })
      .filter((item) => item.value > 0)
      .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime())

    return data
  }, [biomarkerData, selectedBiomarker])

  const currentRange = clinicalRanges[selectedBiomarker]
  const selectedOption = biomarkerOptions.find((opt) => opt.key === selectedBiomarker)
  const selectedExplanation = biomarkerExplanations[selectedBiomarker as keyof typeof biomarkerExplanations]

  // Helper to get status for BiomarkerBlock
  function getStatus(value: number, parameter: string): "normal" | "borderline" | "abnormal" {
    const risk = getRiskLevel(value, parameter)
    if (risk === "optimal") return "normal"
    if (risk === "borderline") return "borderline"
    return "abnormal"
  }

  // List of biomarkers to display
  const biomarkerList = [
    { key: "totalCholesterol", label: "Total Cholesterol", category: "Lipids" },
    { key: "hdlCholesterol", label: "HDL Cholesterol", category: "Lipids" },
    { key: "ldlCholesterol", label: "LDL Cholesterol", category: "Lipids" },
    { key: "triglycerides", label: "Triglycerides", category: "Lipids" },
    { key: "creatinine", label: "Creatinine", category: "Kidney" },
    { key: "bun", label: "BUN", category: "Kidney" },
    { key: "uricAcid", label: "Uric Acid", category: "Kidney" },
    { key: "vitaminD", label: "Vitamin D", category: "Vitamins" },
    { key: "vitaminB12", label: "Vitamin B12", category: "Vitamins" },
    { key: "folate", label: "Folate (B9)", category: "Vitamins" },
    { key: "hba1c", label: "HbA1c", category: "Sugar" },
    { key: "fbs", label: "Fasting Blood Sugar (FBS)", category: "Sugar" },
    { key: "ppbs", label: "Postprandial Blood Sugar (PPBS)", category: "Sugar" },
    { key: "sgpt", label: "SGPT (ALT)", category: "Liver" },
    { key: "sgot", label: "SGOT (AST)", category: "Liver" },
    { key: "alp", label: "ALP", category: "Liver" },
    { key: "tsh", label: "TSH", category: "Thyroid/Inflammation" },
    { key: "crp", label: "CRP", category: "Thyroid/Inflammation" },
    { key: "hemoglobin", label: "Hemoglobin (Hb)", category: "Blood" },
    { key: "rbc", label: "RBC Count", category: "Blood" },
    { key: "wbc", label: "WBC Count", category: "Blood" },
  ]

  const categories = ["All", "Lipids", "Kidney", "Vitamins", "Sugar", "Liver", "Thyroid/Inflammation", "Blood"]
  const [activeCategory, setActiveCategory] = useState("All")
  const filteredBiomarkers = activeCategory === "All"
    ? biomarkerList
    : biomarkerList.filter(bm => bm.category === activeCategory)

  // Summary counts
  const statusCounts = { normal: 0, borderline: 0, abnormal: 0 }
  const allKeys = Object.keys(clinicalRanges)
  allKeys.forEach((key) => {
    const value = latestData[key as keyof typeof latestData] as number
    const risk = getRiskLevel(value, key)
    if (risk === "optimal") statusCounts.normal++
    else if (risk === "borderline") statusCounts.borderline++
    else statusCounts.abnormal++
  })

  // Traffic light color
  let trafficColor = "bg-green-500"
  if (statusCounts.abnormal > 0) trafficColor = "bg-red-500"
  else if (statusCounts.borderline > 0) trafficColor = "bg-yellow-400"

  // Summary sparkline (average of all biomarkers)
  const summarySparkline = biomarkerData.map((d) => {
    let sum = 0, count = 0
    allKeys.forEach((k) => {
      const v = d[k as keyof typeof d]
      if (typeof v === "number") { sum += v; count++ }
    })
    return { date: d.date, value: count ? sum / count : 0 }
  })

  // Patient info (mock data for now)
  const patient = {
    name: "MR. MANJUNATH SWAMY",
    age: "56Y/M",
    id: "P-123456",
    doctor: "Dr. A. Kumar",
    monitoringPeriod: "Nov 2023 - Apr 2025",
    dataPoints: biomarkerData.length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Modern Professional Header */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                    <BarChart3 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">EcoTown Health Analytics</h1>
                    <p className="text-sm text-gray-600 mt-1">Biomarker Intelligence Platform</p>
                  </div>
                </div>
              </div>

              {/* In the header section, replace the buttons div with an empty div: */}
              <div className="flex items-center space-x-4">{/* Buttons removed for cleaner interface */}</div>
            </div>

            {/* Patient Info Bar */}
            <div className="mt-6 flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">MR. MANJUNATH SWAMY</span>
                  <Badge variant="secondary" className="text-xs">
                    56Y/M
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">Monitoring Period: Nov 2023 - Apr 2025</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">9 Data Points</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Last Updated: {new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Enhanced Clinical Summary Alerts */}
          <div className="grid gap-4">
            <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100/50 shadow-sm">
              <Info className="h-4 w-4" />
              <AlertDescription>
                <strong>Clinical Overview:</strong> Comprehensive biomarker panel showing 9 data points across 16 months
                of monitoring. Analysis reveals vitamin D deficiency requiring intervention and borderline triglyceride
                levels needing lifestyle modifications.
              </AlertDescription>
            </Alert>

            <Alert className="border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100/50 shadow-sm">
              <Target className="h-4 w-4" />
              <AlertDescription>
                <strong>Key Findings:</strong> HDL cholesterol below optimal (36 mg/dL), vitamin D deficiency (18.73
                ng/mL), and fluctuating triglycerides (175-210 mg/dL). Glucose control remains excellent with HbA1c at
                5.8%.
              </AlertDescription>
            </Alert>
          </div>

          {/* Enhanced Main Chart Section */}
          <section className="w-full">
            {/* Sticky summary banner */}
            <header className="sticky top-0 z-20 bg-white/90 dark:bg-gray-900/90 shadow-md py-2 px-2 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 mb-4 rounded-b-lg">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${trafficColor} text-white text-lg font-bold`}>
                  {statusCounts.abnormal > 0 ? <AlertOctagon className="w-5 h-5" /> : statusCounts.borderline > 0 ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </span>
                <span className="font-semibold text-gray-800 dark:text-gray-100 text-base sm:text-lg">Health Status:</span>
                <span className="text-green-600 font-medium">{statusCounts.normal} Normal</span>
                <span className="text-yellow-500 font-medium">{statusCounts.borderline} Borderline</span>
                <span className="text-red-500 font-medium">{statusCounts.abnormal} Abnormal</span>
              </div>
              <div className="w-32 h-7">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={summarySparkline} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                    <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </header>
            {/* Category filter bar */}
            <nav className="w-full mb-4 overflow-x-auto">
              <ul className="flex sm:grid sm:grid-cols-4 gap-2 sm:gap-4 whitespace-nowrap">
                {categories.map(cat => (
                  <li key={cat}>
                    <button
                      className={`px-3 py-1 rounded-full border text-xs font-semibold transition-colors ${activeCategory === cat ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30'}`}
                      onClick={() => setActiveCategory(cat)}
                      aria-pressed={activeCategory === cat}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 text-center bg-blue-50 py-2 rounded-lg shadow-sm">
              Advanced Biomarker Analysis
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              <AnimatePresence>
                {filteredBiomarkers.map((bm, idx) => {
                  const value = latestData[bm.key as keyof typeof latestData] as number
                  const unit = clinicalRanges[bm.key]?.unit || ""
                  const referenceRange = clinicalRanges[bm.key]
                    ? `${clinicalRanges[bm.key].optimal.min} - ${clinicalRanges[bm.key].optimal.max} ${unit}`
                    : ""
                  const status = getStatus(value, bm.key)
                  const trendData = biomarkerData.map((d) => ({ date: d.date, value: d[bm.key as keyof typeof d] as number }))
                  const timestamp = latestData.date
                  return (
                    <motion.div
                      key={bm.key}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ duration: 0.4, delay: idx * 0.06, type: "spring", stiffness: 120 }}
                    >
                      <BiomarkerBlock
                        name={bm.label}
                        value={value}
                        unit={unit}
                        timestamp={timestamp}
                        referenceRange={referenceRange}
                        status={status}
                        trendData={trendData}
                      />
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </section>

          {/* Enhanced Main Chart Section */}
          <Card className="w-full shadow-lg border-0 bg-white">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b">
              <CardTitle className="flex items-center gap-3 text-xl">
                {selectedOption?.icon}
                <span>Advanced Biomarker Analysis</span>
              </CardTitle>
              <CardDescription>
                Comprehensive longitudinal tracking of {selectedOption?.label.toLowerCase()} with clinical reference
                ranges and predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs value={selectedBiomarker} onValueChange={setSelectedBiomarker} className="w-full">
                <TabsList className="grid grid-cols-4 lg:grid-cols-8 mb-6 w-full h-auto p-1 bg-gray-100">
                  {biomarkerOptions.map((option) => (
                    <TabsTrigger
                      key={option.key}
                      value={option.key}
                      className="text-xs px-2 py-3 flex flex-col items-center gap-1 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                    >
                      {option.icon}
                      <span className="hidden sm:block font-medium">{option.label.split(" ")[0]}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                {/* Enhanced Chart */}
                <div className="w-full mb-6">
                  <CustomLineChart
                    data={chartData}
                    width={900}
                    height={450}
                    unit={currentRange?.unit || ""}
                    title={selectedOption?.label || ""}
                    clinicalRange={currentRange}
                  />
                </div>

                {/* Enhanced Clinical Information */}
                {selectedExplanation && (
                  <div className="space-y-6">
                    {/* Main Clinical Information */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        Clinical Information: {selectedExplanation.simple}
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Info className="h-4 w-4" />
                            Description & Function
                          </h4>
                          <p className="text-gray-600 mb-4 leading-relaxed">{selectedExplanation.description}</p>

                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Stethoscope className="h-4 w-4" />
                            Clinical Significance
                          </h4>
                          <p className="text-gray-600 leading-relaxed">{selectedExplanation.whatItMeans}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Target className="h-4 w-4" />
                            Reference Ranges
                          </h4>
                          <p className="text-green-700 font-medium mb-4 leading-relaxed">
                            {selectedExplanation.goodRange}
                          </p>

                          <h4 className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                            <Lightbulb className="h-4 w-4" />
                            Management Recommendations
                          </h4>
                          <p className="text-blue-700 leading-relaxed">{selectedExplanation.tips}</p>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Clinical Details */}
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Shield className="h-4 w-4" />
                            Clinical Significance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {selectedExplanation.clinicalSignificance}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            Potential Complications
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700 leading-relaxed">{selectedExplanation.complications}</p>
                        </CardContent>
                      </Card>

                      <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 shadow-sm">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Monitoring Guidelines
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <p className="text-sm text-gray-700 leading-relaxed">{selectedExplanation.monitoring}</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Enhanced Clinical Interpretation */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                      <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                        <Stethoscope className="h-5 w-5" />
                        Current Clinical Interpretation
                      </h4>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4">
                        <p className="text-gray-700 font-medium leading-relaxed">
                          {getClinicalInterpretation(selectedBiomarker, chartData[chartData.length - 1]?.value || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Enhanced Summary Statistics */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border shadow-sm text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">Current Value</div>
                    <div className="text-lg font-semibold text-gray-900">
                      {chartData.length > 0
                        ? `${chartData[chartData.length - 1]?.value} ${currentRange?.unit}`
                        : "No data available"}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border shadow-sm text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">Data Points</div>
                    <div className="text-lg font-semibold text-gray-900">{chartData.length} measurements</div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border shadow-sm text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">Monitoring Period</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {chartData.length > 0
                        ? `${chartData[0]?.date} - ${chartData[chartData.length - 1]?.date}`
                        : "16 months"}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-4 border shadow-sm text-center">
                    <div className="text-sm font-medium text-gray-600 mb-1">Risk Level</div>
                    <div className="text-sm font-semibold">
                      <Badge
                        className={`${getRiskLevel(chartData[chartData.length - 1]?.value || 0, selectedBiomarker) === "optimal" ? "bg-green-100 text-green-800" : getRiskLevel(chartData[chartData.length - 1]?.value || 0, selectedBiomarker) === "borderline" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                      >
                        {getRiskLevel(chartData[chartData.length - 1]?.value || 0, selectedBiomarker).toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </Tabs>
            </CardContent>
          </Card>

          {/* Enhanced Clinical Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-green-100/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Optimal Results & Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Excellent Glucose Control</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      HbA1c levels (5.8%) indicate excellent long-term glucose management, reducing diabetes
                      complications risk by 25%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Optimal Total Cholesterol</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Current levels (136 mg/dL) are well within the desirable range, indicating good cardiovascular
                      health baseline
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Stable Kidney Function</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Creatinine levels remain stable at 1.18 mg/dL, indicating consistent kidney function over
                      monitoring period
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                  Priority Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Vitamin D Deficiency (Critical)</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Severely low at 18.73 ng/mL - requires immediate supplementation (2000-4000 IU daily), increased
                      sun exposure, and dietary modifications
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Low HDL Cholesterol</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      At 36 mg/dL, below optimal levels - increase aerobic exercise (150 min/week), healthy fats intake,
                      and consider niacin therapy
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium">Fluctuating Triglycerides</p>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Borderline high (177 mg/dL) with 20% fluctuation - reduce refined carbohydrates, increase omega-3
                      intake (2g daily), and monitor dietary patterns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Footer */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
            <div className="text-center text-sm text-gray-500 space-y-2">
              <div className="flex items-center justify-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4" />
                <span className="font-medium">EcoTown Health Analytics Platform</span>
              </div>
              <p>Advanced biomarker intelligence with predictive analytics and clinical decision support</p>
              <p>
                Last updated: {new Date().toLocaleDateString()} | For healthcare professional use and patient education
              </p>
              <p className="text-xs">
                This comprehensive analysis provides evidence-based biomarker visualization and clinical interpretation.
                Always consult with qualified healthcare providers for medical decisions and treatment plans.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
