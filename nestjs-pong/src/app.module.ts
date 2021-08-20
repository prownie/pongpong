import { Module } from '@nestjs/common';
import { GameGateway } from './game/game.gateway';
import { RoomService } from './room.service';
import { SocketService } from './socket.service';

@Module({
  imports: [],
  controllers: [],
  providers: [GameGateway,SocketService,RoomService],
})
export class AppModule {}
