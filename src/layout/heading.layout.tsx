import React from "react";

interface HeadingProps {
  children: React.ReactNode;
}

export function Heading({ children }: HeadingProps) {
  return (
    <h1 className="text-2xl font-bold text-gray-900">{children}</h1>
  );
}
