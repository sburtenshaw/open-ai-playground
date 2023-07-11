import type { InputHTMLAttributes } from "react";

function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
      type="text"
      {...props}
    />
  );
}

export default TextInput;
