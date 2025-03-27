"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageBlockProps {
  url: string;
  caption?: string;
  className?: string;
}

export function ImageBlock({ url, caption, className }: ImageBlockProps) {
  return (
    <div className={cn("relative w-full my-6", className)}>
      <div className="relative aspect-video w-full overflow-hidden rounded-lg">
        <Image
          src={url}
          alt={caption || ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          priority={false}
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-center text-muted-foreground leading-7">{caption}</p>
      )}
    </div>
  );
} 