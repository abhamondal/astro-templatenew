import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cave-stats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stat-card" [class.highlight]="highlight">
      <span class="label">{{ label }}</span>
      <span class="value">{{ value | number:'1.0-0' }}</span>
      <span class="unit" *ngIf="unit">{{ unit }}</span>
    </div>
  `,
  styles: [`
    .stat-card {
      background: #111118;
      border: 1px solid #1e1e2e;
      border-radius: 10px;
      padding: 1.25rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .stat-card.highlight {
      border-color: #dd003133;
    }

    .label {
      font-size: 0.75rem;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .value {
      font-size: 1.8rem;
      font-weight: 800;
      color: #f0f0f0;
    }

    .highlight .value {
      color: #dd0031;
    }

    .unit {
      font-size: 0.8rem;
      color: #6b7280;
    }
  `]
})
export class CaveStatsComponent {
  @Input() label = '';
  @Input() value = 0;
  @Input() unit = '';
  @Input() highlight = false;
}
