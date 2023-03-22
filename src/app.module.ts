import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TelegramModule.register(), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
