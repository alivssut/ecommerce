import axiosConfig from '../../axiosConfig';
import * as actions from './profileActions';

const API_BASE = 'http://localhost/api/v1';

export const fetchProfile = () => async (dispatch) => {
  dispatch(actions.fetchProfileRequest());
  try {
    const response = await axiosConfig.get(`${API_BASE}/profile/`);
    dispatch(actions.fetchProfileSuccess(response.data));
  } catch (error) {
    dispatch(actions.fetchProfileFailure(error.response?.data));
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  dispatch(actions.updateProfileRequest());
  try {
    const response = await axiosConfig.patch(`${API_BASE}/profile/`, profileData);
    dispatch(actions.updateProfileSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(actions.updateProfileFailure(error.response?.data));
    throw error.response?.data;
  }
};