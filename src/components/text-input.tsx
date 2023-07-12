import type { DetailedHTMLProps, TextareaHTMLAttributes } from "react";

function TextInput({
  value,
  ...props
}: DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>) {
  const calculateRows = (): number => {
    if (!value || typeof value !== "string") {
      return 1;
    }
    return (value.match(/\n/g) || []).length + 1;
  };

  return (
    <textarea
      rows={calculateRows()}
      {...props}
      value={value}
      className="block w-full resize-none appearance-none rounded-lg border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      style={{ minHeight: "48px" }}
    />
  );
}

export default TextInput;
