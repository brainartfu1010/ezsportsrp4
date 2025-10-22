import { fetchData, createData, updateData, deleteData } from './api';

export interface PlayerPosition {
  id?: string;
  name: string;
  description?: string;
  sportId?: string;
  sport?: {
    id: string;
    name: string;
  };
  abbreviation?: string;
  responsibilities?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PlayerPositionQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServicePlayerPosition {
  private static baseUrl = '/player-positions';

  static async getAll(params?: PlayerPositionQueryParams): Promise<PlayerPosition[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.sportId && { sportId: params.sportId }),
        ...(params?.search && { search: params.search }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await fetchData(this.baseUrl, queryParams);
    } catch (error) {
      console.error('Error fetching player positions:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<PlayerPosition> {
    try {
      return await fetchData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching player position with id ${id}:`, error);
      throw error;
    }
  }

  static async create(playerPositionData: Omit<PlayerPosition, 'id'>): Promise<PlayerPosition> {
    try {
      return await createData(this.baseUrl, playerPositionData);
    } catch (error) {
      console.error('Error creating player position:', error);
      throw error;
    }
  }

  static async update(id: string, playerPositionData: Partial<PlayerPosition>): Promise<PlayerPosition> {
    try {
      return await updateData(`${this.baseUrl}/${id}`, playerPositionData);
    } catch (error) {
      console.error(`Error updating player position with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await deleteData(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting player position with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods
  static async getPlayerPositionsBySport(sportId: string): Promise<PlayerPosition[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching player positions for sport ${sportId}:`, error);
      throw error;
    }
  }
}
