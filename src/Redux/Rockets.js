/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { GET_ROCKETS, SET_ROCKETS, ERROR_ROCKETS } from './types';

export const getRocketsAction = () => async (dispatch) => {
  const baseUrl = 'https://api.spacexdata.com/v3/rockets';
  try {
    dispatch({ type: GET_ROCKETS });
    const rockets = await axios.get(`${baseUrl}`);
    dispatch({ type: SET_ROCKETS, payload: rockets });
  } catch (error) {
    dispatch({ type: ERROR_ROCKETS, payload: error.message });
  }
};

export const GET_ROCKETS = 'space-travelers-hub/rockets/GET_ROCKETS';
export const SET_ROCKETS = 'space-travelers-hub/rockets/SET_ROCKETS';
export const ERROR_ROCKETS = 'space-travelers-hub/rockets/ERROR_ROCKETS';



// const rockets = () => {};

