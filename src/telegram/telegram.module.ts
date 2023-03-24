import { DynamicModule, Module } from '@nestjs/common';
import { UsersModule } from '../users';
import { TelegramBotFactory } from './telegram-bot.factory';

@Module({
  imports: [UsersModule],
  providers: [TelegramBotFactory],
})
export class TelegramModule {}
