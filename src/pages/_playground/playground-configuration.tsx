import type { ChangeEvent } from "react";

import { RangeInput } from "~/components";

interface PlaygroundConfigurationType {
  key: string;
  text: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
}

interface PlaygroundConfigurationStateType {
  [_: string]: string;
}

interface PropsType {
  configuration: PlaygroundConfigurationStateType;
  handleChange: (option: string, value: string) => void;
}

const playgroundConfigurationOptions: PlaygroundConfigurationType[] = [
  {
    key: "temperature",
    text: "Temperature",
    min: "0",
    max: "2",
    step: "0.01",
    defaultValue: "1",
  },
  {
    key: "max_tokens",
    text: "Maximum length",
    min: "1",
    max: "2048",
    step: "1",
    defaultValue: "1024",
  },
  {
    key: "frequency_penalty",
    text: "Frequency penalty",
    min: "0",
    max: "2",
    step: "0.01",
    defaultValue: "0",
  },
  {
    key: "presence_penalty",
    text: "Presence penalty",
    min: "0",
    max: "2",
    step: "0.01",
    defaultValue: "0",
  },
];

function PlaygroundConfiguration({ configuration, handleChange }: PropsType) {
  return playgroundConfigurationOptions.map(
    ({
      text,
      key,
      defaultValue: _,
      ...otherOptions
    }: PlaygroundConfigurationType) => (
      <div key={key}>
        <div className="flex justify-between">
          <h2>{text}</h2>
          <p>{configuration[key]}</p>
        </div>
        <RangeInput
          {...otherOptions}
          value={configuration[key]}
          onInput={(e: ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            handleChange(key, e.target.value);
          }}
        />
      </div>
    )
  );
}

export type { PlaygroundConfigurationType, PlaygroundConfigurationStateType };

export { playgroundConfigurationOptions };

export default PlaygroundConfiguration;
