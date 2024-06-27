import React from "react";
import { cn } from "../../utils";

function IconLinkFooter({
  className,
  href = "https://www.facebook.com",
  src = "../images/icon-facebook.svg",
  alt = "facebook-icon",
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block group"
    >
      <img className={cn("h-6 w-6 p-1", className)} src={src} alt={alt} />
    </a>
  );
}

export default IconLinkFooter;
