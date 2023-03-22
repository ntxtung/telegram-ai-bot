import { DynamicModule, Module } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from 'openai';
import { ChatCompletionRequestMessage } from 'openai/api';

const botToken = process.env.TELEGRAM_BOT_TOKEN;
const openAiApiKey = process.env.OPEN_AI_API_KEY;

const sampleChats: ChatCompletionRequestMessage[] = [
  {
    role: ChatCompletionRequestMessageRoleEnum.System,
    content: 'You are a very experienced software tester.',
  },
];
@Module({})
export class TelegramModule {
  static register(): DynamicModule {
    const bot = new TelegramBot(botToken, { polling: true });

    const openAiConfig = new Configuration({
      apiKey: openAiApiKey,
    });
    const openai = new OpenAIApi(openAiConfig);

    bot.on('message', async (msg) => {
      const chatId = msg.chat.id;

      sampleChats.push({
        role: ChatCompletionRequestMessageRoleEnum.User,
        content: msg.text,
      });

      const completion = await openai.createChatCompletion({
        messages: sampleChats,
        max_tokens: 2048,
        temperature: 1,
        top_p: 1,
        model: 'gpt-3.5-turbo',
      });
      sampleChats.push({
        role: completion.data.choices[0].message.role,
        content: completion.data.choices[0].message.content,
      });
      // send a message to the chat acknowledging receipt of their message
      await bot.sendMessage(chatId, completion.data.choices[0].message.content);
    });
    return {
      module: TelegramModule,
      providers: [],
    };
  }
}
