import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
        variant === "default" && "bg-coral-500 text-white hover:bg-coral-600",
        variant === "outline" && "border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-100",
        className
      )}
      {...props}
    />
  );
}
