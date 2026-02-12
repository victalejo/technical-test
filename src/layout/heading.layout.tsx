import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  subtitle?: string;
}

export function Heading({ children, subtitle }: HeadingProps) {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{children}</h1>
      {subtitle && (
        <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
