// src/app/pages/privacy-policy/privacy-policy.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { GsapAnimations } from '../../shared/animations/gsap-animations';
import { SEOService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SEOService);
  
  lastUpdated = 'December 15, 2024';
  effectiveDate = 'December 15, 2024';
  companyName = 'Vega Sky';
  contactEmail = 'info@vega-sky.com';
  
  sections = [
    {
      id: 'information-collection',
      title: 'Information We Collect',
      anchor: 'information-collection'
    },
    {
      id: 'information-usage',
      title: 'How We Use Your Information',
      anchor: 'information-usage'
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      anchor: 'information-sharing'
    },
    {
      id: 'data-security',
      title: 'Data Security',
      anchor: 'data-security'
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      anchor: 'data-retention'
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      anchor: 'user-rights'
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking Technologies',
      anchor: 'cookies'
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      anchor: 'international-transfers'
    },
    {
      id: 'children-privacy',
      title: 'Children\'s Privacy',
      anchor: 'children-privacy'
    },
    {
      id: 'policy-updates',
      title: 'Updates to This Policy',
      anchor: 'policy-updates'
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      anchor: 'contact-us'
    }
  ];

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Privacy Policy',
      description: 'Read Vega Sky\'s privacy policy to understand how we collect, use, and protect your personal information when using our AI and technology services.',
      keywords: 'privacy policy, data protection, personal information, Vega Sky privacy, user data',
      ogTitle: 'Privacy Policy - Vega Sky',
      ogDescription: 'Read Vega Sky\'s privacy policy to understand how we collect, use, and protect your personal information when using our AI and technology services.',
      structuredData: this.seoService.getWebPageStructuredData(
        'Privacy Policy - Vega Sky',
        'Read Vega Sky\'s privacy policy to understand how we collect, use, and protect your personal information.',
        'https://vega-sky.com/PrivacyandPolicy'
      )
    });

    this.setMetaTags();
    GsapAnimations.init();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      GsapAnimations.initScrollAnimations();
      this.animatePageLoad();
    }, 100);
  }

  ngOnDestroy(): void {
    GsapAnimations.cleanup();
  }

  private setMetaTags(): void {
    this.title.setTitle('Privacy Policy - Vega Sky | AI-Powered Digital Transformation');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Learn how Vega Sky protects your privacy and handles your data. Our comprehensive privacy policy outlines our data collection, usage, and protection practices.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    
    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Privacy Policy - Vega Sky' });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Learn how Vega Sky protects your privacy and handles your data responsibly.' 
    });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
  }

  private animatePageLoad(): void {
    GsapAnimations.fadeIn('.policy-header', 0.8);
    GsapAnimations.fadeIn('.table-of-contents', 1, 0.2);
    GsapAnimations.staggerFadeIn('.policy-section', 0.6, 0.1);
  }

  scrollToSection(anchor: string): void {
    const element = document.getElementById(anchor);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }



  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }

  navigateToTerms(): void {
    this.router.navigate(['/TermsandConditions']);
  }


  onPrint(): void {
    window.print();
  }

  onShare(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Vega Sky Privacy Policy',
        url: window.location.href,
      }).catch((error) => {
        if (typeof console !== 'undefined' && console.error) {
          console.error(error);
        }
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        // You could show a toast notification here
        if (typeof console !== 'undefined' && console.log) {
          console.log('URL copied to clipboard');
        }
      });
    }
  }
}