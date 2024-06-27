import React from "react";
import { cn } from "../../utils";

function ParagraphUlFooter({ className, text = "" }) {
  return (
    <p
      className={cn(
        "uppercase text-[#808080] font-karla font-semibold pb-[2rem] ",
        className
      )}
    >
      {text}
    </p>
  );
}

export default ParagraphUlFooter;
