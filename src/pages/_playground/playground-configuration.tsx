"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

import Image from "next/image";

import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";

import { Button, RangeInput } from "~/components";

interface PlaygroundConfigurationType {
  key: string;
  text: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}

interface PlaygroundConfigurationStateType {
  [_: string]: number;
}

interface PropsType {
  configuration: PlaygroundConfigurationStateType;
  handleChange: (option: string, value: number) => void;
}

const playgroundConfigurationOptions: PlaygroundConfigurationType[] = [
  {
    key: "temperature",
    text: "Temperature",
    min: 0,
    max: 2,
    step: 0.01,
    defaultValue: 1,
  },
  {
    key: "max_tokens",
    text: "Maximum length",
    min: 1,
    max: 2048,
    step: 1,
    defaultValue: 1024,
  },
  {
    key: "frequency_penalty",
    text: "Frequency penalty",
    min: 0,
    max: 2,
    step: 0.01,
    defaultValue: 0,
  },
  {
    key: "presence_penalty",
    text: "Presence penalty",
    min: 0,
    max: 2,
    step: 0.01,
    defaultValue: 0,
  },
];

const generatePlaygroundConfigurationState = () => {
  return playgroundConfigurationOptions.reduce(
    (accumulator, { key, defaultValue }: PlaygroundConfigurationType) => ({
      ...accumulator,
      [key]: defaultValue,
    }),
    {}
  );
};

function PlaygroundConfiguration({ configuration, handleChange }: PropsType) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const renderConfigurationOptions = () => (
    <div className="flex flex-col gap-4">
      {playgroundConfigurationOptions.map(
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
                handleChange(key, Number(e.target.value));
              }}
            />
          </div>
        )
      )}
    </div>
  );

  return (
    <>
      <div className="hidden lg:block">{renderConfigurationOptions()}</div>
      <div className="lg:hidden">
        <Button onClick={handleOpenDrawer}>
          <Image
            src="/images/burger-menu.svg"
            width={16}
            height={16}
            alt="Playground configuration menu"
          />
        </Button>
        <Drawer open={drawerOpen} onClose={handleCloseDrawer} direction="right">
          <div className="p-4">{renderConfigurationOptions()}</div>
        </Drawer>
      </div>
    </>
  );
}

export type { PlaygroundConfigurationType, PlaygroundConfigurationStateType };

export { playgroundConfigurationOptions, generatePlaygroundConfigurationState };

export default PlaygroundConfiguration;
