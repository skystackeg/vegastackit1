// src/main.ts
import { bootstrapApplication, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

// Global error handlers (browser only)
if (typeof window !== 'undefined') {
  // Global error handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    if (typeof console !== 'undefined' && console.error) {
      console.error('Unhandled promise rejection:', event.reason);
    }
    event.preventDefault();
  });

  // Global error handler for JavaScript errors
  window.addEventListener('error', (event) => {
    if (typeof console !== 'undefined' && console.error) {
      console.error('Global error:', event.error);
    }
  });
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideClientHydration(withEventReplay())
  ]
}).catch(err => {
  if (typeof console !== 'undefined' && console.error) {
    console.error('Application bootstrap failed:', err);
  }
});