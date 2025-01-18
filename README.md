# BrucesAPIs.github.io

## Deployment Instructions

### For GitHub Pages (User/Organization Site)

1. Make sure your repository name exactly matches: `BrucesAPIs.github.io`

2. Build and deploy:
   ```bash
   # Build the project
   npm run build

   # Push the changes to GitHub
   git add .
   git commit -m "Update build"
   git push origin main
   ```

3. Configure GitHub Pages:
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: Select `main` and `/root` folder
   - Click Save

### For Custom Domain

1. Add your custom domain records:
   - Add an A record pointing to GitHub Pages IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or add a CNAME record pointing to `BrucesAPIs.github.io`

2. Configure custom domain in GitHub:
   - Go to repository Settings > Pages
   - Under "Custom domain", enter your domain
   - Click Save
   - Check "Enforce HTTPS" if desired

3. Create a `CNAME` file in your `public` folder containing your custom domain:
   ```
   yourdomain.com
   ```

4. Update `next.config.js`:
   ```javascript
   basePath: '',
   assetPrefix: '',
   ```

5. Rebuild and deploy following the steps above.

Note: DNS changes may take up to 48 hours to propagate fully.