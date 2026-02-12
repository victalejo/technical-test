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
      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
    >
      {children}
    </button>
  );
}
