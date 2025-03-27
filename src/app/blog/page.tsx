import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getAllPublished } from "@/lib/notion/client";
import { Metadata } from "next";

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
            className="group block space-y-2"
          >
            <h2 className="text-2xl font-semibold tracking-tight group-hover:underline">
              {post.title}
            </h2>
            <p className="text-muted-foreground leading-7">{post.description}</p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.wordCount} words</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 