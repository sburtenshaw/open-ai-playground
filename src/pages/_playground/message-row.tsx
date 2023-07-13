import type { ChangeEvent } from "react";

import { capitalize } from "lodash";

import { Button, TextInput, Tooltip } from "~/components";

import { DEFAULT_SYSTEM_MESSAGE } from "~/utils/message";
import type {
  ServerMessageType,
  ClientMessageType,
  Role,
} from "~/utils/message";

interface PropsType {
  message: ServerMessageType | ClientMessageType;
  canRemove?: boolean;
  disabled?: boolean;
  handleChange: (value: string) => void;
  handleRemove?: () => void;
}

const getPlaceholder = (role: Role) => {
  if (role === "system") {
    return DEFAULT_SYSTEM_MESSAGE;
  }
  return `${capitalize(role)} message`;
};

function MessageRow({
  message,
  canRemove = false,
  disabled = false,
  handleChange,
  handleRemove,
}: PropsType) {
  return (
    <>
      <div className="flex w-20" style={{ marginTop: "11px" }}>
        {/* TODO: Make dropdown */}
        <p>{capitalize(message.role)}</p>
      </div>
      <div className="flex-1">
        <TextInput
          value={message.content}
          placeholder={getPlaceholder(message.role)}
          disabled={disabled}
          onInput={(e: ChangeEvent<HTMLTextAreaElement>) => {
            e.preventDefault();
            handleChange(e.target.value);
          }}
        />
      </div>
      {canRemove && !!handleRemove && (
        <div className="flex items-start">
          <Tooltip content="Remove message">
            <Button
              disabled={disabled}
              onClick={() => {
                handleRemove();
              }}
            >
              -
            </Button>
          </Tooltip>
        </div>
      )}
    </>
  );
}

export default MessageRow;
