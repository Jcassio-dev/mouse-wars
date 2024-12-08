import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MouseGateway } from './mouse/mouse.gateway';
import { MouseService } from './mouse/mouse.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MouseGateway, MouseService],
})
export class AppModule {}
