import * as React from "react";
import { cn } from "@/lib/utils";

type InputProps = React.ComponentProps<"input"> & {
  label?: string;
};

function Input({
  label,
  className,
  type,
  ...props
}: InputProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        type={type}
        className={cn(
          "w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-blue-600 focus:outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}

export default Input;