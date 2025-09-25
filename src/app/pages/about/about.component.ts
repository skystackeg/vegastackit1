// src/app/pages/about/about.component.ts
import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GsapAnimations } from '../../shared/animations/gsap-animations';
import { OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SEOService } from '../../shared/services/seo.service';

interface Value {
  id: string;
  title: string;
  description: string;
  icon: SafeHtml;
}

interface Stat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush  // ADD this line
})
export class AboutComponent implements OnInit, AfterViewInit,OnDestroy  {
private animationsInitialized = false;
private fragmentSubscription?: Subscription;
  values: Value[] = [];
  stats: Stat[] = [
    { number: '50+', label: 'Projects Completed' },
    { number: '95%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
    { number: '5+', label: 'Years Experience' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private seoService: SEOService
  ) {
    GsapAnimations.init();  // ADD this line
    this.values = [
      {
        id: 'innovation',
        title: 'Innovation',
        description: 'We embrace advanced technologies and creative approaches to solve complex challenges and push the boundaries of what\'s possible.',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <?xml version="1.0" encoding="iso-8859-1"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg fill="#000000" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 width="800px" height="800px" viewBox="0 0 571.2 571.2" xml:space="preserve"
	>
<g>
	<path d="M353.601,496.4c0,7.507-6.093,13.6-13.601,13.6H231.2c-7.507,0-13.6-6.093-13.6-13.6c0-7.508,6.093-13.601,13.6-13.601H340
		C347.508,482.8,353.601,488.893,353.601,496.4z M340,516.8H231.2c-8.949,0-15.878,8.644-12.899,18.034
		c1.795,5.664,7.527,9.166,13.471,9.166h0.204c7.854,0,15.035,4.44,18.55,11.465l0.143,0.286
		c4.74,9.465,14.416,15.449,25.004,15.449h19.856c10.588,0,20.264-5.984,24.997-15.449l0.143-0.286
		c3.516-7.024,10.696-11.465,18.55-11.465h0.204c5.943,0,11.676-3.502,13.471-9.166C355.878,525.443,348.949,516.8,340,516.8z
		 M285.601,81.6c7.507,0,13.6-6.093,13.6-13.6V13.6c0-7.507-6.093-13.6-13.6-13.6C278.093,0,272,6.093,272,13.6V68
		C272,75.507,278.093,81.6,285.601,81.6z M141.352,133.382c2.652,2.659,6.134,3.985,9.615,3.985c3.482,0,6.963-1.326,9.615-3.985
		c5.311-5.311,5.311-13.92,0-19.23l-38.467-38.468c-5.304-5.311-13.927-5.311-19.23,0c-5.311,5.311-5.311,13.919,0,19.23
		L141.352,133.382z M108.8,258.4c0-7.507-6.093-13.6-13.6-13.6H40.8c-7.507,0-13.6,6.093-13.6,13.6c0,7.507,6.093,13.6,13.6,13.6
		h54.4C102.708,272,108.8,265.907,108.8,258.4z M141.352,383.418l-38.467,38.468c-5.311,5.311-5.311,13.92,0,19.23
		c2.652,2.659,6.133,3.984,9.615,3.984c3.481,0,6.963-1.325,9.615-3.984l38.467-38.468c5.311-5.311,5.311-13.919,0-19.23
		C155.278,378.107,146.656,378.107,141.352,383.418z M429.849,383.418c-5.311-5.311-13.92-5.311-19.23,0s-5.311,13.92,0,19.23
		l38.468,38.468c2.658,2.659,6.134,3.984,9.615,3.984s6.956-1.325,9.615-3.984c5.311-5.311,5.311-13.92,0-19.23L429.849,383.418z
		 M530.4,244.8H476c-7.507,0-13.6,6.093-13.6,13.6c0,7.507,6.093,13.6,13.6,13.6h54.4c7.507,0,13.6-6.093,13.6-13.6
		C544,250.893,537.907,244.8,530.4,244.8z M420.233,137.367c3.481,0,6.956-1.326,9.615-3.985l38.468-38.468
		c5.311-5.311,5.311-13.919,0-19.23c-5.311-5.311-13.92-5.311-19.23,0l-38.468,38.468c-5.311,5.311-5.311,13.919,0,19.23
		C413.271,136.041,416.752,137.367,420.233,137.367z M353.601,462.4c0,7.507-6.093,13.6-13.601,13.6H231.2
		c-7.507,0-13.6-6.093-13.6-13.6c0-7.242,5.678-13.11,12.818-13.519C221.952,372.354,142.8,355.307,142.8,265.2
		c0-78.866,63.934-142.8,142.8-142.8c78.866,0,142.8,63.934,142.8,142.8c0,90.106-79.152,107.154-87.618,183.682
		C347.922,449.29,353.601,455.158,353.601,462.4z M254.259,160.548c-2.115-5.216-8.051-7.725-13.287-5.624
		c-34.755,14.083-61.104,44.186-70.482,80.525c-1.408,5.46,1.877,11.016,7.331,12.424c0.85,0.224,1.707,0.326,2.55,0.326
		c4.542,0,8.684-3.053,9.874-7.65c7.766-30.11,29.594-55.053,58.385-66.715C253.851,171.721,256.367,165.777,254.259,160.548z"/>
</g>
</svg>
        `)
      },
      {
        id: 'excellence',
        title: 'Excellence',
        description: 'We hold ourselves to the highest standards in every aspect of our work, delivering quality solutions that exceed expectations.',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
       <?xml version="1.0" encoding="iso-8859-1"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
	 viewBox="0 0 512 512" xml:space="preserve">
<g>
	<g>
		<path d="M226.932,399.948c-19.96,18.445-47.567,22.576-72.053,10.786c-8.852-4.263-16.322-10.149-22.17-17.199l-33.341,73.744
			c-1.517,3.355,0.177,5.884,0.975,6.815c0.798,0.93,3.039,2.989,6.585,2.003l24.272-6.756c2.766-0.769,5.562-1.14,8.319-1.14
			c11.631,0,22.578,6.583,27.849,17.492l10.962,22.685c1.601,3.315,4.604,3.646,5.854,3.621c1.226-0.016,4.242-0.414,5.758-3.769
			l53.033-117.304C237.148,392.603,231.63,395.606,226.932,399.948z"/>
	</g>
</g>
<g>
	<g>
		<path d="M412.631,467.279l-33.341-73.744c-5.848,7.051-13.318,12.937-22.17,17.199c-24.487,11.79-52.093,7.659-72.053-10.786
			c-4.698-4.342-10.216-7.345-16.045-9.022l53.033,117.304c1.517,3.356,4.533,3.753,5.758,3.769c1.25,0.025,4.253-0.306,5.854-3.621
			l10.962-22.685c5.27-10.909,16.218-17.492,27.849-17.492c2.757,0,5.554,0.371,8.319,1.14l24.272,6.756
			c3.546,0.987,5.788-1.072,6.585-2.003C412.454,473.162,414.148,470.633,412.631,467.279z"/>
	</g>
</g>
<g>
	<g>
		<path d="M438.821,207.791c-27.69-18.96-36.282-56.605-19.56-85.702c10.051-17.491,4.82-34.775-3.427-45.118
			c-8.248-10.34-23.936-19.285-43.223-13.38c-32.084,9.827-66.877-6.925-79.201-38.141C286.002,6.686,269.227,0,256,0
			c-13.227,0-30.002,6.686-37.41,25.451c-12.324,31.217-47.114,47.967-79.201,38.141c-19.289-5.904-34.974,3.039-43.223,13.38
			c-8.247,10.343-13.478,27.625-3.427,45.118c16.722,29.096,8.13,66.742-19.56,85.702c-16.646,11.399-19.431,29.24-16.489,42.136
			c2.942,12.896,13.194,27.761,33.137,30.808c33.174,5.068,57.248,35.256,54.809,68.727c-1.468,20.121,10.745,33.423,22.662,39.163
			c11.918,5.739,29.932,6.995,44.748-6.698c12.322-11.387,28.141-17.083,43.953-17.083c15.818,0,31.628,5.693,43.952,17.083
			c14.818,13.694,32.833,12.438,44.75,6.698c11.917-5.739,24.129-19.041,22.662-39.162c-2.439-33.471,21.635-63.659,54.809-68.728
			c19.943-3.047,30.193-17.913,33.137-30.808C458.252,237.03,455.465,219.189,438.821,207.791z M256,335.923
			c-72.575,0-131.619-59.044-131.619-131.619S183.424,72.684,256,72.684c72.576,0,131.619,59.044,131.619,131.619
			C387.618,276.878,328.575,335.923,256,335.923z"/>
	</g>
</g>
<g>
	<g>
		<path d="M255.999,97.225c-59.044,0-107.079,48.036-107.079,107.079c0,59.043,48.034,107.079,107.079,107.079
			s107.079-48.036,107.079-107.079S315.043,97.225,255.999,97.225z M310.874,193.922l-66.642,48.675
			c-2.115,1.545-4.653,2.362-7.237,2.362c-0.666,0-1.335-0.054-2.001-0.164c-3.249-0.537-6.147-2.358-8.041-5.054l-19.934-28.382
			c-3.895-5.547-2.556-13.2,2.989-17.095c5.546-3.895,13.198-2.557,17.094,2.989l12.75,18.154l56.548-41.302
			c5.473-3.995,13.15-2.803,17.146,2.671C317.543,182.248,316.346,189.924,310.874,193.922z"/>
	</g>
</g>
</svg>
        `)
      },
      {
        id: 'collaboration',
        title: 'Collaboration',
        description: 'We believe in the power of teamwork and partnership with our clients, working together to achieve extraordinary results.',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
       <?xml version='1.0' encoding='iso-8859-1'?>
<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg fill="#000000" height="800px" width="800px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297.23 297.23" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 297.23 297.23">
  <g>
    <path d="m149.416,61.02c14.139,0 25.642-11.503 25.642-25.642 0-14.139-11.503-25.642-25.642-25.642s-25.642,11.503-25.642,25.642c0,14.139 11.503,25.642 25.642,25.642z"/>
    <path d="m108.813,139.678h80.845c5.265,0 9.533-4.268 9.533-9.533v-35.25c0-9.758-6.271-18.41-15.544-21.448l-.043-.014-13.563-2.246c-1.154-0.355-2.388,0.256-2.803,1.395l-15.389,42.224c-0.888,2.436-4.333,2.436-5.221,0l-15.389-42.224c-0.335-0.92-1.203-1.496-2.133-1.496-0.22,0-0.445,0.033-0.667,0.101l-13.566,2.243c-9.349,3.115-15.595,11.782-15.595,21.582v35.133c0.002,5.265 4.27,9.533 9.535,9.533z"/>
    <path d="m50.188,208.836c14.139,0 25.642-11.503 25.642-25.642s-11.503-25.642-25.642-25.642c-14.139,0-25.642,11.503-25.642,25.642s11.503,25.642 25.642,25.642z"/>
    <path d="m84.368,221.262l-.043-.014-13.563-2.246c-1.154-0.355-2.388,0.256-2.803,1.395l-15.389,42.224c-0.888,2.436-4.333,2.436-5.221,0l-15.389-42.224c-0.335-0.92-1.203-1.496-2.133-1.496-0.22,0-0.445,0.033-0.667,0.101l-13.566,2.243c-9.348,3.115-15.594,11.782-15.594,21.582v35.133c0,5.265 4.268,9.533 9.533,9.533h80.845c5.265,0 9.533-4.268 9.533-9.533v-35.25c0-9.757-6.27-18.41-15.543-21.448z"/>
    <path d="m247.277,208.836c14.139,0 25.642-11.503 25.642-25.642s-11.503-25.642-25.642-25.642c-14.139,0-25.642,11.503-25.642,25.642s11.502,25.642 25.642,25.642z"/>
    <path d="m281.686,221.262l-.043-.014-13.563-2.246c-1.154-0.355-2.388,0.256-2.803,1.395l-15.389,42.224c-0.888,2.436-4.333,2.436-5.221,0l-15.389-42.224c-0.335-0.92-1.203-1.496-2.133-1.496-0.22,0-0.445,0.033-0.667,0.101l-13.566,2.243c-9.349,3.115-15.595,11.782-15.595,21.582v35.133c0,5.265 4.268,9.533 9.533,9.533h80.845c5.265,0 9.533-4.268 9.533-9.533v-35.25c0.002-9.757-6.269-18.41-15.542-21.448z"/>
    <path d="m157.872,146.894h-16.922v38.55l-39.834,39.834c3.606,4.936 5.679,10.989 5.679,17.431v0.822l42.616-42.617 40.975,40.976c0.205-6.527 2.528-12.62 6.417-17.515l-38.931-38.931v-38.55z"/>
    <path d="m155.539,71.055c-0.667-0.726-1.641-1.092-2.627-1.092h-7.353c-0.986,0-1.96,0.365-2.627,1.092-1.032,1.124-1.182,2.748-0.449,4.018l3.93,5.925-1.84,15.522 3.623,9.638c0.353,0.969 1.724,0.969 2.078,0l3.623-9.638-1.84-15.522 3.93-5.925c0.733-1.27 0.584-2.894-0.448-4.018z"/>
    <path d="m56.259,218.901c-0.667-0.726-1.641-1.092-2.627-1.092h-7.353c-0.986,0-1.96,0.365-2.627,1.092-1.032,1.124-1.182,2.748-0.449,4.018l3.93,5.925-1.84,15.521 3.623,9.638c0.353,0.969 1.724,0.969 2.077,0l3.623-9.638-1.84-15.521 3.93-5.925c0.734-1.269 0.585-2.893-0.447-4.018z"/>
    <path d="m253.577,218.901c-0.667-0.726-1.641-1.092-2.627-1.092h-7.353c-0.986,0-1.96,0.365-2.627,1.092-1.032,1.124-1.182,2.748-0.449,4.018l3.93,5.925-1.84,15.521 3.623,9.638c0.353,0.969 1.724,0.969 2.077,0l3.623-9.638-1.84-15.521 3.93-5.925c0.735-1.269 0.585-2.893-0.447-4.018z"/>
  </g>
</svg>
        `)
      },
      {
        id: 'integrity',
        title: 'Integrity',
        description: 'We act with honesty, transparency, and ethical responsibility in all our business relationships and decisions.',
        icon: this.sanitizer.bypassSecurityTrustHtml(`
        <?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 12.5V6.8C20 5.11984 20 4.27976 19.673 3.63803C19.3854 3.07354 18.9265 2.6146 18.362 2.32698C17.7202 2 16.8802 2 15.2 2H8.8C7.11984 2 6.27976 2 5.63803 2.32698C5.07354 2.6146 4.6146 3.07354 4.32698 3.63803C4 4.27976 4 5.11984 4 6.8V17.2C4 18.8802 4 19.7202 4.32698 20.362C4.6146 20.9265 5.07354 21.3854 5.63803 21.673C6.27976 22 7.11984 22 8.8 22H12M14 11H8M10 15H8M16 7H8M14.5 19L16.5 21L21 16.5" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        `)
      }
    ];
  }

ngOnInit(): void {
  this.seoService.updateSEO({
    title: 'About Us',
    description: 'Learn about Vega Sky\'s mission, values, and expertise in AI solutions, cloud infrastructure, and digital transformation. Meet our team of technology experts.',
    keywords: 'about Vega Sky, AI company, cloud experts, digital transformation team, technology consulting mission, values',
    ogTitle: 'About Vega Sky - AI & Technology Experts',
    ogDescription: 'Learn about Vega Sky\'s mission, values, and expertise in AI solutions, cloud infrastructure, and digital transformation. Meet our team of technology experts.',
    structuredData: this.seoService.getWebPageStructuredData(
      'About Vega Sky - AI & Technology Experts',
      'Learn about Vega Sky\'s mission, values, and expertise in AI solutions, cloud infrastructure, and digital transformation.',
      'https://vega-sky.com/about'
    )
  });

  this.fragmentSubscription = this.route.fragment.subscribe(fragment => {
    if (fragment) {
      // Wait longer for view initialization and animations
      setTimeout(() => {
        this.scrollToFragment(fragment);
      }, 100);
    }
  });
}

ngAfterViewInit(): void {
  // Initialize animations first
  if (typeof requestAnimationFrame !== 'undefined') {
    requestAnimationFrame(() => {
      this.initializeAnimations();

      // Then handle any existing fragment after animations are set up
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        setTimeout(() => {
          this.scrollToFragment(fragment);
        }, 800); // Wait for animations to complete
      }
    });
  } else {
    // Fallback for SSR
    setTimeout(() => {
      this.initializeAnimations();

      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        setTimeout(() => {
          this.scrollToFragment(fragment);
        }, 800);
      }
    }, 16);
  }
}
ngOnDestroy(): void {
  if (this.fragmentSubscription) {
    this.fragmentSubscription.unsubscribe();
  }
  GsapAnimations.cleanup();
}

