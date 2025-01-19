const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://brucesapis.github.io'; // Replace with your actual domain
const POSTS_DIR = path.join(process.cwd(), 'content/posts');

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

    // Process each post
    postFiles.forEach(file => {
        const postContent = JSON.parse(
            fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8')
        );

        // Keep the original filename casing
        const postSlug = file.replace('.json', '');
        sitemap += `  <url>
    <loc>${SITE_URL}/posts/${postSlug}</loc>
    <lastmod>${new Date(postContent.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
    });

    sitemap += '</urlset>';

    // Write sitemap to public directory
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap);
    console.log('Sitemap generated successfully!');
}

generateSitemap(); 