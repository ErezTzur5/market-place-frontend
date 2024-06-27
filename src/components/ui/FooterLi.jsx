import React from "react";
import { cn } from "../../utils";

function FooterLi({ className, text = "" }) {
  return (
    <li className={cn("mb-2 uppercase font-bold text-sm ", className)}>
      {text}
    </li>
  );
}

export default FooterLi;
