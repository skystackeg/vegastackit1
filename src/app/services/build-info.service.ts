import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BuildInfoService {

  /**
   * Get the current build timestamp
   */
  getBuildTimestamp(): number {
    return environment.buildTimestamp;
  }

  /**
   * Get the build version
   */
  getVersion(): string {
    return environment.version;
  }

  /**
   * Get the cache buster string
   */
  getCacheBuster(): string {
    return environment.cacheBuster;
  }

  /**
   * Get build date as a formatted string
   */
  getBuildDate(): string {
    return new Date(environment.buildTimestamp).toISOString();
  }

  /**
   * Get all build information
   */
  getBuildInfo() {
    return {
      timestamp: environment.buildTimestamp,
      version: environment.version,
      cacheBuster: environment.cacheBuster,
      buildDate: this.getBuildDate(),
      production: environment.production
    };
  }

  /**
   * Generate a cache-busted URL by appending the cache buster
   */
  getCacheBustedUrl(url: string): string {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${environment.cacheBuster}`;
  }

  /**
   * Log build information to console (useful for debugging)
   */
  logBuildInfo(): void {
    const info = this.getBuildInfo();
    console.group('🔨 Build Information');
    console.log('Version:', info.version);
    console.log('Build Date:', info.buildDate);
    console.log('Cache Buster:', info.cacheBuster);
    console.log('Production:', info.production);
    console.groupEnd();
  }
}