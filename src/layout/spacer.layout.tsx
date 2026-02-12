import React from "react";

interface SpacerProps {
  size?: "sm" | "md" | "lg";
}

export function Spacer({ size = "md" }: SpacerProps) {
  const sizes = { sm: "h-2", md: "h-4", lg: "h-6" };
  return <div className={sizes[size]} />;
}
