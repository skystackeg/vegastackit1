// src/app/app.component.ts
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, NavigationEnd, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GsapAnimations } from './shared/animations/gsap-animations';
import { ViewportScroller } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'vega-stack';

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {}

  ngOnInit(): void {
    // Handle route changes - always scroll to top first
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Always scroll to top first, even with fragments
      // Individual components will handle scrolling down to fragments after a delay
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  ngAfterViewInit(): void {
    // Initialize global scroll animations after view init
    setTimeout(() => {
      GsapAnimations.initScrollAnimations();
    }, 100);
  }
}