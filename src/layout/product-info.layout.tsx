import React from "react";

interface ProductInfoProps {
  name: string;
  amount: number;
  comment: string;
}

export function ProductInfo({ name, amount, comment }: ProductInfoProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2.5">
        <span className="font-medium text-gray-900 truncate">{name}</span>
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
          x{amount}
        </span>
      </div>
      {comment && (
        <p className="text-sm text-gray-500 truncate mt-1">{comment}</p>
      )}
    </div>
  );
}
