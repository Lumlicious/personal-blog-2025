import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">About Me</h1>
        <p className="text-gray-600 mt-2">Get to know the person behind this tech blog.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Who I Am</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            I'm a passionate software developer with a keen interest in web technologies
            and modern development practices. This blog is my platform to share knowledge,
            experiences, and insights about the ever-evolving world of technology.
          </p>
          <p>
            With years of experience in software development, I focus on creating
            efficient, scalable, and maintainable solutions. I'm particularly interested
            in:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Modern web frameworks and tools</li>
            <li>Software architecture and design patterns</li>
            <li>Performance optimization</li>
            <li>Developer experience and productivity</li>
            <li>Emerging technologies and trends</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Get in Touch</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            I'm always open to discussions about technology, collaboration opportunities,
            or just connecting with fellow developers. Feel free to reach out through
            the contact page or connect with me on social media.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 