"use client";

export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": "https://flashot.vercel.app/#webapp",
        name: "Flashot",
        alternateName: "Flashot - Code to Image Converter",
        url: "https://flashot.vercel.app",
        description:
          "Transform your code snippets into beautiful, shareable images with syntax highlighting and customizable themes. Perfect for developers!",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        screenshot: "https://flashot.vercel.app/og-image.png",
        softwareVersion: "2.4.0",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          ratingCount: "100",
        },
        author: {
          "@type": "Person",
          name: "Tran Nguyen Thuong Truong",
          url: "https://github.com/thuongtruong109",
        },
        publisher: {
          "@type": "Organization",
          name: "Flashot",
          url: "https://flashot.vercel.app",
        },
        datePublished: "2025-08-24",
        dateModified: "2025-10-17",
        inLanguage: "en-US",
        potentialAction: {
          "@type": "UseAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://flashot.vercel.app/playground",
          },
        },
        featureList: [
          "Syntax highlighting for 25+ programming languages",
          "Customizable themes (light & dark modes)",
          "Export as PNG, JPG, WebP, AVIF",
          "Social media sharing",
          "Custom backgrounds and watermarks",
          "Code highlighting",
          "Adjustable font sizes and styles",
          "Line numbers",
          "Custom padding and borders",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://flashot.vercel.app/#website",
        url: "https://flashot.vercel.app",
        name: "Flashot",
        description:
          "Transform code snippets into beautiful images for social media and documentation",
        publisher: {
          "@id": "https://flashot.vercel.app/#organization",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://flashot.vercel.app/playground?code={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://flashot.vercel.app/#organization",
        name: "Flashot",
        url: "https://flashot.vercel.app",
        logo: {
          "@type": "ImageObject",
          url: "https://flashot.vercel.app/favicon.png",
        },
        sameAs: [
          "https://github.com/thuongtruong109/flashot",
          "https://www.npmjs.com/package/flashot",
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://flashot.vercel.app/#breadcrumb",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://flashot.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Playground",
            item: "https://flashot.vercel.app/playground",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Documentation",
            item: "https://flashot.vercel.app/docs",
          },
        ],
      },
      {
        "@type": "SoftwareSourceCode",
        "@id": "https://flashot.vercel.app/#sourcecode",
        codeRepository: "https://github.com/thuongtruong109/flashot",
        programmingLanguage: ["TypeScript", "JavaScript", "React", "Next.js"],
        runtimePlatform: "Node.js",
        targetProduct: {
          "@type": "SoftwareApplication",
          name: "Flashot",
          operatingSystem: "Any",
        },
        author: {
          "@type": "Person",
          name: "Tran Nguyen Thuong Truong",
          url: "https://github.com/thuongtruong109",
        },
        datePublished: "2025-08-24",
        license: "https://github.com/thuongtruong109/flashot/blob/main/LICENSE",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
