import { Configuration, OpenAIApi } from "openai";

import type { ServerMessage } from "~/utils/message";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openAi = new OpenAIApi(configuration);

export async function createChatCompletion(messages: ServerMessage[]) {
  return await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  });
}
