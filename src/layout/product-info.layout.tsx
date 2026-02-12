import React from "react";

interface ProductInfoProps {
  name: string;
  amount: number;
  comment: string;
}

export function ProductInfo({ name, amount, comment }: ProductInfoProps) {
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline gap-2">
        <span className="font-medium text-gray-900 truncate">{name}</span>
        <span className="text-sm text-blue-600 font-semibold whitespace-nowrap">x{amount}</span>
      </div>
      {comment && (
        <p className="text-sm text-gray-500 truncate mt-0.5">{comment}</p>
      )}
    </div>
  );
}
