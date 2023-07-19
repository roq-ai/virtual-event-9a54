import axios from 'axios';
import queryString from 'query-string';
import { AvailabilityInterface, AvailabilityGetQueryInterface } from 'interfaces/availability';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getAvailabilities = async (
  query?: AvailabilityGetQueryInterface,
): Promise<PaginatedInterface<AvailabilityInterface>> => {
  const response = await axios.get('/api/availabilities', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createAvailability = async (availability: AvailabilityInterface) => {
  const response = await axios.post('/api/availabilities', availability);
  return response.data;
};

export const updateAvailabilityById = async (id: string, availability: AvailabilityInterface) => {
  const response = await axios.put(`/api/availabilities/${id}`, availability);
  return response.data;
};

export const getAvailabilityById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/availabilities/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAvailabilityById = async (id: string) => {
  const response = await axios.delete(`/api/availabilities/${id}`);
  return response.data;
};
