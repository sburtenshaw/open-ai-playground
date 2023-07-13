import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  small?: boolean;
  children: ReactNode;
}

function Button({ small = false, children, ...props }: ButtonPropsType) {
  const getClassName = () => {
    const className = [
      "text-white",
      "font-medium",
      "rounded-lg",
      "text-center",
      "bg-blue-700",
      "hover:bg-blue-800",
      "focus:outline-none",
      "disabled:bg-blue-400",
      "disabled:cursor-not-allowed",
      small ? "text-xs" : "text-sm",
      small ? "px-3" : "px-5",
      small ? "h-9" : "h-12",
    ];
    return className.join(" ");
  };

  return (
    <button {...props} type="button" className={getClassName()}>
      {children}
    </button>
  );
}

export default Button;
