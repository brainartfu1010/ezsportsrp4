import { useState, useEffect } from 'react';
import { ServiceTeam, Team, TeamQueryParams } from '@/lib/services/service-team';

export function useTeams(initialParams?: TeamQueryParams) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TeamQueryParams>(initialParams || {});

  const fetchTeams = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceTeam.getAll(params);
      setTeams(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch teams');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTeam = async (teamData: Omit<Team, 'id'>) => {
    try {
      const newTeam = await ServiceTeam.create(teamData);
      setTeams(prevTeams => [...prevTeams, newTeam]);
      return newTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
      console.error(err);
      throw err;
    }
  };

  const updateTeam = async (teamId: string, teamData: Partial<Team>) => {
    try {
      const updatedTeam = await ServiceTeam.update(teamId, teamData);
      setTeams(prevTeams => 
        prevTeams.map(team => 
          team.id === teamId ? { ...team, ...updatedTeam } : team
        )
      );
      return updatedTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to update team');
      console.error(err);
      throw err;
    }
  };

  const deleteTeam = async (teamId: string) => {
    try {
      await ServiceTeam.delete(teamId);
      setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete team');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: TeamQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchTeams();
  }, [JSON.stringify(params)]);

  return {
    teams,
    isLoading,
    error,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
    updateParams
  };
}
