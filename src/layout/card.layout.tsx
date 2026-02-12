import React from "react";

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      {children}
    </div>
  );
}
