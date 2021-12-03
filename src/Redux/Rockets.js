/* eslint-disable no-case-declarations */
/* eslint-disable import/extensions */
import axios from "axios";

const GET_ROCKETS = "space-travelers-hub/rockets/GET_ROCKETS";
const SET_ROCKETS = "space-travelers-hub/rockets/SET_ROCKETS";
const ERROR_ROCKETS = "space-travelers-hub/rockets/ERROR_ROCKETS";
const CANCEL_RESERVES = "space-travelers-hub/rockets/CANCEL_RESERVES";
const SET_RESERVES = "space-travelers-hub/rockets/SET_RESERVES";

const LOAD_DRAGONS = "LOAD_DRAGONS";
const RESERVE_DRAGONS = "RESERVE_DRAGONS";
const CANCEL_RESERVATION = "CANCEL_RESERVATION";
const LOAD_FAILED = "LOAD_FAILED";
const url = "https://api.spacexdata.com/v3/dragons";

const JOIN_MISSION = "space/missions/JOINMISSION";
const LOAD_MISSIONS = "space/missions/LOADMISSIONS";
const LEAVE_MISSION = "spacex-hub/missions/LEAVE_MISSION";

const initialState = { rockets: null };
export function rocketsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ROCKETS:
      return state;
    case SET_ROCKETS:
      return { ...state, rockets: action.payload };
    case SET_RESERVES:
      const newState = state.rockets.map((rocket) => {
        if (rocket.id !== action.payload) {
          return rocket;
        }
        return { ...rocket, reserved: true };
      });
      return { ...state, rockets: newState };
    case CANCEL_RESERVES:
      const newRocketsState = state.rockets.map((rocket) => {
        if (rocket.id !== action.payload) {
          return rocket;
        }
        return { ...rocket, reserved: false };
      });
      return { ...state, rockets: newRocketsState };

    default:
      return state;
  }
}

export const getRocketsAction = () => async (dispatch) => {
  const baseUrl = "https://api.spacexdata.com/v3/rockets";
  try {
    dispatch({ type: GET_ROCKETS });
    const newRocketList = [];
    const { data } = await axios.get(`${baseUrl}`);
    data.map((item) => {
      const rocketObj = {
        id: item.id,
        rocket_name: item.rocket_name,
        description: item.description,
        flickr_images: item.flickr_images[0],
      };
      return newRocketList.push(rocketObj);
    });
    dispatch({ type: SET_ROCKETS, payload: newRocketList });
  } catch (error) {
    dispatch({ type: ERROR_ROCKETS, payload: error.message });
  }
};

export const setReserveAction = (rocketId) => (dispatch) => {
  try {
    dispatch({ type: SET_RESERVES, payload: rocketId });
  } catch (error) {
    dispatch({ type: ERROR_ROCKETS, payload: error.message });
  }
};

export const cancelReservationAction = (rocketId) => (dispatch) => {
  try {
    dispatch({ type: CANCEL_RESERVES, payload: rocketId });
  } catch (error) {
    dispatch({ type: ERROR_ROCKETS, payload: error.message });
  }
};

const URL = "https://api.spacexdata.com/v3/missions";

export const joinMission = (id) => ({
  type: JOIN_MISSION,
  payload: id,
});

export const loadMissions = (id) => ({
  type: LOAD_MISSIONS,
  payload: id,
});
export const leaveMission = (payload) => ({
  type: LEAVE_MISSION,
  payload,
});

export const fetchAllMissions = async () => {
  const response = await fetch(URL);
  return response.json();
};

export const missionsSelector = (state) => state.missions;

export const newStateToJoinMission = (missions, id) => {
  const newState = missions.map((mission) => {
    if (mission.mission_id !== id) {
      return mission;
    }
    return { ...mission, isReserved: true };
  });
  return newState;
};

export const newStateToLeaveMission = (missions, id) => {
  const newState = missions.map((mission) => {
    if (mission.mission_id !== id) {
      return mission;
    }
    return { ...mission, isReserved: false };
  });
  return newState;
};

export const getMissions = () => async (dispatch) => {
  const response = await fetch(URL);
  const data = await response.json();
  const missionArr = [];
  data.forEach((m) => {
    const mission = {
      mission_id: m.mission_id,
      mission_name: m.mission_name,
      mission_description: m.description,
    };
    missionArr.push(mission);
  });
  dispatch(loadMissions(missionArr));
};

const loadDragons = (dragons) => ({
  type: LOAD_DRAGONS,
  payload: dragons,
});

export const reserveDragons = (id) => ({
  type: RESERVE_DRAGONS,
  payload: id,
});

export const cancelReservation = (id) => ({
  type: CANCEL_RESERVATION,
  payload: id,
});

const loadFailed = (err) => ({
  type: LOAD_FAILED,
  payload: err,
});

export const fetchData = () => async (dispatch) => {
  try {
    const response = await fetch(url);
    const dragons = await response.json();

    dispatch(
      loadDragons(
        dragons.map((dragon) => {
          const { id, name, type, flickr_images: images } = dragon;
          return {
            id,
            name,
            type,
            images,
          };
        })
      )
    );
  } catch (err) {
    err.description = "An error occurred. Please try again later.";
    dispatch(loadFailed(err.description));
  }
};

export default getMissions;
