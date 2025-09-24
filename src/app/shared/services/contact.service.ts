// src/app/services/contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  phone?: string;
  service: string;
  message: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  submitContactForm(formData: ContactFormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/contact`, formData)
      .pipe(
        timeout(30000), // 30 second timeout
        catchError(this.handleError)
      );
  }

  submitConsultationRequest(formData: ContactFormData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(`${this.apiUrl}/api/consultation`, formData)
      .pipe(
        timeout(30000), // 30 second timeout
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred. Please try again.';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Network error: ${error.error.message}`;
    } else {
      // Server-side error
      if (error.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment before trying again.';
      } else if (error.status === 400) {
        errorMessage = error.error?.error || 'Invalid form data. Please check your inputs.';
      } else if (error.status === 500) {
        errorMessage = 'Server error. Please try again later or contact support.';
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      }
    }

    if (typeof console !== 'undefined' && console.error) {
      console.error('Contact service error:', error);
    }
    return throwError(() => new Error(errorMessage));
  }
}