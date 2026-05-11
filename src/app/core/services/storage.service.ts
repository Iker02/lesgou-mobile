import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private isCapacitor(): boolean {
    return (
      typeof window !== 'undefined' &&
      !!(window as any).Capacitor?.isNativePlatform?.()
    );
  }

  async set(key: string, value: unknown): Promise<void> {
    const data = JSON.stringify(value);
    if (this.isCapacitor()) {
      const { Preferences } = await import('@capacitor/preferences');
      await Preferences.set({ key, value: data });
    } else {
      localStorage.setItem(key, data);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      if (this.isCapacitor()) {
        const { Preferences } = await import('@capacitor/preferences');
        const { value } = await Preferences.get({ key });
        if (!value) return null;
        return JSON.parse(value) as T;
      } else {
        const value = localStorage.getItem(key);
        if (!value) return null;
        return JSON.parse(value) as T;
      }
    } catch {
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    if (this.isCapacitor()) {
      const { Preferences } = await import('@capacitor/preferences');
      await Preferences.remove({ key });
    } else {
      localStorage.removeItem(key);
    }
  }
}
