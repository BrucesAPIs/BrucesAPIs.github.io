import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, Post } from '../utils/content';
import Head from 'next/head';

interface HomeProps {
    posts: Post[];
}

export default function Home({ posts }: HomeProps) {
    return (
        <>
            <Head>
                <title>Bruce's API Services on RapidAPI Marketplace</title>
                <meta name="description" content="Explore Bruce's services of powerful APIs available on RapidAPI. Find detailed documentation, examples, and integration guides for various API services." />
                <meta property="og:title" content="Bruce's API Services | RapidAPI Marketplace" />
                <meta property="og:description" content="Explore Bruce's services of powerful APIs available on RapidAPI. Find detailed documentation, examples, and integration guides for various API services." />
            </Head>

            <div className="container mx-auto px-4 py-8">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold mb-4">Bruce's API Services</h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Welcome to my API documentation hub. Here you'll find detailed guides and examples for various API services available on RapidAPI.
                    </p>
                </header>

                <div className="space-y-6">
                    {posts.map((post) => (
                        <article key={post.slug} className="border p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                            <Link href={`/posts/${post.slug}`}>
                                <h2 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                                    {post.title}
                                </h2>
                            </Link>
                            <time className="text-gray-500 block mb-3">{post.date}</time>
                            {post.excerpt && (
                                <p className="text-gray-600">{post.excerpt}</p>
                            )}
                            <div className="mt-4">
                                <Link href={`/posts/${post.slug}`}>
                                    <span className="text-blue-600 hover:text-blue-800">
                                        Read Documentation →
                                    </span>
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllPosts();

    return {
        props: {
            posts
        }
    };
}; 