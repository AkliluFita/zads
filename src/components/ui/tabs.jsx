import React from "react";
import * as Primitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";
export const Tabs = Primitive.Root;
export const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <Primitive.List
    ref={ref}
    className={cn(
      "inline-flex flex-wrap gap-1 rounded-lg border border-line bg-stone-100 p-1",
      className,
    )}
    {...props}
  />
));
export const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <Primitive.Trigger
    ref={ref}
    className={cn(
      "min-h-11 rounded-md px-5 py-2 text-sm font-medium text-stone-600 data-[state=active]:bg-ink data-[state=active]:text-white",
      className,
    )}
    {...props}
  />
));
export const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <Primitive.Content
    ref={ref}
    className={cn(
      "mt-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-700",
      className,
    )}
    {...props}
  />
));
