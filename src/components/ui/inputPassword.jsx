import * as React from "react";

import { cn } from "@/lib/utils";
import { unstable_PasswordToggleField as PasswordToggleField } from "radix-ui";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
const InputPassword = React.forwardRef(
  ({ className, value, onChange, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <PasswordToggleField.Root>
          <PasswordToggleField.Input
            value={value}
            onChange={onChange}
            ref={ref}
            {...props}
            className={cn(
              "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
              className,
            )}
          />
          <PasswordToggleField.Toggle>
            <PasswordToggleField.Icon
              className="absolute top-1/2 -translate-y-1/2 ltr:right-3 rtl:left-3"
              visible={<EyeOpenIcon />}
              hidden={<EyeClosedIcon />}
            />
          </PasswordToggleField.Toggle>
        </PasswordToggleField.Root>
      </div>
    );
  },
);
InputPassword.displayName = "Input";

export { InputPassword };
