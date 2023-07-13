import React from "react";
import type { ReactElement } from "react";

import { v4 as uuidv4 } from "uuid";

import { Tooltip as ReactTooltip } from "react-tooltip";
import type { ITooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface TooltipPropsType extends ITooltip {
  children: ReactElement;
}

function Tooltip({ content, children, ...props }: TooltipPropsType) {
  const id = uuidv4();
  return (
    <>
      {React.cloneElement(children, {
        "data-tooltip-id": id,
        "data-tooltip-content": content,
      })}
      <ReactTooltip {...props} id={id} />
    </>
  );
}

export default Tooltip;
