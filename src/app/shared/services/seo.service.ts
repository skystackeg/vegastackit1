import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonicalUrl?: string;
  structuredData?: any;
}

@Injectable({
  providedIn: 'root'
})
export class SEOService {
  private defaultTitle = 'Vega Sky - AI-Powered Technology Solutions';
  private defaultDescription = 'Transform your business with cutting-edge AI solutions, cloud infrastructure, and digital innovation services. Expert technology consulting for modern enterprises.';
  private defaultKeywords = 'AI solutions, cloud infrastructure, digital transformation, software development, technology consulting, machine learning, automation, enterprise solutions';
  private siteUrl = 'https://vega-sky.com'; // Update with your actual domain

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  updateSEO(data: SEOData): void {
    // Update title
    const title = data.title ? `${data.title} | Vega Sky` : this.defaultTitle;
    this.titleService.setTitle(title);

    // Update basic meta tags
    this.updateMetaTag('description', data.description || this.defaultDescription);
    this.updateMetaTag('keywords', data.keywords || this.defaultKeywords);
    this.updateMetaTag('author', 'Vega Sky');
    this.updateMetaTag('robots', 'index, follow');

    // Update Open Graph tags
    this.updateMetaTag('og:title', data.ogTitle || title, 'property');
    this.updateMetaTag('og:description', data.ogDescription || data.description || this.defaultDescription, 'property');
    this.updateMetaTag('og:image', data.ogImage || `${this.siteUrl}/assets/images/og-image.jpg`, 'property');
    this.updateMetaTag('og:url', data.ogUrl || (isPlatformBrowser(this.platformId) ? window.location.href : this.siteUrl), 'property');
    this.updateMetaTag('og:type', 'website', 'property');
    this.updateMetaTag('og:site_name', 'Vega Sky', 'property');

    // Update Twitter Card tags
    this.updateMetaTag('twitter:card', 'summary_large_image', 'name');
    this.updateMetaTag('twitter:title', data.ogTitle || title, 'name');
    this.updateMetaTag('twitter:description', data.ogDescription || data.description || this.defaultDescription, 'name');
    this.updateMetaTag('twitter:image', data.ogImage || `${this.siteUrl}/assets/images/og-image.jpg`, 'name');

    // Update canonical URL
    this.updateCanonicalUrl(data.canonicalUrl || (isPlatformBrowser(this.platformId) ? window.location.href : this.siteUrl));

    // Add structured data if provided
    if (data.structuredData) {
      this.addStructuredData(data.structuredData);
    }
  }

  private updateMetaTag(name: string, content: string, attribute: string = 'name'): void {
    const selector = `${attribute}="${name}"`;

    if (this.metaService.getTag(selector)) {
      this.metaService.updateTag({ [attribute]: name, content });
    } else {
      this.metaService.addTag({ [attribute]: name, content });
    }
  }

  private updateCanonicalUrl(url: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip DOM manipulation during SSR
    }

    // Remove existing canonical link
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    document.head.appendChild(link);
  }

  private addStructuredData(data: any): void {
    if (!isPlatformBrowser(this.platformId)) {
      return; // Skip DOM manipulation during SSR
    }

    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Default structured data for organization
  getOrganizationStructuredData(): any {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Vega Sky",
      "description": this.defaultDescription,
      "url": this.siteUrl,
      "logo": `${this.siteUrl}/assets/images/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+971-52-118-8488",
        "contactType": "Customer Service",
        "email": "info@vega-sky.com",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dubai",
        "addressRegion": "Business Bay",
        "addressCountry": "UAE",
        "streetAddress": "Silver Tower, Office 2607"
      },
      "sameAs": [
        "https://linkedin.com/company/vega-sky",
        "https://twitter.com/vegasky"
      ],
      "areaServed": "Worldwide",
      "knowsAbout": [
        "Artificial Intelligence",
        "Cloud Computing",
        "Digital Transformation",
        "Software Development",
        "Machine Learning",
        "Data Analytics"
      ]
    };
  }

  // Service page structured data
  getServiceStructuredData(service: any): any {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.title,
      "description": service.description,
      "provider": {
        "@type": "Organization",
        "name": "Vega Sky",
        "url": this.siteUrl
      },
      "serviceType": service.category || "Technology Consulting",
      "areaServed": "Worldwide"
    };
  }

  // Article/Page structured data
  getWebPageStructuredData(title: string, description: string, url: string): any {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": title,
      "description": description,
      "url": url,
      "publisher": {
        "@type": "Organization",
        "name": "Vega Sky",
        "url": this.siteUrl
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Vega Sky"
      }
    };
  }
}