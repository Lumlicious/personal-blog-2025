import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tech Blog",
  description: "A personal tech blog built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-full flex flex-col")}>
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <NavigationMenu>
              <div className="flex items-center space-x-4">
                <Link href="/" className="text-xl font-bold">
                  Tech Blog
                </Link>
                <nav className="flex space-x-4">
                  <Link href="/blog" className="hover:text-gray-600">
                    Blog
                  </Link>
                  <Link href="/about" className="hover:text-gray-600">
                    About
                  </Link>
                  <Link href="/contact" className="hover:text-gray-600">
                    Contact
                  </Link>
                </nav>
              </div>
            </NavigationMenu>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t">
          <div className="container mx-auto px-4 py-6">
            <p className="text-center text-gray-600">
              © {new Date().getFullYear()} Tech Blog. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
