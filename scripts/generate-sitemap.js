const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://brucesapis.github.io'; // Replace with your actual domain
const POSTS_DIR = path.join(process.cwd(), 'content/posts');
const RAPIDAPI_PROFILE = 'https://rapidapi.com/user/brucewwx';

function isValidSlug(slug) {
    // 只允许小写字母、数字和连字符
    // 不能以连字符开始或结束
    // 不能有连续的连字符
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
}

function generateSitemap() {
    // Read all JSON files from posts directory
    const postFiles = fs.readdirSync(POSTS_DIR)
        .filter(file => file.endsWith('.json'));

    // XML header and urlset opening tag
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add homepage
    sitemap += `  <url>
    <loc>${SITE_URL}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`;

    // Add RapidAPI profile
    sitemap += `  <url>
    <loc>${RAPIDAPI_PROFILE}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

    // Process each post
    postFiles.forEach(file => {
        const postContent = JSON.parse(
            fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
        );

        // 验证 slug
        if (!isValidSlug(postContent.slug)) {
            throw new Error(`Invalid slug format in file ${file}. Slug "${postContent.slug}" must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen.`);
        }

        // Check if rapidapi_link exists
        if (!postContent.rapidapi_link) {
            throw new Error(`Missing required property 'rapidapi_link' in file ${file}`);
        }

        // Add main post URL
        sitemap += `  <url>
    <loc>${SITE_URL}/posts/${postContent.slug}</loc>
    <lastmod>${new Date(postContent.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

        // Add RapidAPI link URL
        sitemap += `  <url>
    <loc>${postContent.rapidapi_link}</loc>
    <lastmod>${new Date(postContent.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
    });

    sitemap += '</urlset>';

    // Write sitemap to public directory AND out directory
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);

    // Ensure out directory exists
    const outDir = path.join(process.cwd(), 'out');
    if (fs.existsSync(outDir)) {
        fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
    }

    console.log('Sitemap generated successfully!');
}

generateSitemap(); 