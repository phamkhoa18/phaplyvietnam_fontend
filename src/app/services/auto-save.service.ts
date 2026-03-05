import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface AutoSaveStatus {
  status: 'idle' | 'saving' | 'saved' | 'error';
  lastSaved: Date | null;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutoSaveService {
  private readonly STORAGE_PREFIX = 'autosave_';
  private readonly AUTO_SAVE_DELAY = 2000; // 2 seconds
  private readonly MAX_STORAGE_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

  private saveStatusSubject = new BehaviorSubject<AutoSaveStatus>({
    status: 'idle',
    lastSaved: null,
    message: ''
  });

  public saveStatus$: Observable<AutoSaveStatus> = this.saveStatusSubject.asObservable();

  private autoSaveSubject = new Subject<{ formName: string; data: any }>();

  constructor() {
    // Setup auto-save debounce
    this.autoSaveSubject.pipe(
      debounceTime(this.AUTO_SAVE_DELAY),
      distinctUntilChanged((prev, curr) => 
        JSON.stringify(prev.data) === JSON.stringify(curr.data)
      )
    ).subscribe(({ formName, data }) => {
      this.performSave(formName, data);
    });

    // Clean old data on init
    this.cleanOldData();
  }

  /**
   * Trigger auto-save for form data
   */
  triggerAutoSave(formName: string, formData: any): void {
    this.updateStatus('saving', 'Đang lưu...');
    this.autoSaveSubject.next({ formName, data: formData });
  }

  /**
   * Perform the actual save operation
   */
  private performSave(formName: string, formData: any): void {
    try {
      const dataToSave = {
        data: formData,
        timestamp: new Date().toISOString(),
        version: '1.0'
      };

      localStorage.setItem(
        this.getStorageKey(formName),
        JSON.stringify(dataToSave)
      );

      this.updateStatus('saved', 'Đã lưu tự động', new Date());
      
      // Auto reset to idle after 3 seconds
      setTimeout(() => {
        if (this.saveStatusSubject.value.status === 'saved') {
          this.updateStatus('idle', '');
        }
      }, 3000);

    } catch (error) {
      console.error('Auto-save error:', error);
      this.updateStatus('error', 'Lỗi khi lưu dữ liệu');
    }
  }

  /**
   * Restore saved form data
   */
  restoreFormData(formName: string): any | null {
    try {
      const key = this.getStorageKey(formName);
      const savedData = localStorage.getItem(key);

      if (!savedData) {
        return null;
      }

      const parsed = JSON.parse(savedData);
      
      // Check if data is too old
      const savedTime = new Date(parsed.timestamp).getTime();
      const now = Date.now();
      
      if (now - savedTime > this.MAX_STORAGE_AGE) {
        this.clearFormData(formName);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.error('Error restoring form data:', error);
      return null;
    }
  }

  /**
   * Clear saved form data
   */
  clearFormData(formName: string): void {
    localStorage.removeItem(this.getStorageKey(formName));
    this.updateStatus('idle', '');
  }

  /**
   * Check if form has saved data
   */
  hasSavedData(formName: string): boolean {
    return localStorage.getItem(this.getStorageKey(formName)) !== null;
  }

  /**
   * Get last saved timestamp
   */
  getLastSavedTime(formName: string): Date | null {
    try {
      const savedData = localStorage.getItem(this.getStorageKey(formName));
      if (savedData) {
        const parsed = JSON.parse(savedData);
        return new Date(parsed.timestamp);
      }
    } catch (error) {
      console.error('Error getting last saved time:', error);
    }
    return null;
  }

  /**
   * Get formatted time difference
   */
  getTimeSince(date: Date): string {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'vài giây trước';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} phút trước`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} giờ trước`;
    return `${Math.floor(seconds / 86400)} ngày trước`;
  }

  /**
   * Update save status
   */
  private updateStatus(
    status: 'idle' | 'saving' | 'saved' | 'error',
    message: string,
    lastSaved: Date | null = null
  ): void {
    this.saveStatusSubject.next({
      status,
      message,
      lastSaved: lastSaved || this.saveStatusSubject.value.lastSaved
    });
  }

  /**
   * Get storage key for form
   */
  private getStorageKey(formName: string): string {
    return `${this.STORAGE_PREFIX}${formName}`;
  }

  /**
   * Clean old saved data (older than MAX_STORAGE_AGE)
   */
  private cleanOldData(): void {
    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (key.startsWith(this.STORAGE_PREFIX)) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const parsed = JSON.parse(data);
              const savedTime = new Date(parsed.timestamp).getTime();
              
              if (now - savedTime > this.MAX_STORAGE_AGE) {
                localStorage.removeItem(key);
              }
            }
          } catch (error) {
            // If parsing fails, remove the item
            localStorage.removeItem(key);
          }
        }
      });
    } catch (error) {
      console.error('Error cleaning old data:', error);
    }
  }

  /**
   * Get all saved forms
   */
  getAllSavedForms(): string[] {
    const keys = Object.keys(localStorage);
    return keys
      .filter(key => key.startsWith(this.STORAGE_PREFIX))
      .map(key => key.replace(this.STORAGE_PREFIX, ''));
  }

  /**
   * Export form data as JSON (for backup)
   */
  exportFormData(formName: string): string | null {
    const data = this.restoreFormData(formName);
    return data ? JSON.stringify(data, null, 2) : null;
  }

  /**
   * Import form data from JSON
   */
  importFormData(formName: string, jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);
      this.performSave(formName, data);
      return true;
    } catch (error) {
      console.error('Error importing form data:', error);
      return false;
    }
  }
}
