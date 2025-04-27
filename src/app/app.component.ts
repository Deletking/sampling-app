import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, HistoryComponent],
  template: `
    <!-- Formulário de Cálculo -->
    <app-home></app-home>

    <!-- Histórico de Cálculos -->
    <app-history></app-history>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