private initializeAnimations(): void {
  if (this.animationsInitialized) return;

  // Only initialize animations in browser environment
  if (typeof document === 'undefined') return;

  try {
    const heroContent = document.querySelector('.about-hero__content');
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
private scrollToFragment(fragment: string): void {
  // Wait for animations and DOM to be fully ready, plus extra time since we start from top
  setTimeout(() => {
    const element = document.getElementById(fragment);
    if (element) {
      // Get header height for proper offset
      const header = document.querySelector('header') || document.querySelector('.header');

      // Use requestAnimationFrame to batch DOM reads
      if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
          const headerHeight = header ? header.offsetHeight : 80;

          // Use GSAP scrollToElement with fromTop=true for scroll-from-top behavior
          GsapAnimations.scrollToElement(`#${fragment}`, 0.8, headerHeight + 20, true)
            .catch(() => {
              // Fallback to native scrollIntoView if GSAP fails
              element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            });
        });
      } else {
        // Fallback for SSR
        const headerHeight = header ? header.offsetHeight : 80;
        GsapAnimations.scrollToElement(`#${fragment}`, 0.8, headerHeight + 20, true)
          .catch(() => {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          });
      }
    }
  }, 800); // Increased delay since we're scrolling from top
}

navigateToContact(): void {
  this.router.navigate(['/contact']);
}

navigateToServices(): void {
  this.router.navigate(['/services']);
}
}