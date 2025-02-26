import './globals.css';

export const metadata = {
  title: 'Portfolio',
  description: 'My portfolio website',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#1e3a8a'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/assets/mypicture.png" />
        
        {/* Add caching headers for static assets */}
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
      </head>
      <body>{children}</body>
    </html>
  );
}
