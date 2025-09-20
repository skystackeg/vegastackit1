// src/app/pages/terms-conditions/terms-conditions.component.ts
import { Component, OnInit, AfterViewInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { GsapAnimations } from '../../shared/animations/gsap-animations';
import { SEOService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terms-conditions.component.html',
  styleUrl: './terms-conditions.component.scss'
})
export class TermsConditionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private router = inject(Router);
  private meta = inject(Meta);
  private title = inject(Title);
  private seoService = inject(SEOService);
  
  lastUpdated = 'December 15, 2024';
  effectiveDate = 'December 15, 2024';
  companyName = 'Vega Sky';
  contactEmail = 'info@vega-sky.com';
  websiteUrl = 'https://vega-sky.com';
  
  sections = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      anchor: 'acceptance'
    },
    {
      id: 'description',
      title: 'Service Description',
      anchor: 'description'
    },
    {
      id: 'user-accounts',
      title: 'User Accounts and Registration',
      anchor: 'user-accounts'
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use Policy',
      anchor: 'acceptable-use'
    },
    {
      id: 'ai-services',
      title: 'AI Services and Content',
      anchor: 'ai-services'
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      anchor: 'intellectual-property'
    },
    {
      id: 'payment-billing',
      title: 'Payment and Billing',
      anchor: 'payment-billing'
    },
    {
      id: 'data-privacy',
      title: 'Data Privacy and Protection',
      anchor: 'data-privacy'
    },
    {
      id: 'service-availability',
      title: 'Service Availability',
      anchor: 'service-availability'
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      anchor: 'limitation-liability'
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      anchor: 'indemnification'
    },
    {
      id: 'termination',
      title: 'Termination',
      anchor: 'termination'
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      anchor: 'governing-law'
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      anchor: 'dispute-resolution'
    },
    {
      id: 'modifications',
      title: 'Modifications to Terms',
      anchor: 'modifications'
    },
    {
      id: 'general-provisions',
      title: 'General Provisions',
      anchor: 'general-provisions'
    },
    {
      id: 'contact-information',
      title: 'Contact Information',
      anchor: 'contact-information'
    }
  ];

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Terms & Conditions',
      description: 'Read Vega Sky\'s terms and conditions governing the use of our AI solutions, cloud infrastructure, and technology services.',
      keywords: 'terms and conditions, terms of service, legal agreement, Vega Sky terms, service agreement',
      ogTitle: 'Terms & Conditions - Vega Sky',
      ogDescription: 'Read Vega Sky\'s terms and conditions governing the use of our AI solutions, cloud infrastructure, and technology services.',
      structuredData: this.seoService.getWebPageStructuredData(
        'Terms & Conditions - Vega Sky',
        'Read Vega Sky\'s terms and conditions governing the use of our AI solutions, cloud infrastructure, and technology services.',
        'https://vega-sky.com/TermsandConditions'
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
    this.title.setTitle('Terms & Conditions - Vega Sky | AI-Powered Digital Transformation');
    this.meta.updateTag({ 
      name: 'description', 
      content: 'Read Vega Sky\'s Terms & Conditions governing the use of our AI-powered digital transformation services and platform.' 
    });
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    
    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: 'Terms & Conditions - Vega Sky' });
    this.meta.updateTag({ 
      property: 'og:description', 
      content: 'Terms & Conditions governing the use of Vega Sky\'s AI services.' 
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

  navigateToPrivacy(): void {
    this.router.navigate(['/PrivacyandPolicy']);
  }



  onPrint(): void {
    window.print();
  }

  onShare(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Vega Sky Terms & Conditions',
        url: window.location.href,
      }).catch((error) => {
        if (typeof console !== 'undefined' && console.error) {
          console.error(error);
        }
      });
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        if (typeof console !== 'undefined' && console.log) {
          console.log('URL copied to clipboard');
        }
      });
    }
  }
}