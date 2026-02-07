export interface Coordinate {
  x: number;
  y: number;
  z: number;
}

export interface SurveyPoint {
  id: string;
  name: string;
  coordinate: Coordinate;
  timestamp: Date;
  notes?: string;
}

export interface SurveyLeg {
  from: SurveyPoint;
  to: SurveyPoint;
  distance: number;
  bearing: number;
  inclination: number;
}

export function calculateDistance(a: Coordinate, b: Coordinate): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function calculateBearing(from: Coordinate, to: Coordinate): number {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const radians = Math.atan2(dx, dy);
  const degrees = (radians * 180) / Math.PI;
  return (degrees + 360) % 360;
}

export function midpoint(a: Coordinate, b: Coordinate): Coordinate {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
  };
}

export class CaveMap {
  private points: Map<string, SurveyPoint> = new Map();
  private legs: SurveyLeg[] = [];

  addPoint(point: SurveyPoint): void {
    this.points.set(point.id, point);
  }

  addLeg(fromId: string, toId: string): SurveyLeg | null {
    const from = this.points.get(fromId);
    const to = this.points.get(toId);

    if (!from || !to) return null;

    const leg: SurveyLeg = {
      from,
      to,
      distance: calculateDistance(from.coordinate, to.coordinate),
      bearing: calculateBearing(from.coordinate, to.coordinate),
      inclination: Math.atan2(
        to.coordinate.z - from.coordinate.z,
        calculateDistance(
          { ...from.coordinate, z: 0 },
          { ...to.coordinate, z: 0 }
        )
      ) * (180 / Math.PI),
    };

    this.legs.push(leg);
    return leg;
  }

  getTotalSurveyedLength(): number {
    return this.legs.reduce((sum, leg) => sum + leg.distance, 0);
  }

  getDepthRange(): { min: number; max: number } {
    const depths = Array.from(this.points.values()).map(p => p.coordinate.z);
    return {
      min: Math.min(...depths),
      max: Math.max(...depths),
    };
  }

  getBoundingBox(): { min: Coordinate; max: Coordinate } {
    const coords = Array.from(this.points.values()).map(p => p.coordinate);
    return {
      min: {
        x: Math.min(...coords.map(c => c.x)),
        y: Math.min(...coords.map(c => c.y)),
        z: Math.min(...coords.map(c => c.z)),
      },
      max: {
        x: Math.max(...coords.map(c => c.x)),
        y: Math.max(...coords.map(c => c.y)),
        z: Math.max(...coords.map(c => c.z)),
      },
    };
  }

  getPointCount(): number {
    return this.points.size;
  }

  getLegCount(): number {
    return this.legs.length;
  }

  getSummary(): string {
    const depth = this.getDepthRange();
    return [
      `Cave Survey Summary`,
      `  Points: ${this.getPointCount()}`,
      `  Legs: ${this.getLegCount()}`,
      `  Total length: ${this.getTotalSurveyedLength().toFixed(1)}m`,
      `  Depth range: ${depth.min.toFixed(1)}m to ${depth.max.toFixed(1)}m`,
      `  Vertical extent: ${(depth.max - depth.min).toFixed(1)}m`,
    ].join("\n");
  }
}
