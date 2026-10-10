import React from "react";
import * as Primitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
export const Dialog = Primitive.Root,
  DialogTrigger = Primitive.Trigger,
  DialogClose = Primitive.Close,
  DialogTitle = Primitive.Title,
  DialogDescription = Primitive.Description;
export const DialogContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <Primitive.Portal>
      <Primitive.Overlay className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm" />
      <Primitive.Content
        ref={ref}
        className={cn(
          "fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-xl bg-ivory p-7 shadow-2xl sm:p-10",
          className,
        )}
        {...props}
      >
        {children}
        <Primitive.Close
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-stone-200"
          aria-label="Close dialog"
        >
          <X size={20} />
        </Primitive.Close>
      </Primitive.Content>
    </Primitive.Portal>
  ),
);
DialogContent.displayName = "DialogContent";
