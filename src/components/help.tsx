import { Tooltip } from "~/components";

interface HelpPropsType {
  content?: string | undefined;
  onClick?: () => void | undefined;
}

function Help({ content = "Help", onClick }: HelpPropsType) {
  const getClassName = () => {
    const className = [
      "flex",
      "h-4",
      "w-4",
      "items-center",
      "justify-center",
      "rounded-full",
      "bg-gray-300",
      "text-xs",
      "text-white",
    ];
    if (!!onClick) {
      className.push("cursor-pointer");
    } else {
      className.push("cursor-default");
    }
    return className.join(" ");
  };
  console.log(content);
  return (
    <Tooltip content={content}>
      <div className={getClassName()}>
        <div onClick={onClick}>?</div>
      </div>
    </Tooltip>
  );
}

export default Help;
