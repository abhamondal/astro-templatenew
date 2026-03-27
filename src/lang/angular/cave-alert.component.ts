import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cave-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [ngClass]="'alert-' + level">
      <span class="alert-badge">{{ level | uppercase }}</span>
      <div class="alert-content">
        <span class="alert-chamber">{{ chamberId }}</span>
        <span class="alert-message">{{ message }}</span>
      </div>
    </div>
  `,
  styles: [`
    .alert {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
      border: 1px solid;
    }

    .alert-normal {
      background: rgba(34, 197, 94, 0.05);
      border-color: rgba(34, 197, 94, 0.2);
    }

    .alert-caution {
      background: rgba(234, 179, 8, 0.05);
      border-color: rgba(234, 179, 8, 0.2);
    }

    .alert-warning {
      background: rgba(249, 115, 22, 0.05);
      border-color: rgba(249, 115, 22, 0.2);
    }

    .alert-danger {
      background: rgba(239, 68, 68, 0.05);
      border-color: rgba(239, 68, 68, 0.2);
    }

    .alert-badge {
      font-size: 0.65rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      border-radius: 4px;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .alert-normal .alert-badge {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .alert-caution .alert-badge {
      background: rgba(234, 179, 8, 0.15);
      color: #eab308;
    }

    .alert-warning .alert-badge {
      background: rgba(249, 115, 22, 0.15);
      color: #f97316;
    }

    .alert-danger .alert-badge {
      background: rgba(239, 68, 68, 0.15);
      color: #ef4444;
    }

    .alert-content {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }

    .alert-chamber {
      font-size: 0.85rem;
      font-weight: 600;
      color: #f0f0f0;
    }

    .alert-message {
      font-size: 0.8rem;
      color: #9ca3af;
    }
  `]
})
export class CaveAlertComponent {
  @Input() level: string = 'normal';
  @Input() message: string = '';
  @Input() chamberId: string = '';
}
