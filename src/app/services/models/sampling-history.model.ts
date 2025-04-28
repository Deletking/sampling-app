export interface SamplingCalculationData {
  population: number;
  marginError: number;
  confidenceLevel: number;
  proportion: number;
}

export interface SamplingHistoryEntry {
  data: SamplingCalculationData;
  sampleSize: number;
  createdAt: string;
}
