// src/app/shared/animations/gsap-animations.ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export class GsapAnimations {
  // Fade in animation
  static fadeIn(element: string | Element, duration: number = 1, delay: number = 0) {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, delay, ease: "power2.out" }
    );
  }

  // Scale in animation
  static scaleIn(element: string | Element, duration: number = 0.8, delay: number = 0) {
    return gsap.fromTo(element,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration, delay, ease: "back.out(1.7)" }
    );
  }

  // Slide in from left
  static slideInLeft(element: string | Element, duration: number = 1, delay: number = 0) {
    return gsap.fromTo(element,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration, delay, ease: "power2.out" }
    );
  }

  // Slide in from right
  static slideInRight(element: string | Element, duration: number = 1, delay: number = 0) {
    return gsap.fromTo(element,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration, delay, ease: "power2.out" }
    );
  }

  // Stagger animation for multiple elements
  static staggerFadeIn(elements: string | Element[], duration: number = 1, stagger: number = 0.2) {
    return gsap.fromTo(elements,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, stagger, ease: "power2.out" }
    );
  }

  // Hero section animation
  static heroAnimation() {
    const tl = gsap.timeline();
    tl.fromTo('.hero-title', 
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.8"
    )
    .fromTo('.hero-cta',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.5"
    );
    
    return tl;
  }

  // Card hover animations
  static cardHover(element: string | Element) {
    gsap.to(element, {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  }

  static cardHoverOut(element: string | Element) {
    gsap.to(element, {
      y: 0,
      scale: 1,
      boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
      duration: 0.3,
      ease: "power2.out"
    });
  }

  // Scroll-triggered animations
  static initScrollAnimations() {
    // Animate sections on scroll
    gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
      gsap.fromTo(element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Animate service cards on scroll
    gsap.utils.toArray('.service-card').forEach((element: any, index) => {
      gsap.fromTo(element,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }

  // Smooth scroll to element
  static scrollToElement(target: string, duration: number = 1) {
    gsap.to(window, {
      duration,
      scrollTo: { y: target, offsetY: 80 },
      ease: "power2.inOut"
    });
  }
}