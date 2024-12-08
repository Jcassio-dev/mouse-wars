import { Injectable } from '@nestjs/common';

interface MousePosition {
  sessionId: string;
  x: number;
  y: number;
  color: string;
  name: string;
  points: number;
}

interface Point {
  x: number;
  y: number;
}

@Injectable()
export class MouseService {
  private positions: MousePosition[] = [];
  private points: Point[] = [];
  private readonly pointCount = 10;

  constructor() {
    this.generatePoints();
  }

  private generateColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private generatePoints() {
    this.points = [];
    for (let i = 0; i < this.pointCount; i++) {
      this.points.push({
        x: Math.floor(Math.random() * 800),
        y: Math.floor(Math.random() * 600),
      });
    }
  }

  setName(sessionId: string, name: string) {
    const index = this.positions.findIndex(
      (pos) => pos.sessionId === sessionId,
    );
    if (index !== -1) {
      this.positions[index].name = name;
    } else {
      const color = this.generateColor();
      this.positions.push({ sessionId, x: 0, y: 0, color, name, points: 0 });
    }
  }

  updatePosition(sessionId: string, x: number, y: number) {
    const index = this.positions.findIndex(
      (pos) => pos.sessionId === sessionId,
    );
    if (index !== -1) {
      this.positions[index] = { ...this.positions[index], x, y };
      this.checkPointCollision(this.positions[index]);
    } else {
      const color = this.generateColor();
      this.positions.push({ sessionId, x, y, color, name: '', points: 0 });
    }
  }

  private checkPointCollision(position: MousePosition) {
    this.points = this.points.filter((point) => {
      const distance = Math.sqrt(
        (point.x - position.x) ** 2 + (point.y - position.y) ** 2,
      );
      if (distance < 10) {
        position.points += 1;
        return false;
      }
      return true;
    });

    if (this.points.length < this.pointCount) {
      this.generatePoints();
    }
  }

  getPositions() {
    return this.positions;
  }

  getPoints() {
    return this.points;
  }

  getRanking() {
    return this.positions.sort((a, b) => b.points - a.points);
  }
}
