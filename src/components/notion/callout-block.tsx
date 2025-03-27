"use client";

import { cn } from "@/lib/utils";

interface CalloutBlockProps {
  plainText: string;
  color?: string;
  icon?: string;
  className?: string;
}

export function CalloutBlock({ plainText, color = "blue", icon = "💡", className }: CalloutBlockProps) {
  const colorStyles = {
    blue: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200",
    gray: "bg-gray-50 dark:bg-gray-950/50 border-gray-200 dark:border-gray-800 text-gray-800 dark:text-gray-200",
    green: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200",
    yellow: "bg-yellow-50 dark:bg-yellow-950/50 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200",
    red: "bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200",
    purple: "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800 text-purple-800 dark:text-purple-200",
    pink: "bg-pink-50 dark:bg-pink-950/50 border-pink-200 dark:border-pink-800 text-pink-800 dark:text-pink-200",
  };

  return (
    <div
      className={cn(
        "my-6 flex items-start gap-3 rounded-lg border p-4",
        colorStyles[color as keyof typeof colorStyles] || colorStyles.blue,
        "!bg-blue-50 dark:!bg-blue-950/50 !border-blue-200 dark:!border-blue-800 !text-blue-800 dark:!text-blue-200",
        className
      )}
    >
      <span className="mt-1">{icon}</span>
      <span className="leading-7">{plainText}</span>
    </div>
  );
} 