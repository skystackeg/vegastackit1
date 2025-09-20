// src/app/pages/contact/contact.component.ts
import { Component, AfterViewInit, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { GsapAnimations } from '../../shared/animations/gsap-animations';
import { ContactService, ContactFormData } from '../../shared/services/contact.service';
import { SEOService } from '../../shared/services/seo.service';

interface ContactInfo {
  title: string;
  value: string;
  href: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [ContactService],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  private animationsInitialized = false;
  private queryParamsSubscription?: Subscription;
  
  contactForm!: FormGroup;
  isSubmittingMessage = false;
  isSubmittingConsultation = false;
  isSubmitted = false;
  isConsultationRequest = false;
  submitError: string | null = null;
  validationErrors: string[] = [];
  contactInfo: ContactInfo[] = [];

  services = [
    'AI Solutions',
    'Cloud Infrastructure', 
    'App Development',
    'Software Engineering',
    'Data Intelligence',
    'Quality Assurance',
    'Consulting',
    'ERP Systems',
    'Digital Transformation',
    'Other'
  ];

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private contactService: ContactService,
    private cdr: ChangeDetectorRef,
    private seoService: SEOService
  ) {
    GsapAnimations.init();
    this.initializeForm();
    this.initializeContactInfo();
  }

  ngOnInit(): void {
    this.seoService.updateSEO({
      title: 'Contact Us',
      description: 'Get in touch with Vega Sky for AI solutions, cloud infrastructure, and digital transformation services. Contact our technology experts today.',
      keywords: 'contact Vega Sky, AI consultation, technology support, cloud services contact, digital transformation inquiry',
      ogTitle: 'Contact Vega Sky - AI & Technology Solutions',
      ogDescription: 'Get in touch with Vega Sky for AI solutions, cloud infrastructure, and digital transformation services. Contact our technology experts today.',
      structuredData: this.seoService.getWebPageStructuredData(
        'Contact Vega Sky - AI & Technology Solutions',
        'Get in touch with Vega Sky for AI solutions, cloud infrastructure, and digital transformation services. Contact our technology experts today.',
        'https://vega-sky.com/contact'
      )
    });

    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      if (params['service']) {
        this.contactForm.patchValue({
          service: params['service']
        });
        this.cdr.detectChanges();
      }
    });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      this.initializeAnimations();
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
    GsapAnimations.cleanup();
  }

  private initializeForm(): void {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      phone: [''],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  private initializeContactInfo(): void {
    this.contactInfo = [
      {
        title: 'Email Us',
        value: 'info@vega-sky.com',
        href: 'mailto:info@vega-sky.com',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M8 16L32 32L56 16" stroke="currentColor" stroke-width="2"/>
          </svg>
        `)
      },
      {
        title: 'Call Us',
        value: '+971 52 118 8488',
        href: 'tel:+971521188488',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M16 8C12.6863 8 10 10.6863 10 14V50C10 53.3137 12.6863 56 16 56H48C51.3137 56 54 53.3137 54 50V14C54 10.6863 51.3137 8 48 8H16Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M18 16H46M18 20H46M18 24H30" stroke="currentColor" stroke-width="2"/>
            <circle cx="32" cy="48" r="2" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          </svg>
        `)
      },
      {
        title: 'Visit Us',
        value: 'Dubai, Business Bay, Silver Tower, Office 2607',
        href: '#',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 64 64" fill="none">
            <path d="M32 8C38.6274 8 44 13.3726 44 20C44 26.6274 32 48 32 48C32 48 20 26.6274 20 20C20 13.3726 25.3726 8 32 8Z" stroke="currentColor" stroke-width="2" fill="none"/>
            <circle cx="32" cy="20" r="6" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          </svg>
        `)
      },
      {
        title: 'Business Hours',
        value: '24/7 Support Available',
        href: '#',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="24" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M32 16V32L44 44" stroke="currentColor" stroke-width="2"/>
            <circle cx="32" cy="32" r="2" stroke="currentColor" stroke-width="2" fill="currentColor"/>
          </svg>
        `)
      }
    ];
  }

  private initializeAnimations(): void {
    if (this.animationsInitialized) return;

    try {
      const heroContent = document.querySelector('.contact-hero__content');
      if (heroContent) {
        GsapAnimations.fadeIn(heroContent, 1, 0.2);
      }

      GsapAnimations.initScrollAnimations();
      this.animationsInitialized = true;
    } catch (error) {
      if (typeof console !== 'undefined' && console.warn) {
        console.warn('Animation initialization failed:', error);
      }
    }
  }

  refreshAnimations(): void {
    GsapAnimations.refresh();
  }

  onSubmit(): void {
    // Clear previous errors
    this.submitError = null;
    this.validationErrors = [];

    if (this.contactForm.valid && !this.isSubmittingMessage) {
      this.isSubmittingMessage = true;

      const formData: ContactFormData = this.contactForm.value;

      this.contactService.submitContactForm(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.isSubmitted = true;
            this.isConsultationRequest = false;
            this.contactForm.reset();

            // Reset success message after 8 seconds
            setTimeout(() => {
              this.isSubmitted = false;
              this.cdr.detectChanges();
            }, 8000);
          } else {
            this.submitError = response.error || 'Failed to send message. Please try again.';
          }
          this.isSubmittingMessage = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.submitError = error.message;
          this.isSubmittingMessage = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      // Collect all validation errors for the toaster
      this.validationErrors = this.collectAllValidationErrors();

      // Mark all fields as touched to show individual field errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });

      this.cdr.detectChanges();
    }
  }

  onConsultationRequest(): void {
    // Clear previous errors
    this.submitError = null;
    this.validationErrors = [];

    // Validate required fields for consultation
    const requiredFields = ['firstName', 'lastName', 'email', 'company', 'service'];
    let isValid = true;

    requiredFields.forEach(field => {
      const control = this.contactForm.get(field);
      if (!control?.value) {
        control?.markAsTouched();
        isValid = false;
      }
    });

    if (isValid && !this.isSubmittingConsultation) {
      this.isSubmittingConsultation = true;

      const formData: ContactFormData = {
        ...this.contactForm.value,
        message: this.contactForm.value.message || 'User requested a 30-minute consultation call.'
      };

      this.contactService.submitConsultationRequest(formData).subscribe({
        next: (response) => {
          if (response.success) {
            this.isSubmitted = true;
            this.isConsultationRequest = true;
            this.contactForm.reset();

            // Reset success message after 8 seconds
            setTimeout(() => {
              this.isSubmitted = false;
              this.isConsultationRequest = false;
              this.cdr.detectChanges();
            }, 8000);
          } else {
            this.submitError = response.error || 'Failed to send consultation request. Please try again.';
          }
          this.isSubmittingConsultation = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          this.submitError = error.message;
          this.isSubmittingConsultation = false;
          this.cdr.detectChanges();
        }
      });
    } else {
      // Collect validation errors for consultation request
      this.validationErrors = this.collectConsultationValidationErrors(requiredFields);

      requiredFields.forEach(field => {
        this.contactForm.get(field)?.markAsTouched();
      });
      this.cdr.detectChanges();
    }
  }

  dismissError(): void {
    this.submitError = null;
    this.validationErrors = [];
    this.cdr.detectChanges();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} is too short`;
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      company: 'Company',
      phone: 'Phone',
      service: 'Service',
      message: 'Message'
    };
    return displayNames[fieldName] || fieldName;
  }

  private collectAllValidationErrors(): string[] {
    const errors: string[] = [];
    const fieldsToCheck = ['firstName', 'lastName', 'email', 'company', 'service', 'message'];

    fieldsToCheck.forEach(fieldName => {
      const field = this.contactForm.get(fieldName);
      if (field && field.invalid) {
        const fieldDisplayName = this.getFieldDisplayName(fieldName);

        if (field.errors?.['required']) {
          errors.push(`${fieldDisplayName} is required`);
        } else if (field.errors?.['email']) {
          errors.push('Please enter a valid email address');
        } else if (field.errors?.['minlength']) {
          const requiredLength = field.errors['minlength'].requiredLength;
          const actualLength = field.errors['minlength'].actualLength;
          if (fieldName === 'message') {
            errors.push(`Message must be at least ${requiredLength} characters (currently ${actualLength})`);
          } else {
            errors.push(`${fieldDisplayName} is too short (minimum ${requiredLength} characters)`);
          }
        }
      }
    });

    if (errors.length === 0) {
      errors.push('Please check all required fields and try again');
    }

    return errors;
  }

  private collectConsultationValidationErrors(requiredFields: string[]): string[] {
    const errors: string[] = [];

    requiredFields.forEach(fieldName => {
      const field = this.contactForm.get(fieldName);
      if (field && field.invalid) {
        const fieldDisplayName = this.getFieldDisplayName(fieldName);

        if (field.errors?.['required'] || !field.value) {
          errors.push(`${fieldDisplayName} is required for consultation booking`);
        } else if (field.errors?.['email']) {
          errors.push('Please enter a valid email address for consultation booking');
        } else if (field.errors?.['minlength']) {
          const requiredLength = field.errors['minlength'].requiredLength;
          errors.push(`${fieldDisplayName} is too short (minimum ${requiredLength} characters)`);
        }
      }
    });

    if (errors.length === 0) {
      errors.push('Please complete all required fields to schedule a consultation');
    }

    return errors;
  }
}