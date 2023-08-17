import type { ReactNode } from "react";

import Drawer from "react-modern-drawer";

interface SectionPropsType {
  title: string;
  variation?: string | undefined;
  children: ReactNode;
}

function Section({ title, variation = "text-md", children }: SectionPropsType) {
  return (
    <div className="mb-4">
      <h2 className={`mb-2 ${variation}`}>{title}</h2>
      {children}
    </div>
  );
}

interface HelpDrawerPropsType {
  open: boolean;
  handleClose: () => void;
}

function HelpDrawer({ open, handleClose }: HelpDrawerPropsType) {
  return (
    <Drawer
      open={open}
      onClose={handleClose}
      direction="right"
      size={400}
      className="overflow-auto"
    >
      <div className="p-4">
        <Section title="What is OpenAI Playground?" variation="text-xl">
          <p className="text-sm">
            OpenAI has trained cutting-edge language models that are very good
            at understanding and generating text. The playground is a tool used
            to test and tune different input configurations for the language
            models.
          </p>
        </Section>
        <h2 className="mb-2 text-xl">Messages</h2>
        <Section title="System message">
          <p className="text-sm">
            The system message input field is used to define a
            &apos;persona&apos; or tweak characteristics in how the language
            model should respond to your message.
          </p>
        </Section>
        <Section title="User messages">
          <p className="text-sm">
            User messages are inputs from the user, or you. They are the
            messages that you want the language model to respond to.
          </p>
        </Section>
        <Section title="Assistant messages">
          <p className="text-sm">
            Assistant messages are the response from the language model. Every
            prior message (assistant, user and the system message) is taken into
            consideration on every request, so you can tweak these responses
            from the model to sway how the model might respond in future
            messages.
          </p>
        </Section>
        <h2 className="mb-2 text-xl">Configuration</h2>
        <Section title="Temperature">
          <p className="text-sm">
            Temperature is a value between 0 and 2 that essentially lets you
            control how confident the model should be when making these
            predictions. Lowering temperature means it will take fewer risks,
            and completions will be more accurate and deterministic. Increasing
            temperature will result in more diverse completions.
          </p>
        </Section>
        <Section title="Maximum length">
          <p className="text-sm">
            Maximum length is the number of tokens the model will use up before
            it stops the request. If the maximum number of tokens is reached,
            the response will be incomplete and another request will need to be
            sent to get the rest of the response, up until the maximum token is
            reached again. In general, higher is better but may also incur more
            cost with more tokens being used.
          </p>
        </Section>
        <Section title="Frequency penalty">
          <p className="text-sm">
            Frequency penalty is a vlue between 0 and 2. Higher values penalize
            new tokens more based on their existing frequency in the text so
            far, decreasing the model&apos;s likelihood to repeat the same line
            verbatim.
          </p>
        </Section>
        <Section title="Presence penalty">
          <p className="text-sm">
            Presence penalty is a value between 0 and 2. Higher values penalize
            new tokens more based on whether they appear in the text so far,
            increasing the model&apos;s likelihood to talk about new topics.
          </p>
        </Section>
      </div>
    </Drawer>
  );
}

export default HelpDrawer;
