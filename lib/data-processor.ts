export interface BiomarkerData {
  date: string
  totalCholesterol: number
  hdlCholesterol: number
  ldlCholesterol: number
  triglycerides: number
  creatinine: number
  bun: number
  uricAcid: number
  vitaminD: number
  vitaminB12: number
  folate: number
  hba1c: number
  fbs: number
  ppbs: number
  sgpt: number
  sgot: number
  alp: number
  tsh: number
  crp: number
  hemoglobin: number
  rbc: number
  wbc: number
}

export interface ClinicalRange {
  parameter: string
  optimal: { min: number; max: number }
  borderline?: { min: number; max: number }
  high: { min: number; max: number }
  unit: string
}

// Enhanced sample data with more realistic fluctuations for triglycerides
export const sampleBiomarkerData: BiomarkerData[] = [
  {
    date: "2023-11-20",
    totalCholesterol: 132,
    hdlCholesterol: 35,
    ldlCholesterol: 72,
    triglycerides: 195,
    creatinine: 1.19,
    bun: 14,
    uricAcid: 5.2,
    vitaminD: 39.7,
    vitaminB12: 366,
    folate: 8.2,
    hba1c: 5.5,
    fbs: 92,
    ppbs: 120,
    sgpt: 28,
    sgot: 32,
    alp: 85,
    tsh: 2.1,
    crp: 1.2,
    hemoglobin: 14.1,
    rbc: 4.8,
    wbc: 6.2,
  },
  {
    date: "2024-01-15",
    totalCholesterol: 128,
    hdlCholesterol: 37,
    ldlCholesterol: 68,
    triglycerides: 210,
    creatinine: 1.17,
    bun: 15,
    uricAcid: 5.4,
    vitaminD: 32.1,
    vitaminB12: 342,
    folate: 7.9,
    hba1c: 5.4,
    fbs: 95,
    ppbs: 125,
    sgpt: 30,
    sgot: 34,
    alp: 90,
    tsh: 2.3,
    crp: 1.1,
    hemoglobin: 14.3,
    rbc: 4.9,
    wbc: 6.4,
  },
  {
    date: "2024-03-10",
    totalCholesterol: 135,
    hdlCholesterol: 34,
    ldlCholesterol: 75,
    triglycerides: 185,
    creatinine: 1.2,
    bun: 16,
    uricAcid: 5.3,
    vitaminD: 28.5,
    vitaminB12: 358,
    folate: 8.0,
    hba1c: 5.6,
    fbs: 98,
    ppbs: 130,
    sgpt: 29,
    sgot: 33,
    alp: 88,
    tsh: 2.0,
    crp: 1.3,
    hemoglobin: 14.0,
    rbc: 4.7,
    wbc: 6.1,
  },
  {
    date: "2024-05-22",
    totalCholesterol: 130,
    hdlCholesterol: 38,
    ldlCholesterol: 70,
    triglycerides: 198,
    creatinine: 1.18,
    bun: 13,
    uricAcid: 5.1,
    vitaminD: 25.3,
    vitaminB12: 371,
    folate: 8.5,
    hba1c: 5.5,
    fbs: 91,
    ppbs: 118,
    sgpt: 27,
    sgot: 31,
    alp: 86,
    tsh: 2.2,
    crp: 1.0,
    hemoglobin: 14.2,
    rbc: 4.8,
    wbc: 6.3,
  },
  {
    date: "2024-07-18",
    totalCholesterol: 134,
    hdlCholesterol: 36,
    ldlCholesterol: 73,
    triglycerides: 175,
    creatinine: 1.19,
    bun: 14,
    uricAcid: 5.0,
    vitaminD: 22.8,
    vitaminB12: 365,
    folate: 8.1,
    hba1c: 5.7,
    fbs: 93,
    ppbs: 122,
    sgpt: 28,
    sgot: 32,
    alp: 87,
    tsh: 2.4,
    crp: 1.2,
    hemoglobin: 14.1,
    rbc: 4.8,
    wbc: 6.2,
  },
  {
    date: "2024-09-25",
    totalCholesterol: 138,
    hdlCholesterol: 35,
    ldlCholesterol: 78,
    triglycerides: 205,
    creatinine: 1.21,
    bun: 15,
    uricAcid: 5.5,
    vitaminD: 20.1,
    vitaminB12: 349,
    folate: 7.8,
    hba1c: 5.8,
    fbs: 97,
    ppbs: 135,
    sgpt: 31,
    sgot: 35,
    alp: 89,
    tsh: 2.5,
    crp: 1.4,
    hemoglobin: 13.9,
    rbc: 4.6,
    wbc: 6.0,
  },
  {
    date: "2024-11-30",
    totalCholesterol: 133,
    hdlCholesterol: 39,
    ldlCholesterol: 69,
    triglycerides: 188,
    creatinine: 1.17,
    bun: 13,
    uricAcid: 5.3,
    vitaminD: 18.9,
    vitaminB12: 356,
    folate: 8.3,
    hba1c: 5.6,
    fbs: 90,
    ppbs: 119,
    sgpt: 26,
    sgot: 30,
    alp: 84,
    tsh: 2.0,
    crp: 1.1,
    hemoglobin: 14.4,
    rbc: 4.9,
    wbc: 6.5,
  },
  {
    date: "2025-01-20",
    totalCholesterol: 131,
    hdlCholesterol: 37,
    ldlCholesterol: 71,
    triglycerides: 192,
    creatinine: 1.18,
    bun: 14,
    uricAcid: 5.2,
    vitaminD: 19.5,
    vitaminB12: 362,
    folate: 8.0,
    hba1c: 5.5,
    fbs: 92,
    ppbs: 121,
    sgpt: 27,
    sgot: 31,
    alp: 85,
    tsh: 2.3,
    crp: 1.0,
    hemoglobin: 14.2,
    rbc: 4.8,
    wbc: 6.3,
  },
  {
    date: "2025-04-05",
    totalCholesterol: 136,
    hdlCholesterol: 36,
    ldlCholesterol: 65,
    triglycerides: 177,
    creatinine: 1.18,
    bun: 13,
    uricAcid: 5.1,
    vitaminD: 18.73,
    vitaminB12: 259,
    folate: 7.7,
    hba1c: 5.8,
    fbs: 94,
    ppbs: 124,
    sgpt: 29,
    sgot: 33,
    alp: 86,
    tsh: 2.1,
    crp: 1.2,
    hemoglobin: 14.0,
    rbc: 4.7,
    wbc: 6.1,
  },
]

