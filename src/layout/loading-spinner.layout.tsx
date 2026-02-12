import React from "react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-12" role="status" aria-label="Loading">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
