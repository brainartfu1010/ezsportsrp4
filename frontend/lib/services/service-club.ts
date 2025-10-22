import { api } from './api';

export interface Club {
  id?: string;
  name: string;
  description?: string;
  location?: string;
  sportIds?: string[];
  sports?: {
    id: string;
    name: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ClubQueryParams {
  page?: number;
  limit?: number;
  sportId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export class ServiceClub {
  private static baseUrl = '/clubs';

  static async getAll(params?: ClubQueryParams): Promise<Club[]> {
    try {
      const queryParams = {
        page: params?.page || 1,
        limit: params?.limit || 10,
        ...(params?.sportId && { sportId: params.sportId }),
        ...(params?.search && { search: params.search }),
        ...(params?.sortBy && { sortBy: params.sortBy }),
        ...(params?.sortOrder && { sortOrder: params.sortOrder }),
      };

      return await api.get(this.baseUrl, { params: queryParams });
    } catch (error) {
      console.error('Error fetching clubs:', error);
      throw error;
    }
  }

  static async getById(id: string): Promise<Club> {
    try {
      return await api.get(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error fetching club with id ${id}:`, error);
      throw error;
    }
  }

  static async create(clubData: Omit<Club, 'id'>): Promise<Club> {
    try {
      return await api.post(this.baseUrl, clubData);
    } catch (error) {
      console.error('Error creating club:', error);
      throw error;
    }
  }

  static async update(id: string, clubData: Partial<Club>): Promise<Club> {
    try {
      return await api.patch(`${this.baseUrl}/${id}`, clubData);
    } catch (error) {
      console.error(`Error updating club with id ${id}:`, error);
      throw error;
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      console.error(`Error deleting club with id ${id}:`, error);
      throw error;
    }
  }

  // Additional utility methods can be added here
  static async getClubsBySport(sportId: string): Promise<Club[]> {
    try {
      return await this.getAll({ sportId });
    } catch (error) {
      console.error(`Error fetching clubs for sport ${sportId}:`, error);
      throw error;
    }
  }
}
