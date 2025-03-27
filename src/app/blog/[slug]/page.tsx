import { getSingleBlogPostBySlug, getAllSlugs } from "@/lib/notion/client";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostContent } from "@/components/notion/blog-post-content";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const post = await getSingleBlogPostBySlug(params.slug);
    return {
      title: post.title,
      description: post.description,
    };
  } catch (error) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export const revalidate = 3600; // Revalidate every hour

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const post = await getSingleBlogPostBySlug(params.slug);

    return (
      <article className="max-w-3xl mx-auto space-y-8">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-2">
            <span className="text-sm">{post.date}</span>
            <span>•</span>
            <span className="text-sm">{post.wordCount} words</span>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <span
                  key={tag.name}
                  className="px-2 py-1 text-xs rounded-full"
                  style={{
                    backgroundColor: `${tag.color}20`,
                    color: tag.color,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {post.cover && (
          <div className="relative h-[400px] w-full">
            <img
              src={post.cover}
              alt={post.title}
              className="object-cover w-full h-full rounded-lg"
            />
          </div>
        )}

        <BlogPostContent blocks={post.content} />
      </article>
    );
  } catch (error) {
    notFound();
  }
} 