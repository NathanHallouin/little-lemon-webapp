import {
  isRouteErrorResponse,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";
import NavBar from "./components/root/NavBar"
import Footer from "./components/root/Footer"
import ReduxProvider from "./providers/ReduxProvider"
import { LoadingProvider } from "./providers/LoadingProvider"
import type { Route } from "./+types/root";
import "./app.css";

/**
 * External links configuration for the application
 * @returns Array of link objects for the document head
 */
export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
  { rel: "apple-touch-icon", sizes: "180x180", href: "/logo.jpg" },
  { rel: "icon", type: "image/png", sizes: "32x32", href: "/logo.jpg" },
  { rel: "icon", type: "image/png", sizes: "16x16", href: "/logo.jpg" },
  { rel: "manifest", href: "/site.webmanifest" },
];

/**
 * Meta tags configuration for SEO and social media
 * @param {} - Route meta arguments
 * @returns Array of meta tag objects
 */
export function meta({}: Route.MetaArgs) {
  return [
    { title: "Little Lemon - Mediterranean Restaurant in Orléans" },
    { name: "description", content: "Authentic Mediterranean restaurant in Orléans. Fresh cuisine, authentic flavors and warm atmosphere." },
    { name: "keywords", content: "restaurant, mediterranean, orleans, cuisine, gastronomy, little lemon" },
    { name: "author", content: "Little Lemon Restaurant" },
    { name: "robots", content: "index, follow" },
    { name: "language", content: "en" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "charset", content: "utf-8" },
    
    // Accessibility and W3C compliance
    { name: "accessibility", content: "WCAG 2.1 AA compliant" },
    { name: "color-scheme", content: "light dark" },
    { name: "prefer-color-scheme", content: "light" },
    
    // Open Graph - Global
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: "Little Lemon" },
    { property: "og:locale", content: "en_US" },
    { property: "og:image", content: "https://littlelemon.com/logo.jpg" },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    
    // Twitter Card - Global
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "https://littlelemon.com/logo.jpg" },
    
    // Additional Meta - Global
    { name: "theme-color", content: "#495e57" },
    { name: "msapplication-TileColor", content: "#495e57" },
    { name: "apple-mobile-web-app-capable", content: "yes" },
    { name: "apple-mobile-web-app-status-bar-style", content: "default" },
  ];
}

/**
 * Main layout component that wraps the entire application
 * @param children - React children to render
 * @returns HTML structure with proper accessibility features
 */
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#495e57" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#495e57] text-white px-4 py-2 rounded z-50">
          Skip to main content
        </a>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function DynamicTitle() {
  const location = useLocation();
  useEffect(() => {
    let title = "Little Lemon - Mediterranean Restaurant in Orléans";
    switch (location.pathname) {
      case "/about":
        title = "About - Little Lemon Restaurant";
        break;
      case "/menu":
        title = "Menu - Little Lemon Restaurant";
        break;
      case "/order":
        title = "Order Online - Little Lemon Restaurant";
        break;
      case "/reservations":
        title = "Book a Table - Little Lemon Restaurant";
        break;
      case "/":
        title = "Little Lemon - Mediterranean Restaurant in Orléans";
        break;
      default:
        title = "Little Lemon - Mediterranean Restaurant in Orléans";
    }
    document.title = title;
  }, [location.pathname]);
  return null;
}

/**
 * Main application component that provides the overall structure
 * @returns Application layout with navigation, main content, and footer
 */
export default function App() {
  return (
    <LoadingProvider>
      <ReduxProvider>
        <DynamicTitle />
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
            <Outlet />
          </main>
          <Footer />
        </div>
      </ReduxProvider>
    </LoadingProvider>
  );
}

/**
 * Error boundary component that handles application errors gracefully
 * @param error - The error that occurred
 * @returns Error display with appropriate messaging and debugging information
 */
export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto" role="main">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto" role="log" aria-label="Error details">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
