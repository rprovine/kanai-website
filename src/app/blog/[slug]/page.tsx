import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { generatePageMetadata } from "@/lib/metadata";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/data/blog";
import { siteConfig } from "@/data/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return generatePageMetadata({
    title: post.title,
    description: post.metaDescription,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: `${siteConfig.url}${post.image}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/images/logo.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section className="bg-black text-white pt-32 md:pt-40 pb-16 md:pb-20">
        <Container>
          <div className="max-w-3xl">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: post.title },
              ]}
            />
            <div className="flex items-center gap-3 text-sm text-brand-gray-400 mb-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span className="text-brand-gray-600">|</span>
              <span>{post.readTime}</span>
              <span className="text-brand-gray-600">|</span>
              <span className="text-brand-red">{post.category}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-lg text-brand-gray-300">By {post.author}</p>
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-24 sm:py-32">
        <Container>
          <div className="max-w-3xl">
            <article
              className="prose prose-lg prose-gray max-w-none
                prose-headings:font-bold prose-headings:text-brand-gray-900
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-p:text-brand-gray-700 prose-p:leading-relaxed
                prose-li:text-brand-gray-700
                prose-strong:text-brand-gray-900
                prose-a:text-brand-red prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-brand-red py-16">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Get a free, no-obligation estimate for your junk removal or
              dumpster rental project.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/book-now"
                className="bg-white text-brand-red hover:bg-white/90"
              >
                Get Free Estimate
              </Button>
              <Button
                href={siteConfig.phoneHref}
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Call {siteConfig.phone}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-24 sm:py-32 bg-brand-gray-50">
          <Container>
            <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <span className="text-xs text-brand-red font-semibold uppercase tracking-wider">
                      {relPost.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2 mb-2 group-hover:text-brand-red transition-colors">
                      {relPost.title}
                    </h3>
                    <p className="text-sm text-brand-gray-600 line-clamp-2">
                      {relPost.excerpt}
                    </p>
                    <div className="mt-3 text-xs text-brand-gray-400">
                      {relPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
