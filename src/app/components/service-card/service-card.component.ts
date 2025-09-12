// src/app/components/service-card/service-card.component.ts
import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Service } from '../../shared/models/service.interface';
import { GsapAnimations } from '../../shared/animations/gsap-animations';

@Component({
  selector: 'app-service-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements AfterViewInit, OnDestroy {
  @Input() service!: Service;
  @ViewChild('cardElement', { static: false }) cardElement!: ElementRef;

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    this.setupCardAnimations();
  }

  ngOnDestroy(): void {
    // Cleanup GSAP animations if needed
  }

  private setupCardAnimations(): void {
    const cardEl = this.cardElement.nativeElement;
    
    // Setup hover animations
    cardEl.addEventListener('mouseenter', () => {
      GsapAnimations.cardHover(cardEl);
    });

    cardEl.addEventListener('mouseleave', () => {
      GsapAnimations.cardHoverOut(cardEl);
    });
  }

  onCardClick(): void {
    // Navigate to services page with fragment
    this.router.navigate(['/services'], { fragment: this.service.fragmentId });
  }
}