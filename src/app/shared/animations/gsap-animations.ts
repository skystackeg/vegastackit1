// src/app/shared/animations/gsap-animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export class GsapAnimations {
  private static initialized = false;
  private static scrollTriggers: ScrollTrigger[] = [];

  // Initialize GSAP with performance optimizations
  static init() {
    if (this.initialized) return;
    
    gsap.registerPlugin(ScrollTrigger);
    
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
    this.scrollTriggers.forEach(st => st.kill());
    this.scrollTriggers = [];
    ScrollTrigger.killAll();
  }

  // Fade in animation with will-change optimization
  static fadeIn(element: string | Element, duration: number = 1, delay: number = 0) {
    const targets = gsap.utils.toArray(element);
    if (!targets.length) return null;

    // Add will-change for better performance
    gsap.set(targets, { willChange: "transform, opacity" });

    const tl = gsap.fromTo(targets, 
      { 
        opacity: 0, 
        y: 30,
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
  static scaleIn(element: string | Element, duration: number = 0.8, delay: number = 0) {
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
  static slideInLeft(element: string | Element, duration: number = 1, delay: number = 0) {
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
  static slideInRight(element: string | Element, duration: number = 1, delay: number = 0) {
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
  static staggerFadeIn(elements: string | Element[], duration: number = 1, stagger: number = 0.2) {
    const targets = gsap.utils.toArray(elements);
    if (!targets.length) return null;

    gsap.set(targets, { willChange: "transform, opacity" });

    return gsap.fromTo(targets,
      { 
        opacity: 0, 
        y: 30,
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
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');

    if (!heroTitle && !heroSubtitle && !heroCta) return null;

    const tl = gsap.timeline();
    
    if (heroTitle) {
      gsap.set(heroTitle, { willChange: "transform, opacity" });
      tl.fromTo(heroTitle, 
        { opacity: 0, y: 50, force3D: true },
        { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", force3D: true }
      );
    }

    if (heroSubtitle) {
      gsap.set(heroSubtitle, { willChange: "transform, opacity" });
      tl.fromTo(heroSubtitle,
        { opacity: 0, y: 30, force3D: true },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out", force3D: true },
        "-=0.8"
      );
    }

    if (heroCta) {
      gsap.set(heroCta, { willChange: "transform, opacity" });
      tl.fromTo(heroCta,
        { opacity: 0, scale: 0.9, force3D: true },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", force3D: true },
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
    const target = gsap.utils.toArray(element)[0];
    if (!target) return;

    gsap.set(target, { willChange: "transform" });
    gsap.to(target, {
      y: -10,
      scale: 1.03,
      duration: 0.3,
      ease: "power2.out",
      force3D: true
    });
  }

  static cardHoverOut(element: string | Element) {
    const target = gsap.utils.toArray(element)[0];
    if (!target) return;

    gsap.to(target, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
      force3D: true,
      onComplete: () => {
        gsap.set(target, { willChange: "auto" });
      }
    });
  }

  // Highly optimized scroll animations
  static initScrollAnimations() {
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
    // Clear existing ScrollTriggers
    this.cleanup();

    // Animate sections on scroll with intersection observer fallback
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
      animateElements.forEach((element: Element) => {
        // Set initial state
        gsap.set(element, { 
          opacity: 0, 
          y: 50, 
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
              duration: 1,
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
        // Set initial state
        gsap.set(element, { 
          opacity: 0, 
          y: 30, 
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
              duration: 0.8,
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
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // Enhanced smooth scroll
  static scrollToElement(target: string, duration: number = 1, offset: number = 80) {
    const element = document.querySelector(target);
    if (!element) return;

    // Use native scrollIntoView for better performance on mobile
    if (window.innerWidth <= 768) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
      return;
    }

    // Use GSAP for desktop
    gsap.to(window, {
      duration,
      scrollTo: { 
        y: target, 
        offsetY: offset,
        autoKill: false
      },
      ease: "power2.inOut"
    });
  }

  // Refresh ScrollTriggers manually
  static refresh() {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }

  // Check if element is in viewport (fallback)
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