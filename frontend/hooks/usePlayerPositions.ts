import { useState, useEffect } from 'react';
import { ServicePlayerPosition, PlayerPosition, PlayerPositionQueryParams } from '@/lib/services/service-player-position';

export function usePlayerPositions(initialParams?: PlayerPositionQueryParams) {
  const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<PlayerPositionQueryParams>(initialParams || {});

  const fetchPlayerPositions = async () => {
    try {
      setIsLoading(true);
      const data = await ServicePlayerPosition.getAll(params);
      setPlayerPositions(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch player positions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createPlayerPosition = async (playerPositionData: Omit<PlayerPosition, 'id'>) => {
    try {
      const newPlayerPosition = await ServicePlayerPosition.create(playerPositionData);
      setPlayerPositions(prevPlayerPositions => [...prevPlayerPositions, newPlayerPosition]);
      return newPlayerPosition;
    } catch (err: any) {
      setError(err.message || 'Failed to create player position');
      console.error(err);
      throw err;
    }
  };

  const updatePlayerPosition = async (playerPositionId: string, playerPositionData: Partial<PlayerPosition>) => {
    try {
      const updatedPlayerPosition = await ServicePlayerPosition.update(playerPositionId, playerPositionData);
      setPlayerPositions(prevPlayerPositions => 
        prevPlayerPositions.map(playerPosition => 
          playerPosition.id === playerPositionId ? { ...playerPosition, ...updatedPlayerPosition } : playerPosition
        )
      );
      return updatedPlayerPosition;
    } catch (err: any) {
      setError(err.message || 'Failed to update player position');
      console.error(err);
      throw err;
    }
  };

  const deletePlayerPosition = async (playerPositionId: string) => {
    try {
      await ServicePlayerPosition.delete(playerPositionId);
      setPlayerPositions(prevPlayerPositions => prevPlayerPositions.filter(playerPosition => playerPosition.id !== playerPositionId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete player position');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: PlayerPositionQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchPlayerPositions();
  }, [JSON.stringify(params)]);

  return {
    playerPositions,
    isLoading,
    error,
    fetchPlayerPositions,
    createPlayerPosition,
    updatePlayerPosition,
    deletePlayerPosition,
    updateParams
  };
}
