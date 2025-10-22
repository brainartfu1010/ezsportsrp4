import { useState, useEffect } from 'react';
import { ServiceClub, Club, ClubQueryParams } from '@/lib/services/service-club';

export function useClubs(initialParams?: ClubQueryParams) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<ClubQueryParams>(initialParams || {});

  const fetchClubs = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceClub.getAll(params);
      setClubs(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clubs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createClub = async (clubData: Omit<Club, 'id'>) => {
    try {
      const newClub = await ServiceClub.create(clubData);
      setClubs(prevClubs => [...prevClubs, newClub]);
      return newClub;
    } catch (err: any) {
      setError(err.message || 'Failed to create club');
      console.error(err);
      throw err;
    }
  };

  const updateClub = async (clubId: string, clubData: Partial<Club>) => {
    try {
      const updatedClub = await ServiceClub.update(clubId, clubData);
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
  };

  const deleteClub = async (clubId: string) => {
    try {
      await ServiceClub.delete(clubId);
      setClubs(prevClubs => prevClubs.filter(club => club.id !== clubId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete club');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: ClubQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchClubs();
  }, [JSON.stringify(params)]);

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
