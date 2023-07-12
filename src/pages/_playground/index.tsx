"use-client";

import { useState } from "react";

import Head from "next/head";

import toast from "react-hot-toast";

import MessageRow from "./message-row";

import PlaygroundConfiguration, {
  playgroundConfigurationOptions,
} from "./playground-configuration";
import type {
  PlaygroundConfigurationType,
  PlaygroundConfigurationStateType,
} from "./playground-configuration";

import { Button, LoadingSpinner } from "~/components";

import { api } from "~/utils/api";

import {
  processMessageForClient,
  processMessageForServer,
  processSystemMessageForServer,
  combineMessages,
  removeMessage,
} from "~/utils/message";
import type { ServerMessageType, ClientMessageType } from "~/utils/message";

function Playground() {
  const [systemMessage, setSystemMessage] = useState("");
  const [otherMessages, setOtherMessages] = useState<ClientMessageType[]>([
    processMessageForClient(),
  ]);
  const [playgroundConfiguration, setPlaygroundConfiguration] =
    useState<PlaygroundConfigurationStateType>(
      playgroundConfigurationOptions.reduce(
        (accumulator, { key, defaultValue }: PlaygroundConfigurationType) => ({
          ...accumulator,
          [key]: defaultValue,
        }),
        {}
      )
    );

  const chatMutation = api.chat.submit.useMutation({
    onSuccess: (data) => {
      if (data) {
        setOtherMessages(
          combineMessages(otherMessages, [
            processMessageForClient(data.message as ServerMessageType),
            processMessageForClient(),
          ])
        );
      }
    },
    onError: () => {
      toast.error("An error occured");
    },
  });

  const handleSystemMessageChange = (value: string) => {
    setSystemMessage(value);
  };

  const handleMessageChange = (
    message: ClientMessageType,
    value: string,
    index: number
  ) => {
    setOtherMessages(
      combineMessages(
        otherMessages,
        [
          {
            ...message,
            content: value,
          },
        ],
        index
      )
    );
  };

  const handleRemoveMessage = (index: number) => {
    setOtherMessages(removeMessage(otherMessages, index));
  };

  const handleConfigChange = (option: string, value: string) => {
    setPlaygroundConfiguration({
      ...playgroundConfiguration,
      [option]: value,
    });
  };

  const handleSubmit = () => {
    chatMutation.mutate({
      messages: [
        processSystemMessageForServer(systemMessage),
        ...otherMessages.map((message) => processMessageForServer(message)),
      ],
      ...playgroundConfiguration,
    });
  };

  const handleAddMessage = () => {
    setOtherMessages(
      combineMessages(otherMessages, [processMessageForClient()])
    );
  };

  return (
    <>
      <Head>
        <title>Playground</title>
      </Head>
      <main>
        <div className="grid grid-cols-[minmax(0,_1fr)] grid-rows-[min-content_min-content_minmax(0,_1fr)] gap-6 p-6 lg:grid-cols-[minmax(0,_1fr)_200px] xl:grid-cols-[minmax(0,_1fr)_300px]">
          <div className="lg:col-span-2">
            <h1 className="text-2xl">Playground</h1>
          </div>
          <div className="grow-1 col-span-1 flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <MessageRow
                message={{
                  role: "system",
                  content: systemMessage,
                }}
                handleChange={(value: string) => {
                  handleSystemMessageChange(value);
                }}
              />
            </div>
            {otherMessages.map((message, index) => (
              <div
                key={`message-${message.id}`}
                className="flex flex-row gap-2"
              >
                <MessageRow
                  message={message}
                  canRemove={index !== 0 || otherMessages.length > 1}
                  handleChange={(value: string) => {
                    handleMessageChange(message, value, index);
                  }}
                  handleRemove={() => {
                    handleRemoveMessage(index);
                  }}
                />
              </div>
            ))}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Button
                  disabled={chatMutation.isLoading}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                {chatMutation.isLoading && <LoadingSpinner />}
              </div>
              <Button
                disabled={chatMutation.isLoading}
                onClick={handleAddMessage}
              >
                Add Message
              </Button>
            </div>
          </div>
          <div className="col-span-1 col-start-2 row-span-2 row-start-2 hidden flex-col gap-4 lg:flex">
            <PlaygroundConfiguration
              configuration={playgroundConfiguration}
              handleChange={handleConfigChange}
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Playground;
