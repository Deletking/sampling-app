import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SamplingService {
  constructor() {}

  calculateSampleSize(data: any): number {
    const { population, marginError, confidenceLevel, proportion } = data;

    const Z = this.getZValue(confidenceLevel);
    const E = marginError / 100;
    const p = proportion / 100;

    let sampleSize = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(E, 2);

    const adjustedSampleSize = sampleSize / (1 + (sampleSize - 1) / population);

    return Math.ceil(adjustedSampleSize);
  }

  getZValue(confidenceLevel: number): number {
    if (confidenceLevel === 95) {
      return 1.96;
    } else if (confidenceLevel === 99) {
      return 2.58;
    } else if (confidenceLevel === 90) {
      return 1.64;
    }

    return 1.96;
  }
}
