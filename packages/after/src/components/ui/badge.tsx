import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center  border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-badge-primary-bg text-badge-primary-text [a&]:hover:bg-badge-primary-bg/90",
        secondary:
          "border-transparent bg-badge-secondary-bg text-badge-secondary-text [a&]:hover:bg-badge-secondary-bg/90",
        success:
          "border-transparent bg-badge-success-bg text-badge-success-text [a&]:hover:bg-badge-success-bg/90",
        danger:
          "border-transparent bg-badge-danger-bg text-badge-danger-text [a&]:hover:bg-badge-danger-bg/90",
        warning:
          "border-transparent bg-badge-warning-bg text-badge-warning-text [a&]:hover:bg-badge-warning-bg/90",
        info: "border-transparent bg-badge-info-bg text-badge-info-text [a&]:hover:bg-badge-info-bg/90",
      },
      shape: {
        pill: "rounded-full",
        rounded: "rounded-md",
        square: "rounded-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "rounded",
    },
  }
);

function Badge({
  className,
  variant,
  shape,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, shape }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
