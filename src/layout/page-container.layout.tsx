import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  centered?: boolean;
}

export function PageContainer({ children, centered }: PageContainerProps) {
  const centeredClass = centered ? "min-h-screen flex items-center justify-center" : "min-h-screen";

  return (
    <div className={`${centeredClass} bg-gray-50`}>
      <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {children}
      </div>
    </div>
  );
}
