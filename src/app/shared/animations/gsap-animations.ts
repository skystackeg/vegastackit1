// src/app/shared/animations/gsap-animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

export class GsapAnimations {
  private static initialized = false;
  private static scrollTriggers: ScrollTrigger[] = [];

  // Check if we're running in browser environment
  private static isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  // Safe requestAnimationFrame for SSR
  private static safeRequestAnimationFrame(callback: FrameRequestCallback): number {
    if (this.isBrowser() && typeof requestAnimationFrame !== 'undefined') {
      return requestAnimationFrame(callback);
    } else {
      // Fallback for SSR - use setTimeout
      return setTimeout(callback, 16) as any; // 16ms ≈ 60fps
    }
  }

  // Initialize GSAP with performance optimizations
  static init() {
    if (this.initialized || !this.isBrowser()) return;

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Configure GSAP for better performance
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
    });

    // Configure ScrollTrigger for better performance
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    // Set up global refresh on resize with debouncing
    let resizeTimer: NodeJS.Timeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    });

    this.initialized = true;
  }

  // Clear all ScrollTriggers
  static cleanup() {
    if (!this.isBrowser()) return;

    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];
    ScrollTrigger.killAll();
  }

  // Fade in animation with will-change optimization
  static fadeIn(element: string | Element, duration: number = 0.5, delay: number = 0) {
    if (!this.isBrowser()) return null;

    const targets = gsap.utils.toArray(element);
    if (!targets.length) return null;

    // Add will-change for better performance
    gsap.set(targets, { willChange: "transform, opacity" });

    const tl = gsap.fromTo(targets,
      {
        opacity: 0,
        y: -30,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          // Remove will-change after animation completes
          gsap.set(targets, { willChange: "auto" });
        }
      }
    );
    
    return tl;
  }

  // Scale in animation
  static scaleIn(element: string | Element, duration: number = 0.4, delay: number = 0) {
    if (!this.isBrowser()) return null;

    const targets = gsap.utils.toArray(element);
    if (!targets.length) return null;

    gsap.set(targets, { willChange: "transform, opacity" });

    return gsap.fromTo(targets,
      { 
        scale: 0.8, 
        opacity: 0,
        force3D: true 
      },
      { 
        scale: 1, 
        opacity: 1, 
        duration, 
        delay, 
        ease: "back.out(1.7)",
        force3D: true,
        onComplete: () => {
          gsap.set(targets, { willChange: "auto" });
        }
      }
    );
  }

  // Slide in from left
  static slideInLeft(element: string | Element, duration: number = 0.5, delay: number = 0) {
    if (!this.isBrowser()) return null;

    const targets = gsap.utils.toArray(element);
    if (!targets.length) return null;

    gsap.set(targets, { willChange: "transform, opacity" });

    return gsap.fromTo(targets,
      { 
        x: -100, 
        opacity: 0,
        force3D: true 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration, 
        delay, 
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          gsap.set(targets, { willChange: "auto" });
        }
      }
    );
  }

  // Slide in from right
  static slideInRight(element: string | Element, duration: number = 0.5, delay: number = 0) {
    if (!this.isBrowser()) return null;

    const targets = gsap.utils.toArray(element);
    if (!targets.length) return null;

    gsap.set(targets, { willChange: "transform, opacity" });

    return gsap.fromTo(targets,
      { 
        x: 100, 
        opacity: 0,
        force3D: true 
      },
      { 
        x: 0, 
        opacity: 1, 
        duration, 
        delay, 
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          gsap.set(targets, { willChange: "auto" });
        }
      }
    );
  }

  // Optimized stagger animation
  static staggerFadeIn(elements: string | Element[], duration: number = 0.5, stagger: number = 0.1) {
    if (!this.isBrowser()) return null;

    const targets = gsap.utils.toArray(elements);
    if (!targets.length) return null;

    gsap.set(targets, { willChange: "transform, opacity" });

    return gsap.fromTo(targets,
      {
        opacity: 0,
        y: -30,
        force3D: true
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger: {
          amount: stagger * (targets.length - 1),
          from: "start"
        },
        ease: "power2.out",
        force3D: true,
        onComplete: () => {
          gsap.set(targets, { willChange: "auto" });
        }
      }
    );
  }

  // Optimized hero animation
  static heroAnimation() {
    if (!this.isBrowser()) return null;

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');

    if (!heroTitle && !heroSubtitle && !heroCta) return null;

    const tl = gsap.timeline();
    
    if (heroTitle) {
      gsap.set(heroTitle, { willChange: "transform, opacity" });
      tl.fromTo(heroTitle,
        { opacity: 0, y: -50, force3D: true },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", force3D: true }
      );
    }

    if (heroSubtitle) {
      gsap.set(heroSubtitle, { willChange: "transform, opacity" });
      tl.fromTo(heroSubtitle,
        { opacity: 0, y: -30, force3D: true },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", force3D: true },
        "-=0.8"
      );
    }

    if (heroCta) {
      gsap.set(heroCta, { willChange: "transform, opacity" });
      tl.fromTo(heroCta,
        { opacity: 0, scale: 0.9, force3D: true },
        { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)", force3D: true },
        "-=0.5"
      );
    }

    tl.call(() => {
      gsap.set([heroTitle, heroSubtitle, heroCta].filter(Boolean), { willChange: "auto" });
    });
    
    return tl;
  }

  // Optimized card hover animations
  static cardHover(element: string | Element) {
    if (!this.isBrowser()) return;

    const target = gsap.utils.toArray(element)[0];
    if (!target) return;

    gsap.set(target, { willChange: "transform" });
    gsap.to(target, {
      y: -10,
      scale: 1.03,
      duration: 0.2,
      ease: "power2.out",
      force3D: true
    });
  }

  static cardHoverOut(element: string | Element) {
    if (!this.isBrowser()) return;

    const target = gsap.utils.toArray(element)[0];
    if (!target) return;

    gsap.to(target, {
      y: 0,
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
      force3D: true,
      onComplete: () => {
        gsap.set(target, { willChange: "auto" });
      }
    });
  }

  // Highly optimized scroll animations
  static initScrollAnimations() {
    if (!this.isBrowser()) return;

    this.init();

    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => this.setupScrollAnimations(), 100);
      });
    } else {
      setTimeout(() => this.setupScrollAnimations(), 100);
    }
  }

  private static setupScrollAnimations() {
    if (!this.isBrowser()) return;

    // Clear existing ScrollTriggers
    this.cleanup();

    // Animate sections on scroll with intersection observer fallback
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
      animateElements.forEach((element: Element) => {
        // Set initial state - animate from top to bottom
        gsap.set(element, {
          opacity: 0,
          y: -50,
          force3D: true,
          willChange: "transform, opacity"
        });

        const st = ScrollTrigger.create({
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          once: true, // Animation runs only once for better performance
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
              force3D: true,
              onComplete: () => {
                gsap.set(element, { willChange: "auto" });
              }
            });
          }
        });

        this.scrollTriggers.push(st);
      });
    }

    // Animate service cards with better performance
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
      serviceCards.forEach((element: Element, index: number) => {
        // Set initial state - animate from top to bottom
        gsap.set(element, {
          opacity: 0,
          y: -30,
          scale: 0.95,
          force3D: true,
          willChange: "transform, opacity"
        });

        const st = ScrollTrigger.create({
          trigger: element,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(element, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.4,
              delay: Math.min(index * 0.1, 0.5), // Cap the delay
              ease: "power2.out",
              force3D: true,
              onComplete: () => {
                gsap.set(element, { willChange: "auto" });
              }
            });
          }
        });

        this.scrollTriggers.push(st);
      });
    }

    // Manually refresh ScrollTrigger after setup
    this.safeRequestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // Cross-browser smooth scroll with consistent behavior
  static scrollToElement(target: string, duration: number = 0.5, offset: number = 80, fromTop: boolean = false) {
    if (!this.isBrowser()) return Promise.resolve();

    const element = document.querySelector(target);
    if (!element) return Promise.resolve();

    // Initialize GSAP if not already done
    this.init();

    // Get the target position with header offset
    const header = document.querySelector('header') || document.querySelector('.header');
    const headerHeight = header ? (header as HTMLElement).offsetHeight : 80;
    const targetPosition = (element as HTMLElement).offsetTop - headerHeight - offset;

    // Use GSAP for consistent cross-browser scrolling
    return new Promise<void>((resolve) => {
      try {
        if (fromTop) {
          // Create a timeline for precise control
          const tl = gsap.timeline();

          // First scroll to top instantly
          tl.set(window, { scrollTo: { y: 0 } });

          // Then scroll to target with animation
          tl.to(window, {
            duration: duration,
            scrollTo: {
              y: Math.max(0, targetPosition), // Ensure we don't scroll to negative values
              autoKill: false
            },
            ease: "power2.out",
            onComplete: resolve,
            onInterrupt: resolve
          }, 0.1); // Small delay to ensure top scroll is processed
        } else {
          // Direct scroll to target
          gsap.to(window, {
            duration: duration,
            scrollTo: {
              y: Math.max(0, targetPosition), // Ensure we don't scroll to negative values
              autoKill: false
            },
            ease: "power2.out",
            onComplete: resolve,
            onInterrupt: resolve
          });
        }
      } catch (error) {
        console.warn('GSAP scrollTo failed, using manual scroll implementation:', error);

        // Custom cross-browser scroll implementation as fallback
        this.manualScrollTo(targetPosition, duration, fromTop).then(resolve);
      }
    });
  }

  // Manual scroll implementation for maximum browser compatibility
  private static manualScrollTo(targetPosition: number, duration: number, fromTop: boolean): Promise<void> {
    return new Promise<void>((resolve) => {
      const startPosition = window.scrollY;
      const distance = Math.max(0, targetPosition) - (fromTop ? 0 : startPosition);
      const startTime = performance.now();

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function (power2.out equivalent)
        const easeOut = 1 - Math.pow(1 - progress, 2);

        const currentPosition = fromTop
          ? Math.max(0, targetPosition) * easeOut
          : startPosition + (distance * easeOut);

        window.scrollTo(0, currentPosition);

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        } else {
          resolve();
        }
      };

      if (fromTop) {
        // First scroll to top, then animate to target
        window.scrollTo(0, 0);
        setTimeout(() => {
          requestAnimationFrame(animateScroll);
        }, 50);
      } else {
        requestAnimationFrame(animateScroll);
      }
    });
  }

  // Refresh ScrollTriggers manually
  static refresh() {
    if (!this.isBrowser()) return;

    this.safeRequestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // Check if element is in viewport (optimized with batched reads)
  static isInViewport(element: Element): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}