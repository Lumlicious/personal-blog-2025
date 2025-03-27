import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      description: "Learn the basics of Next.js and how to build modern web applications.",
      date: "2024-03-20",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Understanding TypeScript",
      description: "A comprehensive guide to TypeScript and its benefits in modern development.",
      date: "2024-03-18",
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "The Future of Web Development",
      description: "Exploring upcoming trends and technologies in web development.",
      date: "2024-03-15",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <p className="text-gray-600 mt-2">Thoughts, tutorials, and insights about technology.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link href={`/blog/${post.id}`} key={post.id}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{post.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
} 