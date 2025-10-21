import { TypeSport, CreateSportDTO, UpdateSportDTO, TypeReorder } from '../types';
import axios from 'axios';

// Use environment variable directly
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/admin/sports`;

export const ServiceSport = {
  getSports: async (active?: boolean): Promise<TypeSport[]> => {
    try {
      const response = await axios.get(API_URL, { 
        params: { active } 
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching sports:', error);
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

  createSport: async (sportData: CreateSportDTO): Promise<TypeSport> => {
    try {
      const response = await axios.post(API_URL, sportData);
      return response.data;
    } catch (error) {
      console.error('Error creating sport:', error);
      throw error;
    }
  },

  updateSport: async (id: number, sportData: UpdateSportDTO): Promise<TypeSport> => {
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
