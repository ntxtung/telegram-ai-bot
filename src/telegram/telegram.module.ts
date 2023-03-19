import { DynamicModule } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';
import { Configuration, OpenAIApi } from 'openai';

const botToken = `5992886322:AAHB0PYleaaxs8Lbpzns4A0Dtsp_ItZDLa4`;
const openaiToken = `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`;

export class TelegramModule {
  static async register(): Promise<DynamicModule> {
    const configuration = new Configuration({
      apiKey: openaiToken,
    });

    const openai = new OpenAIApi(configuration);

    const bot = new TelegramBot(botToken, { polling: true });
    bot.on('message', async (msg) => {
      console.log(msg);
      const chatId = msg.chat.id;
      const messageContent = msg.text;

      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: messageContent }],
      });

      console.log(completion.data.choices);

      // send a message to the chat acknowledging receipt of their message
      await bot.sendMessage(chatId, completion.data.choices[0].message.content);
      console.log(`Message sent: ${msg.from.username}`);
    });
    return {
      module: TelegramModule,
      providers: [],
    };
  }
}
