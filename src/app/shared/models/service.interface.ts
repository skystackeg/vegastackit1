// src/app/shared/models/service.interface.ts
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // SVG as string
  fragmentId: string;
  detailedDescription?: string;
}