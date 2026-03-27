export interface EnvironmentReading {
  timestamp: Date;
  chamberId: string;
  temperature: number;     // Celsius
  humidity: number;        // Percentage
  co2Level: number;        // PPM
  airflow: number;         // m/s
  waterLevel?: number;     // meters
}

export interface EnvironmentThresholds {
  maxTemperature: number;
  maxCo2: number;
  maxWaterLevel: number;
  minAirflow: number;
}

export type AlertLevel = "normal" | "caution" | "warning" | "danger";

export interface EnvironmentAlert {
  level: AlertLevel;
  message: string;
  reading: EnvironmentReading;
}

const DEFAULT_THRESHOLDS: EnvironmentThresholds = {
  maxTemperature: 25,
  maxCo2: 5000,
  maxWaterLevel: 2.0,
  minAirflow: 0.1,
};

export function assessConditions(
  reading: EnvironmentReading,
  thresholds: EnvironmentThresholds = DEFAULT_THRESHOLDS
): EnvironmentAlert[] {
  const alerts: EnvironmentAlert[] = [];

  if (reading.co2Level > thresholds.maxCo2) {
    alerts.push({
      level: "danger",
      message: `CO2 level critical: ${reading.co2Level} PPM (max: ${thresholds.maxCo2})`,
      reading,
    });
  } else if (reading.co2Level > thresholds.maxCo2 * 0.8) {
    alerts.push({
      level: "warning",
      message: `CO2 level elevated: ${reading.co2Level} PPM`,
      reading,
    });
  }

  if (reading.waterLevel !== undefined && reading.waterLevel > thresholds.maxWaterLevel) {
    alerts.push({
      level: "danger",
      message: `Water level high: ${reading.waterLevel}m (max: ${thresholds.maxWaterLevel})`,
      reading,
    });
  }

  if (reading.airflow < thresholds.minAirflow) {
    alerts.push({
      level: "caution",
      message: `Low airflow: ${reading.airflow} m/s`,
      reading,
    });
  }

  if (reading.temperature > thresholds.maxTemperature) {
    alerts.push({
      level: "caution",
      message: `Temperature elevated: ${reading.temperature}°C`,
      reading,
    });
  }

  if (alerts.length === 0) {
    alerts.push({
      level: "normal",
      message: "All readings within normal parameters",
      reading,
    });
  }

  return alerts;
}

export function formatReading(reading: EnvironmentReading): string {
  const lines = [
    `Environment Reading - ${reading.chamberId}`,
    `  Time: ${reading.timestamp.toISOString()}`,
    `  Temperature: ${reading.temperature}°C`,
    `  Humidity: ${reading.humidity}%`,
    `  CO2: ${reading.co2Level} PPM`,
    `  Airflow: ${reading.airflow} m/s`,
  ];

  if (reading.waterLevel !== undefined) {
    lines.push(`  Water level: ${reading.waterLevel}m`);
  }

  return lines.join("\n");
}
