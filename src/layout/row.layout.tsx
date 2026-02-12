import React from "react";

interface RowProps {
  children: React.ReactNode;
}

export function Row({ children }: RowProps) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  );
}
