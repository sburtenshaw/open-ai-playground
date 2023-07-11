import { v4 as uuidv4 } from "uuid";

export type Role = "system" | "user" | "assistant";

export interface Message {
  id: string;
  role: Role;
  content: string;
}

export const DEFAULT_SYSTEM_MESSAGE = "You are a helpful assistant.";

export function processMessageForClient(
  role: Role = "user",
  content = ""
): Message {
  return {
    id: uuidv4(),
    role,
    content,
  };
}

export function processMessageForServer(message: Message): {
  role: Role;
  content: string;
} {
  return {
    role: message.role,
    content: message.content,
  };
}

export function processSystemMessageForServer(content: string): {
  role: Role;
  content: string;
} {
  return {
    role: "system",
    content: content.length ? content : DEFAULT_SYSTEM_MESSAGE,
  };
}
