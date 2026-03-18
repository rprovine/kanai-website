import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { generatePageMetadata } from "@/lib/metadata";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = generatePageMetadata({
  title: "Blog",
  description:
    "Tips, guides, and news about junk removal, recycling, and home cleanouts from Kana'i's Junk Removal.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-brand-red">Blog</span>
            </h1>
            <p className="text-lg text-brand-gray-300">
              Tips, guides, and news about junk removal and keeping Oahu clean.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-brand-gray-200 hover:border-brand-red transition-all"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs text-brand-red font-semibold uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-brand-gray-400">
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-brand-gray-600 line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-brand-gray-400">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </time>
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
