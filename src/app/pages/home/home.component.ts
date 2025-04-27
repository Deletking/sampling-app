import { Component, signal } from '@angular/core';
import { SamplingService } from '../../services/sampling.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  population = signal(0);
  marginError = signal(5);
  confidenceLevel = signal(95);
  proportion = signal(50);
  sampleSize = signal<number | null>(null);
  isLoading = signal(false);

  constructor(private samplingService: SamplingService) {}

  calculate() {
    this.isLoading.set(true);

    const requestData = {
      population: this.population(),
      marginError: this.marginError(),
      confidenceLevel: this.confidenceLevel(),
      proportion: this.proportion(),
    };

    const result = this.samplingService.calculateSampleSize(requestData);
    this.sampleSize.set(result);

    this.isLoading.set(false);
  }
}
