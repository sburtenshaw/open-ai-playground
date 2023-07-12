import { Configuration, OpenAIApi } from "openai";

import type { ServerMessageType } from "~/utils/message";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

export async function createChatCompletion(messages: ServerMessageType[]) {
  return await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
}
