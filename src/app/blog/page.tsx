import { getAllPublished } from "@/lib/notion/client";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my latest thoughts and tutorials on web development.",
};

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPage() {
  const posts = await getAllPublished();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Blog</h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
          Read my latest thoughts and tutorials on web development.
        </p>
      </div>

      <div className="grid gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex gap-6 items-start h-48"
          >
            {post.cover && (
              <div className="relative h-full w-48 flex-shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 192px, 192px"
                  priority={false}
                />
              </div>
            )}
            <div className="space-y-2 flex-1 min-w-0">
              <h2 className="text-2xl font-semibold tracking-tight group-hover:underline truncate">
                {post.title}
              </h2>
              <p className="text-muted-foreground leading-7 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.wordCount} words</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 