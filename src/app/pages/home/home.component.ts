// src/app/pages/home/home.component.ts
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceCardComponent } from '../../components/service-card/service-card.component';
import { Service } from '../../shared/models/service.interface';
import { GsapAnimations } from '../../shared/animations/gsap-animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ServiceCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  
  services: Service[] = [
    {
      id: 'ai-solutions',
      title: 'AI Solutions',
      description: 'Transform your business with intelligent AI systems, conversational agents, and machine learning models that deliver competitive advantages.',
      fragmentId: 'ai-solutions',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8L56 20V44L32 56L8 44V20L32 8Z" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="32" cy="32" r="8" stroke="currentColor" stroke-width="2" fill="currentColor"/>
        <path d="M32 16V24M48 32H40M32 48V40M16 32H24" stroke="currentColor" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'cloud-infrastructure',
      title: 'Cloud Infrastructure',
      description: 'Seamless cloud migration, optimization, and management services that unlock the full potential of modern cloud platforms.',
      fragmentId: 'cloud-infrastructure',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <path d="M16 40C10.4772 40 6 35.5228 6 30C6 24.4772 10.4772 20 16 20C16.7286 20 17.4351 20.0913 18.1088 20.2637C20.0802 12.9393 26.7247 7.33334 34.6667 7.33334C44.4121 7.33334 52.3333 15.2546 52.3333 25C52.3333 25.4394 52.3095 25.8728 52.2633 26.2989C55.4779 27.5307 57.6667 30.5263 57.6667 34C57.6667 38.4183 54.0849 42 49.6667 42H16Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="20" cy="52" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="32" cy="52" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="44" cy="52" r="4" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'app-development',
      title: 'App Development',
      description: 'Cross-platform and native mobile applications that provide exceptional user experiences across all devices and platforms.',
      fragmentId: 'app-development',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <rect x="16" y="8" width="32" height="48" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="20" y="16" width="24" height="32" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="52" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <path d="M24 12H40" stroke="currentColor" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'software-engineering',
      title: 'Software Engineering',
      description: 'Complete software product development lifecycle from initial concept through deployment and ongoing maintenance.',
      fragmentId: 'software-engineering',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <rect x="8" y="16" width="48" height="32" rx="4" stroke="currentColor" stroke-width="2" fill="none"/>
        <rect x="12" y="20" width="40" height="20" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <path d="M20 28L24 32L20 36M28 36H36" stroke="white" stroke-width="2"/>
        <circle cx="16" cy="52" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="32" cy="52" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
        <circle cx="48" cy="52" r="2" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'data-intelligence',
      title: 'Data Intelligence',
      description: 'Advanced analytics and visualization solutions using cutting-edge platforms to transform raw data into actionable insights.',
      fragmentId: 'data-intelligence',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <rect x="8" y="32" width="8" height="24" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <rect x="20" y="24" width="8" height="32" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.8"/>
        <rect x="32" y="16" width="8" height="40" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor"/>
        <rect x="44" y="28" width="8" height="28" rx="2" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.6"/>
        <path d="M12 16L24 12L36 8L48 20" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'quality-assurance',
      title: 'Quality Assurance',
      description: 'Comprehensive testing and quality assurance processes to ensure your software meets the highest industry standards.',
      fragmentId: 'quality-assurance',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8L48 16V32C48 44 32 56 32 56C32 56 16 44 16 32V16L32 8Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <path d="M24 32L28 36L40 24" stroke="white" stroke-width="3"/>
      </svg>`
    }
  ];

  ngAfterViewInit(): void {
    // Initialize hero animation
    GsapAnimations.heroAnimation();
    
    // Initialize scroll-triggered animations
    GsapAnimations.initScrollAnimations();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  scrollToServices(): void {
    GsapAnimations.scrollToElement('#services', 1);
  }
}