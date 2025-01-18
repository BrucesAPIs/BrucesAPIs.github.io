import { GetStaticProps } from 'next';
import Link from 'next/link';
import { getAllPosts, Post } from '../utils/content';

interface HomeProps {
    posts: Post[];
}

export default function Home({ posts }: HomeProps) {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="space-y-4">
                {posts.map((post) => (
                    <article key={post.slug} className="border p-4 rounded">
                        <Link href={`/posts/${post.slug}`}>
                            <h2 className="text-2xl font-semibold hover:text-blue-600">
                                {post.title}
                            </h2>
                        </Link>
                        <time className="text-gray-500">{post.date}</time>
                    </article>
                ))}
            </div>
        </div>
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