import axios from 'axios';
import { AppointmentConnection  } from '@/utils/types';

export const getAppointmentsBefore = async (size: number, before: string): Promise<AppointmentConnection> => {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication failed. Please check your credentials.');
  }

  try {
    // Make an API request to authenticate the user
    const response = await axios.get(`/api/appointments?size=${size}&before=${before}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed. Please check your credentials.');
  }
};

export const getAppointmentsAfter = async (size: number, after: string): Promise<AppointmentConnection> => {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication failed. Please check your credentials.');
  }

  try {
    // Make an API request to authenticate the user
    const response = await axios.get(`/api/appointments?size=${size}&after=${after}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });

    return response.data;
  } catch (error) {
    throw new Error('Authentication failed. Please check your credentials.');
  }
};

export const getAvailability = async (date: string): Promise<[string]> => {

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication failed. Please check your credentials.');
  }

  try {
    // Make an API request to authenticate the user
    const response = await axios.get(`/api/availability/${date}`, {
      headers: {
        "Authorization": "Bearer " + token
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Authentication failed. Please check your credentials.');
  }
};



