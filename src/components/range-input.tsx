import type { InputHTMLAttributes } from "react";

function RangeInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="range"
      className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
    />
  );
}

export default RangeInput;
