import * as types from './profileTypes';

export const fetchProfileRequest = () => ({ type: types.FETCH_PROFILE_REQUEST });
export const fetchProfileSuccess = (profile) => ({ type: types.FETCH_PROFILE_SUCCESS, payload: profile });
export const fetchProfileFailure = (error) => ({ type: types.FETCH_PROFILE_FAILURE, payload: error });

export const updateProfileRequest = () => ({ type: types.UPDATE_PROFILE_REQUEST });
export const updateProfileSuccess = (profile) => ({ type: types.UPDATE_PROFILE_SUCCESS, payload: profile });
export const updateProfileFailure = (error) => ({ type: types.UPDATE_PROFILE_FAILURE, payload: error });