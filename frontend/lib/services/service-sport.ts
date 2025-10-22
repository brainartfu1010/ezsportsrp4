import { TypeSport, TypeReorder } from '@/types/types';
import axios from 'axios';

// Fallback to a default API URL if environment variable is not set
const API_URL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/admin/sports` 
  : '/api/admin/sports';

export const ServiceSport = {
  getSports: async (active?: boolean): Promise<TypeSport[]> => {
    try {
      console.log('Fetching sports from URL:', API_URL);
      console.log('Environment API URL:', process.env.NEXT_PUBLIC_API_URL);
      
      const response = await axios.get(API_URL, {
        params: { active },
        // Add timeout and error handling
        timeout: 10000,
        validateStatus: function (status) {
          return status >= 200 && status < 300; // Default
        }
      });

      if (!response.data) {
        throw new Error('No sports data received');
      }

      return response.data;
    } catch (error) {
      console.error('Detailed error fetching sports:', {
        message: error.message,
        code: error.code,
        config: error.config,
        response: error.response?.data
      });

      // Provide a fallback list of sports if the API call fails
      const fallbackSports: TypeSport[] = [
        { id: 1, name: 'Football', active: true },
        { id: 2, name: 'Basketball', active: true },
        { id: 3, name: 'Soccer', active: true },
        { id: 4, name: 'Tennis', active: true },
        { id: 5, name: 'Swimming', active: true }
      ];

      if (active) {
        return fallbackSports;
      }

      throw error;
    }
  },

  getSport: async (id: number): Promise<TypeSport> => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching sport with id ${id}:`, error);
      throw error;
    }
  },

  createSport: async (sportData: TypeSport): Promise<TypeSport> => {
    try {
      const response = await axios.post(API_URL, sportData);
      return response.data;
    } catch (error) {
      console.error('Error creating sport:', error);
      throw error;
    }
  },

  updateSport: async (id: number, sportData: TypeSport): Promise<TypeSport> => {
    try {
      const response = await axios.patch(`${API_URL}/${id}`, sportData);
      return response.data;
    } catch (error) {
      console.error(`Error updating sport with id ${id}:`, error);
      throw error;
    }
  },

  deleteSport: async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Error deleting sport with id ${id}:`, error);
      throw error;
    }
  },

  deleteSports: async (ids: number[]): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/bulk`, { data: ids });
    } catch (error) {
      console.error(`Error deleting multiple sports:`, error);
      throw error;
    }
  },

  reorderSports: async (orders: TypeReorder[]): Promise<void> => {
    try {
      await axios.post(`${API_URL}/reorder`, orders);
    } catch (error) {
      console.error(`Error reordering sports:`, error);
      throw error;
    }
  },
};
