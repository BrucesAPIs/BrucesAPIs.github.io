import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { getAllPosts, getPostBySlug, Post } from '../../utils/content';
import Link from 'next/link';

interface PostPageProps {
    post: Post;
}

export default function PostPage({ post }: PostPageProps) {
    return (
        <>
            <Head>
                <title>{`${post.title} | Bruce's API Documentation`}</title>
                <meta name="description" content={post.excerpt || post.content.slice(0, 160)} />
                <meta property="og:title" content={`${post.title} | Bruce's API Documentation`} />
                <meta property="og:description" content={post.excerpt || post.content.slice(0, 160)} />
                {post.image && <meta property="og:image" content={post.image} />}
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.4.0/styles/github.min.css"
                />

                {/* Add structured data for Google */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "TechArticle",
                        "headline": post.title,
                        "datePublished": post.date,
                        "author": {
                            "@type": "Person",
                            "name": "Bruce"
                        },
                        "description": post.excerpt || post.content.slice(0, 160)
                    })}
                </script>
            </Head>

            <div>
                {/* Navigation */}
                <nav className="bg-gray-50 border-b">
                    <div className="max-w-4xl mx-auto px-4 py-3">
                        <Link href="/">
                            <span className="text-gray-600 hover:text-gray-900">← Back to API services</span>
                        </Link>
                    </div>
                </nav>

                {/* Main Content */}
                <article className="max-w-4xl mx-auto px-4 py-12">
                    {/* Header Section */}
                    <header className="mb-12 text-center">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {post.title}
                        </h1>
                        <time className="text-gray-500 text-lg">
                            {new Date(post.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </header>

                    {/* Content Section - Using GitHub's markdown styling */}
                    <div className="markdown-body bg-white rounded-lg shadow-md prose prose-lg max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeHighlight]}
                            components={{
                                blockquote: ({ node, ...props }) => (
                                    <blockquote className="border-l-4 border-gray-300 pl-4 my-4" {...props} />
                                ),
                            }}
                        >
                            {post.content}
                        </ReactMarkdown>
                    </div>
                </article>


                {/* Floating RapidAPI Button - moved to bottom center */}
                {post.rapidapi_link && (
                    <div className="sticky bottom-0 flex justify-center p-4">
                        <a
                            href={post.rapidapi_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Try it on RapidAPI
                        </a>
                    </div>
                )}
            </div>
            {/* Add responsive styling as recommended in the docs */}
            <style jsx global>{`
                .markdown-body {
                    box-sizing: border-box;
                    min-width: 200px;
                    max-width: 980px;
                    margin: 0 auto;
                    padding: 45px;
                }

                /* Add blockquote styles */
                .markdown-body blockquote {
                    padding: 0 1em;
                    margin: 1em 0;
                    color: #6a737d;
                    border-left: 0.25em solid #dfe2e5;
                    background-color: #f6f8fa;
                }

                .markdown-body blockquote > :first-child {
                    margin-top: 0;
                }

                .markdown-body blockquote > :last-child {
                    margin-bottom: 0;
                }

                /* Add these new table styles */
                .markdown-body table {
                    border-collapse: collapse;
                    width: 100%;
                    margin: 1em 0;
                }

                .markdown-body table th {
                    background-color: #f8f9fa;
                    border: 1px solid #dfe2e5;
                    padding: 12px;
                    font-weight: 600;
                }

                .markdown-body table td {
                    border: 1px solid #dfe2e5;
                    padding: 12px;
                }

                .markdown-body table tr:nth-child(even) {
                    background-color: #f8f9fa;
                }

                .markdown-body table tr:hover {
                    background-color: #f1f4f7;
                }

                @media (max-width: 767px) {
                    .markdown-body {
                        padding: 15px;
                    }
                }
            `}</style>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = getAllPosts();

    return {
        paths: posts.map((post) => ({
            params: { slug: post.slug }
        })),
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            post
        }
    };
}; 