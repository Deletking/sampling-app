import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SamplingService {
  history = signal<any[]>([]);

  constructor() {
    this.loadHistory();
  }

  calculateSampleSize(data: any): number {
    const { population, marginError, confidenceLevel, proportion } = data;

    const Z = this.getZValue(confidenceLevel);
    const E = marginError / 100;
    const p = proportion / 100;

    const n = (Math.pow(Z, 2) * p * (1 - p)) / Math.pow(E, 2);
    const adjustedSampleSize = n / (1 + (n - 1) / population);
    const roundedSampleSize = Math.ceil(adjustedSampleSize);

    this.addToHistory({
      data,
      sampleSize: roundedSampleSize,
      createdAt: new Date().toISOString(),
    });

    return roundedSampleSize;
  }

  private getZValue(confidenceLevel: number): number {
    switch (confidenceLevel) {
      case 90:
        return 1.64;
      case 95:
        return 1.96;
      case 99:
        return 2.58;
      default:
        return 1.96;
    }
  }

  private addToHistory(calculation: any): void {
    const currentHistory = this.history();
    const updatedHistory = [calculation, ...currentHistory];
    this.history.set(updatedHistory);
    localStorage.setItem('calculationHistory', JSON.stringify(updatedHistory));
  }

  loadHistory(): void {
    const savedHistory = localStorage.getItem('calculationHistory');
    if (savedHistory) {
      this.history.set(JSON.parse(savedHistory));
    }
  }

  deleteFromHistory(index: number): void {
    const currentHistory = this.history();
    currentHistory.splice(index, 1);
    this.history.set([...currentHistory]);
    localStorage.setItem('calculationHistory', JSON.stringify(currentHistory));
  }

  clearHistory(): void {
    this.history.set([]);
    localStorage.removeItem('calculationHistory');
  }
}
