import { useState, useEffect } from 'react';
import { ServiceCoachType, CoachType, CoachTypeQueryParams } from '@/lib/services/service-coach-type';

export function useCoachTypes(initialParams?: CoachTypeQueryParams) {
  const [coachTypes, setCoachTypes] = useState<CoachType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<CoachTypeQueryParams>(initialParams || {});

  const fetchCoachTypes = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceCoachType.getAll(params);
      setCoachTypes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch coach types');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCoachType = async (coachTypeData: Omit<CoachType, 'id'>) => {
    try {
      const newCoachType = await ServiceCoachType.create(coachTypeData);
      setCoachTypes(prevCoachTypes => [...prevCoachTypes, newCoachType]);
      return newCoachType;
    } catch (err: any) {
      setError(err.message || 'Failed to create coach type');
      console.error(err);
      throw err;
    }
  };

  const updateCoachType = async (coachTypeId: string, coachTypeData: Partial<CoachType>) => {
    try {
      const updatedCoachType = await ServiceCoachType.update(coachTypeId, coachTypeData);
      setCoachTypes(prevCoachTypes => 
        prevCoachTypes.map(coachType => 
          coachType.id === coachTypeId ? { ...coachType, ...updatedCoachType } : coachType
        )
      );
      return updatedCoachType;
    } catch (err: any) {
      setError(err.message || 'Failed to update coach type');
      console.error(err);
      throw err;
    }
  };

  const deleteCoachType = async (coachTypeId: string) => {
    try {
      await ServiceCoachType.delete(coachTypeId);
      setCoachTypes(prevCoachTypes => prevCoachTypes.filter(coachType => coachType.id !== coachTypeId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete coach type');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: CoachTypeQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchCoachTypes();
  }, [JSON.stringify(params)]);

  return {
    coachTypes,
    isLoading,
    error,
    fetchCoachTypes,
    createCoachType,
    updateCoachType,
    deleteCoachType,
    updateParams
  };
}
