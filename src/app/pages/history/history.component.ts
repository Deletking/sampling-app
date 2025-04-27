import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SamplingService } from '../../services/sampling.service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent {
  constructor(public samplingService: SamplingService) {}

  deleteCalculation(index: number) {
    this.samplingService.deleteFromHistory(index);
  }

  clearHistory() {
    this.samplingService.clearHistory();
  }
}
