import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram';
import { UsersModule } from './users';

@Module({
  imports: [TelegramModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
