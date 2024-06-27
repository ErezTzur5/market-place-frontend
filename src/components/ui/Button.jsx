import React from "react";
import { cn } from "../../utils";

// function Button({ children, className, pill, disabled, danger, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={disabled}
//       className={cn(
//         "rounded-md bg-sky-500 px-6 py-2 text-lg font-semibold text-white outline-none transition duration-75 hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 active:bg-sky-800",
//         className,
//         pill && "rounded-full",
//         disabled &&
//           "cursor-not-allowed bg-slate-400 hover:bg-slate-400 active:bg-slate-400",
//         danger && "bg-rose-500 hover:bg-rose-700 active:bg-rose-800",
//       )}
//     >
//       {children}
//     </button>
//   );
// }

// export default Button;
function Button({ className, text = "view plans" }) {
  return (
    <a
      href="/contact"
      className={cn(
        "text-black font-semibold hover:bg-gray-700 hover:text-white  px-6 py-2 text-sm font-small border border-black uppercase",
        className
      )}
    >
      {text}
    </a>
  );
}

export default Button;
