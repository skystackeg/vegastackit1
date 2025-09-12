// src/app/shared/models/service.interface.ts
import { SafeHtml } from '@angular/platform-browser';
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: SafeHtml; // SVG as string
  fragmentId: string;
  detailedDescription?: string;
}