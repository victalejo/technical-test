import React from "react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  return (
    <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5 mt-1">
      <span className="text-red-500 text-sm flex-shrink-0">⚠</span>
      <p className="text-red-700 text-sm">{message}</p>
    </div>
  );
}
