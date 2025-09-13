# PriceCheck Kuwait Website

A minimalist, one-page website for the PriceCheck Kuwait mobile app that helps users compare food delivery prices across all major delivery apps in Kuwait.

## 🎯 Project Overview

This website serves as a landing page to promote the PriceCheck Kuwait app and direct users to download it from official app stores. The design follows a grayscale theme to match the app's Phase 1 prototype aesthetic.

## ✨ Features

- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)
- **Grayscale Theme**: Clean, minimalist design with no colors as requested
- **Smooth Scrolling**: Enhanced navigation experience
- **Analytics Integration**: Google Analytics tracking for user behavior
- **Accessibility**: WCAG compliant with proper focus management
- **SEO Optimized**: Meta tags and structured data for search engines
- **Performance**: Fast loading with optimized assets

## 🚀 Getting Started

### Prerequisites

- A web server (Apache, Nginx, or any static file server)
- Modern web browser

### Installation

1. Clone or download the repository
2. Upload the `public` folder contents to your web server
3. Update the Google Analytics ID in `script.js` (replace `GA_MEASUREMENT_ID`)
4. Update app store links when the app is published

### Local Development

For local development, you can use any static file server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve public

# Using PHP
php -S localhost:8000 -t public
```

Then visit `http://localhost:8000` in your browser.

## 📁 File Structure

```
public/
├── index.html              # Main landing page
├── privacy-policy.html     # Privacy policy page
├── terms-of-service.html   # Terms of service page
├── styles.css             # Main stylesheet
├── script.js              # JavaScript functionality
├── images/
│   ├── logo.svg           # App logo
│   ├── app-mockup.svg     # App screenshot mockup
│   ├── app-store-badge.svg # App Store download badge
│   └── google-play-badge.svg # Google Play download badge
└── favicon.ico            # Website favicon
```

## 🎨 Design System

### Color Palette (Grayscale)
- **Primary**: #424242 (Dark Gray)
- **Secondary**: #616161 (Medium Gray)
- **Accent**: #757575 (Light Gray)
- **Background**: #FAFAFA (Very Light Gray)
- **Surface**: #FFFFFF (White)
- **Text**: #212121 (Dark Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: 700 weight, various sizes
- **Body Text**: 400 weight, 16px base size
- **Line Height**: 1.6 for optimal readability

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Customization

### Updating App Store Links

1. Open `script.js`
2. Update the `CONFIG` object:
   ```javascript
   const CONFIG = {
       APP_STORE_URL: 'https://apps.apple.com/app/pricecheck-kuwait/id123456789',
       GOOGLE_PLAY_URL: 'https://play.google.com/store/apps/details?id=com.pricecheckkuwait.app'
   };
   ```

### Updating Google Analytics

1. Open `script.js`
2. Replace `GA_MEASUREMENT_ID` with your actual Google Analytics ID
3. Update the gtag configuration in `index.html`

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `styles.css`
3. Update navigation links if needed

## 📊 Analytics Events

The website tracks the following events:

- `page_view`: When users visit the page
- `download_click`: When users click download buttons
- `javascript_error`: When JavaScript errors occur
- `page_performance`: Page load performance metrics

## ♿ Accessibility Features

- **Skip Links**: Quick navigation for screen readers
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt Text**: Descriptive alt text for all images
- **ARIA Labels**: Enhanced screen reader support

## 🚀 Deployment

### Static Hosting (Recommended)

The website is designed for static hosting and works with:

- **Netlify**: Drag and drop the `public` folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a `gh-pages` branch
- **AWS S3**: Upload files to an S3 bucket with static hosting
- **Cloudflare Pages**: Connect your repository

### Custom Domain

1. Update the `og:url` meta tag in `index.html`
2. Update any hardcoded URLs in the JavaScript
3. Configure your hosting provider for the custom domain

## 🔍 SEO Optimization

- **Meta Tags**: Complete Open Graph and Twitter Card tags
- **Structured Data**: JSON-LD structured data for rich snippets
- **Sitemap**: Create a sitemap.xml for search engines
- **Robots.txt**: Configure crawling permissions

## 🐛 Troubleshooting

### Common Issues

1. **Images not loading**: Check file paths and ensure images are in the correct directory
2. **Analytics not working**: Verify the Google Analytics ID is correct
3. **Mobile layout issues**: Test on actual devices, not just browser dev tools
4. **Slow loading**: Optimize images and enable gzip compression

### Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is proprietary to PriceCheck Kuwait. All rights reserved.

## 📞 Support

For technical support or questions about the website:

- **Email**: contact@pricecheckkuwait.com
- **Issues**: Create an issue in the project repository

## 🔄 Updates

### Version 1.0.0 (December 2024)
- Initial release
- Grayscale design implementation
- Responsive layout
- Analytics integration
- Privacy policy and terms of service pages

---

**Note**: This website is designed to complement the PriceCheck Kuwait mobile app. Ensure the app store links are updated once the mobile app is published.