// Clinical reference ranges based on the reports
export const clinicalRanges: Record<string, ClinicalRange> = {
  totalCholesterol: {
    parameter: "Total Cholesterol",
    optimal: { min: 0, max: 200 },
    borderline: { min: 200, max: 239 },
    high: { min: 240, max: 500 },
    unit: "mg/dL",
  },
  hdlCholesterol: {
    parameter: "HDL Cholesterol",
    optimal: { min: 40, max: 60 },
    borderline: { min: 35, max: 39 },
    high: { min: 0, max: 34 },
    unit: "mg/dL",
  },
  ldlCholesterol: {
    parameter: "LDL Cholesterol",
    optimal: { min: 0, max: 100 },
    borderline: { min: 100, max: 129 },
    high: { min: 130, max: 500 },
    unit: "mg/dL",
  },
  triglycerides: {
    parameter: "Triglycerides",
    optimal: { min: 0, max: 150 },
    borderline: { min: 150, max: 199 },
    high: { min: 200, max: 500 },
    unit: "mg/dL",
  },
  creatinine: {
    parameter: "Creatinine",
    optimal: { min: 0.7, max: 1.18 },
    high: { min: 1.19, max: 5.0 },
    unit: "mg/dL",
  },
  bun: {
    parameter: "BUN",
    optimal: { min: 7, max: 20 },
    high: { min: 21, max: 50 },
    unit: "mg/dL",
  },
  uricAcid: {
    parameter: "Uric Acid",
    optimal: { min: 3.5, max: 7.2 },
    high: { min: 7.3, max: 15 },
    unit: "mg/dL",
  },
  vitaminD: {
    parameter: "Vitamin D",
    optimal: { min: 30, max: 100 },
    borderline: { min: 20, max: 29 },
    high: { min: 0, max: 19 },
    unit: "ng/mL",
  },
  vitaminB12: {
    parameter: "Vitamin B12",
    optimal: { min: 211, max: 911 },
    borderline: { min: 150, max: 210 },
    high: { min: 0, max: 149 },
    unit: "pg/mL",
  },
  folate: {
    parameter: "Folate (B9)",
    optimal: { min: 3, max: 17 },
    high: { min: 0, max: 2.9 },
    unit: "ng/mL",
  },
  hba1c: {
    parameter: "HbA1c",
    optimal: { min: 4.0, max: 5.6 },
    borderline: { min: 5.7, max: 6.4 },
    high: { min: 6.5, max: 15.0 },
    unit: "%",
  },
  fbs: {
    parameter: "Fasting Blood Sugar",
    optimal: { min: 70, max: 99 },
    borderline: { min: 100, max: 125 },
    high: { min: 126, max: 300 },
    unit: "mg/dL",
  },
  ppbs: {
    parameter: "Postprandial Blood Sugar",
    optimal: { min: 70, max: 139 },
    borderline: { min: 140, max: 199 },
    high: { min: 200, max: 400 },
    unit: "mg/dL",
  },
  sgpt: {
    parameter: "SGPT (ALT)",
    optimal: { min: 0, max: 40 },
    high: { min: 41, max: 200 },
    unit: "U/L",
  },
  sgot: {
    parameter: "SGOT (AST)",
    optimal: { min: 0, max: 40 },
    high: { min: 41, max: 200 },
    unit: "U/L",
  },
  alp: {
    parameter: "ALP",
    optimal: { min: 44, max: 147 },
    high: { min: 148, max: 400 },
    unit: "U/L",
  },
  tsh: {
    parameter: "TSH",
    optimal: { min: 0.4, max: 4.0 },
    high: { min: 4.1, max: 20 },
    unit: "uIU/mL",
  },
  crp: {
    parameter: "CRP",
    optimal: { min: 0, max: 3 },
    high: { min: 3.1, max: 20 },
    unit: "mg/L",
  },
  hemoglobin: {
    parameter: "Hemoglobin",
    optimal: { min: 13.5, max: 17.5 },
    high: { min: 0, max: 13.4 },
    unit: "g/dL",
  },
  rbc: {
    parameter: "RBC Count",
    optimal: { min: 4.5, max: 5.9 },
    high: { min: 0, max: 4.4 },
    unit: "million/uL",
  },
  wbc: {
    parameter: "WBC Count",
    optimal: { min: 4.0, max: 11.0 },
    high: { min: 0, max: 3.9 },
    unit: "thousand/uL",
  },
}

