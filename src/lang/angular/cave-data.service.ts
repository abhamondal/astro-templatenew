import { Injectable } from '@angular/core';
import { Observable, of, interval, map, startWith } from 'rxjs';

export interface CaveSummary {
  totalChambers: number;
  totalSurveyedLength: number;
  maxDepth: number;
  formationCount: number;
}

export interface EnvironmentReading {
  chamberId: string;
  temperature: number;
  humidity: number;
  co2Level: number;
  airflow: number;
  timestamp: Date;
}

export interface CaveAlert {
  level: 'normal' | 'caution' | 'warning' | 'danger';
  message: string;
  chamberId: string;
}

@Injectable({
  providedIn: 'root'
})
export class CaveDataService {

  private chambers = [
    { id: 'entrance-hall', name: 'Entrance Hall', depth: 0 },
    { id: 'crystal-gallery', name: 'Crystal Gallery', depth: 45 },
    { id: 'underground-river', name: 'Underground River', depth: 120 },
    { id: 'cathedral-room', name: 'Cathedral Room', depth: 200 },
  ];

  getSummary(): Observable<CaveSummary> {
    return of({
      totalChambers: this.chambers.length,
      totalSurveyedLength: 2450,
      maxDepth: 200,
      formationCount: 47,
    });
  }

  getLatestReadings(): Observable<EnvironmentReading[]> {
    return interval(5000).pipe(
      startWith(0),
      map(() => this.chambers.map(chamber => ({
        chamberId: chamber.name,
        temperature: this.baseTemp(chamber.depth) + this.randomVariation(0.5),
        humidity: Math.min(100, 85 + chamber.depth * 0.05 + this.randomVariation(2)),
        co2Level: 400 + chamber.depth * 5 + this.randomVariation(50),
        airflow: Math.max(0, 1.5 - chamber.depth * 0.005 + this.randomVariation(0.2)),
        timestamp: new Date(),
      })))
    );
  }

  getAlerts(): Observable<CaveAlert[]> {
    return this.getLatestReadings().pipe(
      map(readings => {
        const alerts: CaveAlert[] = [];

        for (const reading of readings) {
          if (reading.co2Level > 1500) {
            alerts.push({
              level: 'warning',
              message: `Elevated CO2: ${reading.co2Level.toFixed(0)} PPM`,
              chamberId: reading.chamberId,
            });
          }

          if (reading.airflow < 0.2) {
            alerts.push({
              level: 'caution',
              message: `Low airflow: ${reading.airflow.toFixed(2)} m/s`,
              chamberId: reading.chamberId,
            });
          }
        }

        return alerts;
      })
    );
  }

  private baseTemp(depth: number): number {
    return 12 + depth * 0.01;
  }

  private randomVariation(range: number): number {
    return (Math.random() - 0.5) * 2 * range;
  }
}
