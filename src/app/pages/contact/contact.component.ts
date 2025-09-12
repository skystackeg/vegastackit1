// src/app/pages/contact/contact.component.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GsapAnimations } from '../../shared/animations/gsap-animations';
import { ActivatedRoute } from '@angular/router';

interface ContactInfo {
  title: string;
  value: string;
  href: string;
  icon: SafeHtml;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, AfterViewInit {
  contactForm: FormGroup;
  isSubmitting = false;
  isSubmitted = false;
  contactInfo: ContactInfo[] = [];

  services = [
    'AI Solutions',
    'Cloud Infrastructure', 
    'App Development',
    'Software Engineering',
    'Data Intelligence',
    'Quality Assurance',
    'Consulting',
    'Other'
  ];

  constructor(private fb: FormBuilder, private sanitizer: DomSanitizer, private route: ActivatedRoute) {
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', Validators.required],
      phone: [''],
      service: ['', Validators.required],
      budget: [''],
      timeline: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.contactInfo = [
      {
        title: 'Email Us',
        value: 'hello@vegastack.com',
        href: 'mailto:hello@vegastack.com',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
          <svg viewBox="0 0 64 64" fill="none">
            <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
            <path d="M8 16L32 32L56 16" stroke="currentColor" stroke-width="2"/>
          </svg>
        `)
      },
      {
        title: 'Call Us',
        value: '+1 (555) 123-4567',
        href: 'tel:+15551234567',
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
        value: 'Remote-First Company',
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

  ngOnInit(): void {
    // Component initialization
    this.route.queryParams.subscribe(params => {
    if (params['service']) {
      this.contactForm.patchValue({
        service: params['service']
      });
    }
  });
  }

  ngAfterViewInit(): void {
    GsapAnimations.fadeIn('.contact-hero__content', 1, 0.2);
    GsapAnimations.initScrollAnimations();
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      // Simulate form submission
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.contactForm.reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          this.isSubmitted = false;
        }, 5000);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }
}