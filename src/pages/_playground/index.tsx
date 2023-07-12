"use-client";

import { useState } from "react";
import type { ChangeEvent } from "react";

import Head from "next/head";

import toast from "react-hot-toast";

import MessageRow from "./message-row";

import { Button, LoadingSpinner, RangeInput } from "~/components";

import { api } from "~/utils/api";

import { configurations } from "~/utils/configuration";
import type { Configuration, ConfigurationState } from "~/utils/configuration";

import {
  processMessageForClient,
  processMessageForServer,
  processSystemMessageForServer,
  combineMessages,
  removeMessage,
} from "~/utils/message";
import type { ServerMessage, ClientMessage } from "~/utils/message";

function Playground() {
  const [systemMessage, setSystemMessage] = useState("");
  const [otherMessages, setOtherMessages] = useState<ClientMessage[]>([
    processMessageForClient(),
  ]);
  const [config, setConfig] = useState<ConfigurationState>(
    configurations.reduce(
      (accumulator, { key, defaultValue }: Configuration) => ({
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
            processMessageForClient(data.message as ServerMessage),
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
    message: ClientMessage,
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
    setConfig({
      ...config,
      [option]: value,
    });
  };

  const handleSubmit = () => {
    chatMutation.mutate({
      messages: [
        processSystemMessageForServer(systemMessage),
        ...otherMessages.map((message) => processMessageForServer(message)),
      ],
      ...config,
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
        <div className="grid grid-cols-[minmax(0,_1fr)_300px] grid-rows-[min-content_min-content_minmax(0,_1fr)] gap-6 p-4">
          <div className="col-span-2">
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
          <div className="col-span-1 col-start-2 row-span-2 row-start-2 flex flex-col gap-4">
            {configurations.map(
              ({
                text,
                key,
                defaultValue: _,
                ...otherOptions
              }: Configuration) => (
                <div key={key}>
                  <div className="flex justify-between">
                    <h2>{text}</h2>
                    <p>{config[key]}</p>
                  </div>
                  <RangeInput
                    {...otherOptions}
                    value={config[key]}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                      e.preventDefault();
                      handleConfigChange(key, e.target.value);
                    }}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Playground;
