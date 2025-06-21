import React from "react";

const Spinner = ({ title="", description="" }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] gap-4">
      <div className="relative">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <div className="absolute inset-0 border-4 border-primary/10 rounded-full animate-ping opacity-75"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-xl font-medium text-gray-700 animate-pulse">
          {title}
        </p>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Spinner;
