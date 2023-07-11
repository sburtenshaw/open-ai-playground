"use-client";

import { useState } from "react";
import type { ChangeEvent } from "react";

import Head from "next/head";

import { Button, TextInput } from "~/components";

import { api } from "~/utils/api";

import {
  DEFAULT_SYSTEM_MESSAGE,
  processMessageForClient,
  processMessageForServer,
  processSystemMessageForServer,
} from "~/utils/message";
import type { Message } from "~/utils/message";

function Playground() {
  const [systemMessage, setSystemMessage] = useState("");
  const [otherMessages, setOtherMessages] = useState<Message[]>([
    processMessageForClient(),
  ]);

  const { mutate: chatMutate, isLoading: chatMutationIsLoading } =
    api.chat.submit.useMutation();

  const handleSystemMessageChange = (value: string) => {
    setSystemMessage(value);
  };

  const handleMessageChange = (
    message: Message,
    index: number,
    value: string
  ) => {
    const otherMessagesCopy = [...otherMessages];
    otherMessagesCopy.splice(index, 1, {
      ...message,
      content: value,
    });
    setOtherMessages(otherMessagesCopy);
  };

  const handleSubmit = () => {
    const response = chatMutate({
      messages: [
        processSystemMessageForServer(systemMessage),
        ...otherMessages.map((message) => processMessageForServer(message)),
      ],
    });
    console.log(response);
  };

  return (
    <>
      <Head>
        <title>Open AI Playground</title>
      </Head>
      <main>
        <div className="grid grid-cols-[minmax(0,_1fr)_300px] gap-4 p-4">
          <div className="col-span-2">
            <h1 className="text-2xl">Playground</h1>
          </div>
          <div className="col-span-1 col-start-1">
            <TextInput
              value={systemMessage}
              placeholder={DEFAULT_SYSTEM_MESSAGE}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                handleSystemMessageChange(e.target.value);
              }}
            />
          </div>
          <div className="col-span-1 col-start-1">
            {otherMessages.map((message, index) => (
              <TextInput
                key={`message-${message.id}`}
                value={message.content}
                placeholder="User message"
                onInput={(e: ChangeEvent<HTMLInputElement>) => {
                  e.preventDefault();
                  handleMessageChange(message, index, e.target.value);
                }}
              />
            ))}
          </div>
          <div className="col-span-1 col-start-2 row-span-2 row-start-2">
            Config
          </div>
          <div className="col-span-2">
            <Button disabled={chatMutationIsLoading} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Playground;
