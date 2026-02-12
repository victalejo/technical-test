import React from "react";

interface IconButtonProps {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
  disabled?: boolean;
}

export function IconButton({ onClick, label, children, disabled }: IconButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      disabled={disabled}
      className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
    >
      {children}
    </button>
  );
}
