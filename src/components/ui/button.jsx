import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const variants = cva(
  "inline-flex items-center justify-center gap-3 rounded-md text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700 focus-visible:ring-offset-4 disabled:pointer-events-none disabled:opacity-50 min-h-12 px-6 py-3",
  {
    variants: {
      variant: {
        default: "bg-ink text-white hover:bg-stone-700",
        outline: "border border-stone-400 bg-transparent hover:bg-stone-200",
        light: "bg-ivory text-ink hover:bg-white",
        ghost: "hover:bg-stone-100",
      },
    },
    defaultVariants: { variant: "default" },
  },
);
export const Button = React.forwardRef(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(variants({ variant }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
