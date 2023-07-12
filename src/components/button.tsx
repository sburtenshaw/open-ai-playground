import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function Button({ disabled, children, ...props }: Props) {
  const getClassName = () => {
    const className = [
      "text-white",
      "font-medium",
      "rounded-lg",
      "text-sm",
      "px-5",
      "h-12",
      "text-center",
    ];
    if (disabled) {
      className.push("bg-blue-400", "cursor-not-allowed");
    } else {
      className.push("bg-blue-700", "hover:bg-blue-800", "focus:outline-none");
    }
    return className.join(" ");
  };

  return (
    <button {...props} type="button" className={getClassName()}>
      {children}
    </button>
  );
}

export default Button;
