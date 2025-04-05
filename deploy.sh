
#!/bin/bash

# Build the project
echo "Building the project..."
npm run build

# Output success message with deployment instructions
echo "✅ Build completed successfully!"
echo ""
echo "Your application is ready for deployment!"
echo ""
echo "To deploy on Netlify:"
echo "1. Sign up at netlify.com"
echo "2. Drag and drop the 'dist' folder to Netlify's dashboard, or"
echo "3. Connect your Git repository and configure the build settings"
echo ""
echo "To deploy on Vercel:"
echo "1. Install Vercel CLI: npm install -g vercel"
echo "2. Run 'vercel' in the project directory"
echo ""
echo "To deploy on GitHub Pages:"
echo "1. Install gh-pages: npm install -g gh-pages"
echo "2. Run: gh-pages -d dist"
echo ""
