import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MouseGateway } from './mouse/mouse.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MouseGateway],
})
export class AppModule {}
