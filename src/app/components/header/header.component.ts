// src/app/components/header/header.component.ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { GsapAnimations } from '../../shared/animations/gsap-animations';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  @ViewChild('headerElement', { static: false }) headerElement!: ElementRef;
  
  isMobileMenuOpen = false;
  private scrollListener?: () => void;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollEffect();
      this.animateHeader();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId) && this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  private setupScrollEffect(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.scrollListener = () => {
      const header = this.headerElement.nativeElement;
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', this.scrollListener, { passive: true });
  }

  private animateHeader(): void {
    GsapAnimations.fadeIn('.header-content', 1, 0.2);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  navigateToSection(): void {
    this.router.navigate(['/contact']);
    this.closeMobileMenu();
  }
}