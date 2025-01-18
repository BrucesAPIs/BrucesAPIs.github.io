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

            <article className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <time className="text-gray-500 block mb-8">{post.date}</time>
                <div
                    className="prose lg:prose-xl"
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