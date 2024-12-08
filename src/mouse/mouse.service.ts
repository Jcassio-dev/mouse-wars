import { Injectable } from '@nestjs/common';

interface MousePosition {
  sessionId: string;
  x: number;
  y: number;
  color: string;
  name: string;
}

@Injectable()
export class MouseService {
  private positions: MousePosition[] = [];

  private generateColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  setName(sessionId: string, name: string) {
    const index = this.positions.findIndex(
      (pos) => pos.sessionId === sessionId,
    );
    if (index !== -1) {
      this.positions[index].name = name;
    } else {
      const color = this.generateColor();
      this.positions.push({ sessionId, x: 0, y: 0, color, name });
    }
  }

  updatePosition(sessionId: string, x: number, y: number) {
    const index = this.positions.findIndex(
      (pos) => pos.sessionId === sessionId,
    );
    if (index !== -1) {
      this.positions[index] = { ...this.positions[index], x, y };
    } else {
      const color = this.generateColor();
      this.positions.push({ sessionId, x, y, color, name: '' });
    }
  }

  getPositions() {
    return this.positions;
  }
}
