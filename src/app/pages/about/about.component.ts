// src/app/pages/about/about.component.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GsapAnimations } from '../../shared/animations/gsap-animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit, AfterViewInit {

  values = [
    {
      id: 'innovation',
      title: 'Innovation',
      description: 'We embrace advanced technologies and creative approaches to solve complex challenges and push the boundaries of what\'s possible.',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8L40 24L56 32L40 40L32 56L24 40L8 32L24 24L32 8Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="32" r="8" stroke="currentColor" stroke-width="2" fill="none"/>
      </svg>`
    },
    {
      id: 'excellence',
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards in every aspect of our work, delivering quality solutions that exceed expectations.',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 4L36.4721 18.5279L52 16L46.4721 28.4721L60 32L46.4721 35.5279L52 48L36.4721 45.4721L32 60L27.5279 45.4721L12 48L17.5279 35.5279L4 32L17.5279 28.4721L12 16L27.5279 18.5279L32 4Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
      </svg>`
    },
    {
      id: 'collaboration',
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and partnership with our clients, working together to achieve extraordinary results.',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <circle cx="20" cy="20" r="8" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="44" cy="20" r="8" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <circle cx="32" cy="44" r="8" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <path d="M28 20L36 20M20 28L28 36M36 28L44 36" stroke="currentColor" stroke-width="2"/>
      </svg>`
    },
    {
      id: 'integrity',
      title: 'Integrity',
      description: 'We act with honesty, transparency, and ethical responsibility in all our business relationships and decisions.',
      icon: `<svg viewBox="0 0 64 64" fill="none">
        <path d="M32 8L48 16V32C48 44 32 56 32 56C32 56 16 44 16 32V16L32 8Z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.7"/>
        <path d="M24 32L28 36L40 24" stroke="white" stroke-width="3"/>
      </svg>`
    }
  ];

  stats = [
    { number: '50+', label: 'Projects Completed' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
    { number: '5+', label: 'Years Experience' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          this.scrollToFragment(fragment);
        }, 100);
      }
    });
  }

  ngAfterViewInit(): void {
    GsapAnimations.fadeIn('.about-hero__content', 1, 0.2);
    GsapAnimations.initScrollAnimations();
  }

  private scrollToFragment(fragment: string): void {
    const element = document.getElementById(fragment);
    if (element) {
      GsapAnimations.scrollToElement(`#${fragment}`, 1);
    }
  }
}