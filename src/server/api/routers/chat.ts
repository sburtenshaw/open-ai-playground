import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { createChatCompletion } from "~/server/open-ai";

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
      })
    )
    .mutation(async ({ input }) => {
      const {
        data: { choices },
      } = await createChatCompletion(input.messages);
      return choices[0];
    }),
});
