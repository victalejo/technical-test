import React from "react";

interface RowProps {
  children: React.ReactNode;
  gap?: "sm" | "md" | "lg";
  justify?: "start" | "between" | "center" | "end";
}

export function Row({ children, gap = "md", justify = "start" }: RowProps) {
  const gaps = { sm: "gap-1.5", md: "gap-2.5", lg: "gap-4" };
  const justifies = { start: "justify-start", between: "justify-between", center: "justify-center", end: "justify-end" };

  return (
    <div className={`flex items-center ${gaps[gap]} ${justifies[justify]}`}>
      {children}
    </div>
  );
}
