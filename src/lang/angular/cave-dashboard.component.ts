import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaveDataService, CaveSummary, EnvironmentReading } from './cave-data.service';
import { CaveStatsComponent } from './cave-stats.component';
import { CaveAlertComponent } from './cave-alert.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cave-dashboard',
  standalone: true,
  imports: [CommonModule, CaveStatsComponent, CaveAlertComponent],
  template: `
    <div class="dashboard">
      <header class="dashboard-header">
        <h1>Cave Explorer Dashboard</h1>
        <p class="subtitle">Real-time cave monitoring system</p>
      </header>

      <section class="stats-grid" *ngIf="summary">
        <app-cave-stats
          label="Total Chambers"
          [value]="summary.totalChambers"
          unit="rooms"
        />
        <app-cave-stats
          label="Survey Length"
          [value]="summary.totalSurveyedLength"
          unit="meters"
        />
        <app-cave-stats
          label="Max Depth"
          [value]="summary.maxDepth"
          unit="meters"
        />
        <app-cave-stats
          label="Active Alerts"
          [value]="activeAlerts"
          unit=""
          [highlight]="activeAlerts > 0"
        />
      </section>

      <section class="readings" *ngIf="latestReadings.length > 0">
        <h2>Latest Readings</h2>
        <div class="readings-grid">
          <div class="reading-card" *ngFor="let reading of latestReadings">
            <h3>{{ reading.chamberId }}</h3>
            <div class="reading-data">
              <span>{{ reading.temperature }}°C</span>
              <span>{{ reading.humidity }}% humidity</span>
              <span>{{ reading.co2Level }} PPM CO₂</span>
            </div>
          </div>
        </div>
      </section>

      <section class="alerts" *ngIf="alerts.length > 0">
        <h2>Alerts</h2>
        <app-cave-alert
          *ngFor="let alert of alerts"
          [level]="alert.level"
          [message]="alert.message"
          [chamberId]="alert.chamberId"
        />
      </section>
    </div>
  `,
  styles: [`
    .dashboard {
      max-width: 960px;
      margin: 0 auto;
      padding: 2rem;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 1.8rem;
      margin: 0 0 0.5rem;
    }

    .subtitle {
      color: #9ca3af;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    h2 {
      font-size: 1.3rem;
      margin: 0 0 1rem;
    }

    .readings-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .reading-card {
      background: #111118;
      border: 1px solid #1e1e2e;
      border-radius: 8px;
      padding: 1rem;
    }

    .reading-card h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }

    .reading-data {
      display: flex;
      gap: 1rem;
      color: #9ca3af;
      font-size: 0.85rem;
    }
  `]
})
export class CaveDashboardComponent implements OnInit, OnDestroy {
  summary: CaveSummary | null = null;
  latestReadings: EnvironmentReading[] = [];
  alerts: Array<{ level: string; message: string; chamberId: string }> = [];
  activeAlerts = 0;

  private destroy$ = new Subject<void>();

  constructor(private caveData: CaveDataService) {}

  ngOnInit(): void {
    this.caveData.getSummary()
      .pipe(takeUntil(this.destroy$))
      .subscribe(summary => {
        this.summary = summary;
      });

    this.caveData.getLatestReadings()
      .pipe(takeUntil(this.destroy$))
      .subscribe(readings => {
        this.latestReadings = readings;
      });

    this.caveData.getAlerts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(alerts => {
        this.alerts = alerts;
        this.activeAlerts = alerts.filter(a => a.level !== 'normal').length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
