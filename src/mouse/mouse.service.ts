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
  color: string;
  sessionId: string;
}

@Injectable()
export class MouseService {
  private positions: MousePosition[] = [];
  private points: Point[] = [];

  private generateColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private generatePoint(sessionId: string, color: string) {
    return {
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 600),
      color,
      sessionId,
    };
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
      this.points.push(this.generatePoint(sessionId, color));
    }
  }

  updatePosition(sessionId: string, x: number, y: number) {
    const index = this.positions.findIndex(
      (pos) => pos.sessionId === sessionId,
    );

    console.log('updatePosition', sessionId, x, y, this.points);
    if (index !== -1) {
      this.positions[index] = { ...this.positions[index], x, y };
      this.checkPointCollision(this.positions[index]);
    } else {
      const color = this.generateColor();
      this.positions.push({ sessionId, x, y, color, name: '', points: 0 });
      this.points.push(this.generatePoint(sessionId, color));
    }
  }

  private checkPointCollision(position: MousePosition) {
    let pointCollected = false;

    this.points = this.points.filter((point) => {
      const distance = Math.sqrt(
        (point.x - position.x) ** 2 + (point.y - position.y) ** 2,
      );
      if (distance < 10 && point.sessionId === position.sessionId) {
        position.points += 1;
        pointCollected = true;
        return false;
      }

      return true;
    });

    if (pointCollected) {
      const newPoint = this.generatePoint(position.sessionId, position.color);
      this.points.map((point) => {
        point.x = Math.floor(Math.random() * 800);
        point.y = Math.floor(Math.random() * 600);
        return point;
      });
      this.points.push(newPoint);
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