export function getRiskLevel(value: number, parameter: string): "optimal" | "borderline" | "high" {
  const range = clinicalRanges[parameter]
  if (!range) return "optimal"

  if (value >= range.optimal.min && value <= range.optimal.max) return "optimal"
  if (range.borderline && value >= range.borderline.min && value <= range.borderline.max) return "borderline"
  return "high"
}

export function getClinicalInterpretation(parameter: string, value: number): string {
  const riskLevel = getRiskLevel(value, parameter)
  const interpretations: Record<string, Record<string, string>> = {
    totalCholesterol: {
      optimal: "Desirable level - Continue healthy lifestyle",
      borderline: "Borderline high - Consider dietary changes",
      high: "High risk - Consult physician for treatment",
    },
    hdlCholesterol: {
      optimal: "Good protective level against heart disease",
      borderline: "Below optimal - Increase physical activity",
      high: "Low HDL - Major risk factor for heart disease",
    },
    ldlCholesterol: {
      optimal: "Optimal level - Low cardiovascular risk",
      borderline: "Near optimal - Monitor closely",
      high: "High risk - May require medication",
    },
    triglycerides: {
      optimal: "Normal level - Continue current lifestyle",
      borderline: "Borderline high - Reduce refined carbs",
      high: "High level - Significant cardiovascular risk",
    },
    creatinine: {
      optimal: "Normal kidney function",
      high: "Elevated - May indicate kidney dysfunction",
    },
    vitaminD: {
      optimal: "Sufficient vitamin D status",
      borderline: "Insufficient - Consider supplementation",
      high: "Deficient - Requires immediate supplementation",
    },
    vitaminB12: {
      optimal: "Adequate B12 levels",
      borderline: "Low normal - Monitor closely",
      high: "Deficient - Risk of anemia and neuropathy",
    },
    hba1c: {
      optimal: "Normal glucose control",
      borderline: "Prediabetic - Lifestyle intervention needed",
      high: "Diabetic - Requires medical management",
    },
  }

  return interpretations[parameter]?.[riskLevel] || "Consult healthcare provider"
}
