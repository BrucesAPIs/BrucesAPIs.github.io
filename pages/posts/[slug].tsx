import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { getAllPosts, getPostBySlug, Post } from '../../utils/content';

interface PostPageProps {
    post: Post;
}

export default function PostPage({ post }: PostPageProps) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
                <meta name="description" content={post.content.slice(0, 160)} />
            </Head>

            {/* Floating RapidAPI Button */}
            {post.rapidapi_link && (
                <div className="fixed bottom-8 right-8 z-50">
                    <a
                        href={post.rapidapi_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
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

                {/* Content Section */}
                <div
                    className="prose lg:prose-xl mx-auto 
                        prose-headings:text-gray-800 
                        prose-p:text-gray-600 
                        prose-a:text-blue-600 
                        prose-strong:text-gray-800
                        prose-code:text-pink-600
                        prose-pre:bg-gray-50
                        prose-pre:shadow-md
                        prose-img:rounded-xl
                        prose-img:shadow-lg"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml || '' }}
                />
            </article>
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