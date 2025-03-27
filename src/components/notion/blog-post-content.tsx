"use client";

import { Render, withContentValidation } from "@9gustin/react-notion-render";
import { CodeBlock } from "./code-block";
import { ImageBlock } from "./image-block";
import { CalloutBlock } from "./callout-block";

interface BlogPostContentProps {
  blocks: any[];
}

export function BlogPostContent({ blocks }: BlogPostContentProps) {
  return (
    <div className="space-y-6">
      <Render 
        blocks={blocks} 
        classNames
        slugifyFn={(text) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-')}
        blockComponentsMapper={{
          code: withContentValidation(CodeBlock),
          image: withContentValidation(ImageBlock),
          callout: withContentValidation(CalloutBlock)
        }}
      />
    </div>
  );
} 