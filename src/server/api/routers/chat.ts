import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { createChatCompletion } from "~/utils/open-ai";
import type { ChatInputType } from "~/utils/open-ai";

export const chatRouter = createTRPCRouter({
  submit: publicProcedure
    .input(
      z.object({
        messages: z.array(
          z.object({
            role: z.enum(["system", "user", "assistant"]),
            content: z.string().min(1),
          })
        ),
        temperature: z.number(),
        max_tokens: z.number(),
        frequency_penalty: z.number(),
        presence_penalty: z.number(),
      })
    )
    .mutation(async ({ input }: { input: ChatInputType }) => {
      const {
        data: { choices },
      } = await createChatCompletion(input);
      return choices[0];
    }),
});
