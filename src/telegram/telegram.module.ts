import { DynamicModule, Module } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

const botToken = `5992886322:AAHB0PYleaaxs8Lbpzns4A0Dtsp_ItZDLa4`;
@Module({})
export class TelegramModule {
  static register(): DynamicModule {
    const bot = new TelegramBot(botToken, { polling: true });
    bot.on('message', (msg) => {
      const chatId = msg.chat.id;

      // send a message to the chat acknowledging receipt of their message
      bot.sendMessage(chatId, 'Received your message');
    });
    return {
      module: TelegramModule,
      providers: [],
    };
  }
}
