import { useState, useEffect } from 'react';
import { TypeSport } from '@/types/types';
import { ServiceSport } from '@/lib/services/service-sport';

// Singleton-like cache for sports
class SportsCache {
  private static instance: SportsCache;
  private sports: TypeSport[] = [];
  private loading = false;
  private error: Error | null = null;

  private constructor() {}

  static getInstance(): SportsCache {
    if (!SportsCache.instance) {
      SportsCache.instance = new SportsCache();
    }
    return SportsCache.instance;
  }

  async fetchSports(): Promise<TypeSport[]> {
    if (this.sports.length > 0) {
      return this.sports;
    }

    if (this.loading) {
      // If already loading, wait for the existing request to complete
      return new Promise((resolve, reject) => {
        const checkLoaded = () => {
          if (this.sports.length > 0) {
            resolve(this.sports);
          } else if (this.error) {
            reject(this.error);
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });
    }

    this.loading = true;
    this.error = null;

    try {
      this.sports = await ServiceSport.getSports();
      this.loading = false;
      return this.sports;
    } catch (err) {
      this.error = err instanceof Error ? err : new Error('Failed to fetch sports');
      this.loading = false;
      throw this.error;
    }
  }

  getSports(): { sports: TypeSport[], loading: boolean, error: Error | null } {
    return {
      sports: this.sports,
      loading: this.loading,
      error: this.error
    };
  }
}

export function useSports() {
  const [state, setState] = useState(() => {
    const cache = SportsCache.getInstance();
    return cache.getSports();
  });

  useEffect(() => {
    const cache = SportsCache.getInstance();
    
    // Only fetch if no sports are loaded
    if (state.sports.length === 0 && !state.loading) {
      cache.fetchSports()
        .then(() => setState(cache.getSports()))
        .catch(() => setState(cache.getSports()));
    }
  }, []);

  return state;
}
