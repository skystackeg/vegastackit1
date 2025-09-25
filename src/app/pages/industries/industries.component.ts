// src/app/pages/industries/industries.component.ts
import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GsapAnimations } from '../../shared/animations/gsap-animations';
import { Subscription } from 'rxjs';
import { SEOService } from '../../shared/services/seo.service';

interface Industry {
  id: string;
  title: string;
  description: string;
  challenges: string[];
  solutions: string[];
  caseStudy?: {
    title: string;
    description: string;
    results: string[];
  };
  icon: SafeHtml;
  fragmentId: string;
}

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndustriesComponent implements OnInit, AfterViewInit, OnDestroy {
  private fragmentSubscription?: Subscription;
  private animationsInitialized = false;

  industries: Industry[] = [];

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private router: Router,
    private seoService: SEOService
  ) {
    // Initialize GSAP early
    GsapAnimations.init();

    // Initialize industries with sanitized icons
    this.industries = [
    {
      id: 'healthcare',
      title: 'Healthcare & Life Sciences',
      description: 'Transforming patient care through AI-powered diagnostics, predictive analytics, and intelligent automation systems that improve outcomes while reducing costs.',
      challenges: [
        'Patient data management and security',
        'Diagnostic accuracy and speed',
        'Regulatory compliance requirements',
        'Interoperability between systems'
      ],
      solutions: [
        'AI-powered diagnostic tools',
        'Patient data analytics platforms',
        'Compliance automation systems',
        'Telemedicine integration solutions'
      ],
      caseStudy: {
        title: 'AI Diagnostic Platform for Regional Hospital',
        description: 'Implemented machine learning algorithms to improve diagnostic accuracy for medical imaging.',
        results: [
          '35% improvement in diagnostic accuracy',
          '50% reduction in analysis time',
          '95% physician adoption rate'
        ]
      },
      fragmentId: 'healthcare',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8C42.4934 8 51 16.5066 51 27V37C51 47.4934 42.4934 56 32 56C21.5066 56 13 47.4934 13 37V27C13 16.5066 21.5066 8 32 8Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M32 20V44M20 32H44" stroke="currentColor" stroke-width="3"/>
        <circle cx="32" cy="32" r="3" stroke="currentColor" stroke-width="2" fill="currentColor"/>
      </svg>`)
    },
    {
      id: 'fintech',
      title: 'Financial Technology',
      description: 'Revolutionizing financial services with secure, intelligent solutions for payments, lending, compliance, and risk management in the digital economy.',
      challenges: [
        'Regulatory compliance and reporting',
        'Fraud detection and prevention',
        'Real-time transaction processing',
        'Customer onboarding and KYC'
      ],
      solutions: [
        'AI-powered fraud detection systems',
        'Automated compliance monitoring',
        'Real-time payment processing',
        'Digital identity verification'
      ],
      caseStudy: {
        title: 'Fraud Prevention System for Digital Bank',
        description: 'Developed ML-based fraud detection system with real-time transaction monitoring.',
        results: [
          '85% reduction in false positives',
          '99.7% fraud detection accuracy',
          '$2.5M annual savings in fraud losses'
        ]
      },
      fragmentId: 'fintech',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 64 64" fill="none">
        <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="12" y="20" width="8" height="4" rx="1" stroke="currentColor" stroke-width="1" fill="currentColor"/>
        <path d="M12 28H28M12 32H24M12 36H20" stroke="currentColor" stroke-width="2"/>
        <circle cx="44" cy="32" r="8" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <path d="M40 32L42 34L48 28" stroke="white" stroke-width="2"/>
      </svg>`)
    },
    {
      id: 'ecommerce',
      title: 'E-Commerce & Retail',
      description: 'Enhancing customer experiences and optimizing operations through personalized recommendations, inventory management, and predictive analytics.',
      challenges: [
        'Personalized customer experiences',
        'Inventory optimization',
        'Supply chain visibility',
        'Omnichannel integration'
      ],
      solutions: [
        'AI recommendation engines',
        'Predictive inventory management',
        'Customer behavior analytics',
        'Omnichannel platform integration'
      ],
      caseStudy: {
        title: 'Personalization Engine for Fashion Retailer',
        description: 'Built AI-powered recommendation system to personalize shopping experiences.',
        results: [
          '45% increase in conversion rate',
          '30% higher average order value',
          '60% improvement in customer retention'
        ]
      },
      fragmentId: 'ecommerce',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 64 64" fill="none">
        <path d="M12 16H16L20 40H48L52 24H24" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="24" cy="48" r="4" stroke="currentColor" stroke-width="2" fill="currentColor"/>
        <circle cx="44" cy="48" r="4" stroke="currentColor" stroke-width="2" fill="currentColor"/>
        <path d="M20 40L48 40" stroke="currentColor" stroke-width="2"/>
      </svg>`)
    },
    {
      id: 'education',
      title: 'Education Technology',
      description: 'Empowering educational institutions with intelligent learning platforms, student analytics, and personalized education experiences.',
      challenges: [
        'Personalized learning paths',
        'Student performance tracking',
        'Administrative efficiency',
        'Remote learning capabilities'
      ],
      solutions: [
        'Adaptive learning platforms',
        'Student analytics dashboards',
        'Automated administrative systems',
        'Virtual classroom technologies'
      ],
      caseStudy: {
        title: 'Learning Analytics Platform for University',
        description: 'Developed comprehensive student success prediction and intervention system.',
        results: [
          '25% improvement in student retention',
          '40% faster identification of at-risk students',
          '90% faculty adoption of analytics tools'
        ]
      },
      fragmentId: 'education',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 64 64" fill="none">
        <path d="M8 32L32 16L56 32L32 48L8 32Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M32 16V48" stroke="currentColor" stroke-width="2"/>
        <path d="M16 36V44C16 44 24 48 32 48C40 48 48 44 48 44V36" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="32" cy="32" r="3" stroke="currentColor" stroke-width="2" fill="currentColor"/>
      </svg>`)
    },
    {
      id: 'manufacturing',
      title: 'Manufacturing & Industry 4.0',
      description: 'Optimizing production processes through IoT integration, predictive maintenance, and intelligent automation for the smart factory.',
      challenges: [
        'Production optimization',
        'Predictive maintenance',
        'Quality control automation',
        'Supply chain coordination'
      ],
      solutions: [
        'IoT sensor integration',
        'Predictive maintenance systems',
        'AI-powered quality control',
        'Digital twin implementations'
      ],
      caseStudy: {
        title: 'Predictive Maintenance for Auto Manufacturer',
        description: 'Implemented IoT and ML solution to predict equipment failures before they occur.',
        results: [
          '70% reduction in unplanned downtime',
          '40% decrease in maintenance costs',
          '15% increase in overall productivity'
        ]
      },
      fragmentId: 'manufacturing',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 64 64" fill="none">
        <rect x="8" y="24" width="48" height="24" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="20" cy="36" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="36" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.5"/>
        <circle cx="44" cy="36" r="6" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.3"/>
        <path d="M8 16H56L52 24H12L8 16Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.2"/>
      </svg>`)
    },
    {
      id: 'energy',
      title: 'Energy & Utilities',
      description: 'Modernizing energy infrastructure with smart grid technologies, renewable energy optimization, and intelligent resource management.',
      challenges: [
        'Grid optimization and stability',
        'Renewable energy integration',
        'Energy consumption forecasting',
        'Infrastructure monitoring'
      ],
      solutions: [
        'Smart grid management systems',
        'Energy forecasting algorithms',
        'IoT infrastructure monitoring',
        'Renewable energy optimization'
      ],
      caseStudy: {
        title: 'Smart Grid Optimization for Utility Company',
        description: 'Developed AI system to optimize energy distribution and predict demand patterns.',
        results: [
          '20% improvement in grid efficiency',
          '30% reduction in energy waste',
          '99.9% grid uptime achieved'
        ]
      },
      fragmentId: 'energy',
      icon: this.sanitizer.bypassSecurityTrustHtml(`<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8L40 28H28L36 56L28 36H40L32 8Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2" fill="none" opacity="0.3"/>
        <circle cx="32" cy="32" r="12" stroke="currentColor" stroke-width="2" fill="none" opacity="0.5"/>
      </svg>`)
    }
    ];
  }

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Industries We Serve',
      description: 'Discover how Vega Sky delivers specialized AI and technology solutions across healthcare, fintech, e-commerce, manufacturing, education, and retail industries.',
      keywords: 'healthcare technology, fintech solutions, e-commerce AI, manufacturing automation, education technology, retail innovation, industry solutions',
      ogTitle: 'Industries We Serve - Vega Sky Technology Solutions',
      ogDescription: 'Discover how Vega Sky delivers specialized AI and technology solutions across healthcare, fintech, e-commerce, manufacturing, education, and retail industries.',
      structuredData: this.seoService.getWebPageStructuredData(
        'Industries We Serve - Vega Sky Technology Solutions',
        'Discover how Vega Sky delivers specialized AI and technology solutions across healthcare, fintech, e-commerce, manufacturing, education, and retail industries.',
        'https://vega-sky.com/industries'
      )
    });

    // Subscribe to fragment changes
    this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
      if (fragment) {
        // Wait for view to be initialized
        if (typeof requestAnimationFrame !== 'undefined') {
          requestAnimationFrame(() => {
            this.scrollToFragment(fragment);
          });
        } else {
          setTimeout(() => {
            this.scrollToFragment(fragment);
          }, 16);
        }
      }
    });
  }

  ngAfterViewInit(): void {
    // Use requestAnimationFrame for better performance
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => {
        this.initializeAnimations();
      });
    } else {
      setTimeout(() => {
        this.initializeAnimations();
      }, 16);
    }
  }

  ngOnDestroy(): void {
    // Clean up subscriptions and animations
    if (this.fragmentSubscription) {
      this.fragmentSubscription.unsubscribe();
    }
    
    // Clean up GSAP animations
    GsapAnimations.cleanup();
  }

  private initializeAnimations(): void {
    if (this.animationsInitialized) return;

    // Only initialize animations in browser environment
    if (typeof document === 'undefined') return;

    // Animate hero content with error handling
    try {
      const heroContent = document.querySelector('.industries-hero__content');
      if (heroContent) {
        GsapAnimations.fadeIn(heroContent, 1, 0.2);
      }

      // Initialize scroll animations
      GsapAnimations.initScrollAnimations();
      
      this.animationsInitialized = true;
    } catch (error) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('Animation initialization failed:', error);
      }
    }
  }

  private scrollToFragment(fragment: string): void {
    // Wait for animations and DOM to be fully ready, plus extra time since we start from top
    setTimeout(() => {
      const element = document.getElementById(fragment);
      if (element) {
        // Get header height for proper offset
        const header = document.querySelector('header') || document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 80;

        // Use GSAP scrollToElement with fromTop=true for scroll-from-top behavior
        GsapAnimations.scrollToElement(`#${fragment}`, 0.8, headerHeight + 20, true)
          .catch(() => {
            // Fallback to native scrolling if GSAP fails
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerHeight - 20;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          });
      } else {
        // Fallback: try again after longer delay
        setTimeout(() => {
          const retryElement = document.getElementById(fragment);
          if (retryElement) {
            const header = document.querySelector('header') || document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 80;

            GsapAnimations.scrollToElement(`#${fragment}`, 0.8, headerHeight + 20, true);
          }
        }, 500);
      }
    }, 800); // Increased delay since we're scrolling from top
  }

  // Optional: Method to manually refresh animations if needed
  refreshAnimations(): void {
    GsapAnimations.refresh();
  }

  // Navigation method for Schedule Consultation button
  navigateToContact(): void {
    this.router.navigate(['/contact']);
  }
}