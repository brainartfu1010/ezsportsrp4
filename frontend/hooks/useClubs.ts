import { useState, useEffect, useMemo, useCallback } from 'react';
import { ServiceClub, Club, ClubQueryParams } from '@/lib/services/service-club';

// Create a simple cache mechanism
const clubCache = new Map<string, { 
  data: Club[], 
  timestamp: number 
}>();

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

export function useClubs(initialParams?: ClubQueryParams) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ClubQueryParams>(initialParams || {});

  // Create a unique cache key based on parameters
  const cacheKey = useMemo(() => 
    `clubs_${params.sportId || 'null'}_${params.search || 'null'}`, 
    [params.sportId, params.search]
  );

  const fetchClubs = useCallback(async () => {
    try {
      // Check cache first
      const cachedData = clubCache.get(cacheKey);
      const currentTime = Date.now();

      if (cachedData && (currentTime - cachedData.timestamp) < CACHE_EXPIRATION_TIME) {
        setClubs(cachedData.data);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const data = await ServiceClub.getAll(params);
      
      // Update cache
      clubCache.set(cacheKey, {
        data,
        timestamp: currentTime
      });

      setClubs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clubs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [params, cacheKey]);

  const createClub = useCallback(async (clubData: Omit<Club, 'id'>) => {
    try {
      const newClub = await ServiceClub.create(clubData);
      
      // Invalidate cache for relevant keys
      const keysToInvalidate = Array.from(clubCache.keys()).filter(key => 
        key.includes(`clubs_${clubData.sportIds?.[0] || 'null'}`)
      );
      keysToInvalidate.forEach(key => clubCache.delete(key));

      setClubs(prevClubs => [...prevClubs, newClub]);
      return newClub;
    } catch (err: any) {
      setError(err.message || 'Failed to create club');
      console.error(err);
      throw err;
    }
  }, []);

  const updateClub = useCallback(async (clubId: string, clubData: Partial<Club>) => {
    try {
      const updatedClub = await ServiceClub.update(clubId, clubData);
      
      // Invalidate cache for relevant keys
      clubCache.clear(); // More aggressive cache invalidation

      setClubs(prevClubs => 
        prevClubs.map(club => 
          club.id === clubId ? { ...club, ...updatedClub } : club
        )
      );
      return updatedClub;
    } catch (err: any) {
      setError(err.message || 'Failed to update club');
      console.error(err);
      throw err;
    }
  }, []);

  const deleteClub = useCallback(async (clubId: string) => {
    try {
      await ServiceClub.delete(clubId);
      
      // Invalidate cache
      clubCache.clear(); // More aggressive cache invalidation

      setClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete club');
      console.error(err);
      throw err;
    }
  }, []);

  const updateParams = useCallback((newParams: ClubQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  }, []);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return {
    clubs,
    isLoading,
    error,
    fetchClubs,
    createClub,
    updateClub,
    deleteClub,
    updateParams
  };
}
