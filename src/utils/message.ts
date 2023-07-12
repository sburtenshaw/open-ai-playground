import { v4 as uuidv4 } from "uuid";

export type Role = "system" | "user" | "assistant";

export interface ServerMessage {
  role: Role;
  content: string;
}

export interface ClientMessage extends ServerMessage {
  id: string;
}

export const DEFAULT_SYSTEM_MESSAGE = "You are a helpful assistant.";

export function processMessageForClient(
  serverMessage: ServerMessage = { role: "user", content: "" }
): ClientMessage {
  return {
    id: uuidv4(),
    role: serverMessage.role,
    content: serverMessage.content,
  };
}

export function processMessageForServer(
  clientMessage: ClientMessage
): ServerMessage {
  return {
    role: clientMessage.role,
    content: clientMessage.content,
  };
}

export function processSystemMessageForServer(content: string): ServerMessage {
  return {
    role: "system",
    content: content.length ? content : DEFAULT_SYSTEM_MESSAGE,
  };
}

export function combineMessages(
  messages: ClientMessage[],
  newMessages: ClientMessage[],
  index: number | null = null
) {
  const messagesCopy = [...messages];
  if (index !== null) {
    messagesCopy.splice(index, 1, ...newMessages);
  } else {
    messagesCopy.push(...newMessages);
  }
  return messagesCopy;
}

export function removeMessage(messages: ClientMessage[], index: number) {
  const messagesCopy = [...messages];
  messagesCopy.splice(index, 1);
  return messagesCopy;
}
