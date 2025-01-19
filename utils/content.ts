import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface Post {
    title: string;
    slug: string;
    date: string;
    content: string;
    contentHtml?: string;
    rapidapi_link: string;
}

export function getAllPosts(): Post[] {
    const postsDirectory = path.join(process.cwd(), 'content/posts');
    const filenames = fs.readdirSync(postsDirectory);

    const posts = filenames
        .filter(filename => filename.endsWith('.json'))
        .map(filename => {
            const filePath = path.join(postsDirectory, filename);
            const fileContent = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(fileContent) as Post;
        })
        .sort((a, b) => (new Date(b.date)).getTime() - (new Date(a.date)).getTime());

    return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const posts = getAllPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) return null;

    // Convert markdown to HTML
    const processedContent = await remark()
        .use(html)
        .process(post.content);

    return {
        ...post,
        contentHtml: processedContent.toString()
    };
} 