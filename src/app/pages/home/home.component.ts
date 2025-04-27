import { Component } from '@angular/core';
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
  population: number = 0;
  marginError: number = 5;
  confidenceLevel: number = 95;
  proportion: number = 50;
  sampleSize: number | null = null;
  isLoading: boolean = false;

  constructor(private samplingService: SamplingService) {}

  calculate() {
    this.isLoading = true;
    const requestData = {
      population: this.population,
      marginError: this.marginError,
      confidenceLevel: this.confidenceLevel,
      proportion: this.proportion,
    };

    // Chama o serviço para calcular o tamanho da amostra
    this.sampleSize = this.samplingService.calculateSampleSize(requestData);
    this.isLoading = false;
    // this.samplingService.calculateSampleSize(requestData).subscribe({
    //   next: (response) => {
    //     this.sampleSize = response.sampleSize;
    //   },
    //   error: (error) => {
    //     console.error('Error calculating sample size:', error);
    //     this.isLoading = false;
    //   },
    // });
  }
}
