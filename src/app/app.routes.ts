// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'services',
    loadComponent: () => import('./pages/services/services.component').then(m => m.ServicesComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
   {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
    {
    path: 'industries',
    loadComponent: () => import('./pages/industries/industries.component').then(m => m.IndustriesComponent)
  },
     {
    path: 'PrivacyandPolicy',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
  },
    {
    path: 'TermsandConditions',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions.component').then(m => m.TermsConditionsComponent)
  },

  {
    path: '**',
    redirectTo: ''
  }
];