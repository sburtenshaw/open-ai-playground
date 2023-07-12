import { Configuration, OpenAIApi } from "openai";

import type { ServerMessageType } from "~/utils/message";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

export interface ChatInputType {
  messages: ServerMessageType[];
  temperature: number;
  max_tokens: number;
  frequency_penalty: number;
  presence_penalty: number;
}

export async function createChatCompletion(input: ChatInputType) {
  return await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    ...input,
  });
}
