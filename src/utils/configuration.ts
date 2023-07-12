export interface Configuration {
  key: string;
  text: string;
  min: string;
  max: string;
  step: string;
  defaultValue: string;
}

export interface ConfigurationState {
  [_: string]: string;
}

export const configurations: Configuration[] = [
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
