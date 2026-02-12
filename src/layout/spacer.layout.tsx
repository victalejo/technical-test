import React from "react";

interface SpacerProps {
  size?: "sm" | "md" | "lg";
}

export function Spacer({ size = "md" }: SpacerProps) {
  const sizes = { sm: "h-3", md: "h-5", lg: "h-8" };
  return <div className={sizes[size]} />;
}
