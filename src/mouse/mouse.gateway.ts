import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MouseService } from './mouse.service';

@WebSocketGateway({ cors: true })
export class MouseGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly mouseService: MouseService) {}

  handleConnection(client: Socket) {
    client.emit('allMousePositions', this.mouseService.getPositions());
  }

  handleDisconnect(client: Socket) {
    // TODO implements disconnect
  }

  @SubscribeMessage('setName')
  handleSetName(client: Socket, name: string): void {
    this.mouseService.setName(client.id, name);
  }

  @SubscribeMessage('mouseMove')
  handleMouseMove(client: Socket, payload: { x: number; y: number }): void {
    this.mouseService.updatePosition(client.id, payload.x, payload.y);
    const position = this.mouseService
      .getPositions()
      .find((pos) => pos.sessionId === client.id);
    client.broadcast.emit('mouseMove', position);
  }
}
