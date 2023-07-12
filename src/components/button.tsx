import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
  children: ReactNode;
}

function Button({ disabled, small = false, children, ...props }: PropsType) {
  const getClassName = () => {
    const className = [
      "text-white",
      "font-medium",
      "rounded-lg",
      "text-center",
      small ? "text-xs" : "text-sm",
      small ? "px-3" : "px-5",
      small ? "h-9" : "h-12",
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
