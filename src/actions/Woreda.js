import {
	DELETE_WOREDA_DATA,
	GET_WOREDA_DATA,
	UPDATE_WOREDA_DATA,
	GET_WOREDAS_DATA,
	SAVE_WOREDAS_DATA,
	GET_ERRORS,
	WOREDA_USER_DATA,
	DELETE_WOREDA_USER_DATA,
	SINGLE_WOREDA_USER_DATA,
	WOREDA_INVITED_USER_DATA,
	GET_REGION_SPECIFIC_WOREDAS_DATA,
} from '../Constants';
import axios from 'axios';
import { BASE_URL } from '../Constants';
import authHeader from '../utils/AuthHeader';
import { Authorization } from '../utils/CheckAuthorization';

// get All Woreda data
export const getWoredasData = () => (dispatch) => {
	axios
		.get(BASE_URL + '/woredas/', {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: GET_WOREDAS_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: GET_ERRORS,
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// get All Woreda data
export const getRegionSpecificWoredasData = (regionId) => (dispatch) => {
	axios
		.get(BASE_URL + '/woredas/?region=' + regionId, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: GET_REGION_SPECIFIC_WOREDAS_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: GET_ERRORS,
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// get Single Woreda data
export const getWoredaData = (id) => (dispatch) => {
	axios
		.get(BASE_URL + `/woredas/${id}`, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: GET_WOREDA_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: 'GET_ERRORS',
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// post woredas data
export const postWoredasData = (woredasData) => (dispatch) => {
	axios
		.post(BASE_URL + '/woredas/', woredasData, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 201) {
				dispatch({
					type: SAVE_WOREDAS_DATA,
					payload: response,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: 'GET_ERRORS',
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// delete single woreda data
export const deleteWoredaData = (id) => (dispatch) => {
	axios
		.delete(BASE_URL + `/woredas/${id}/`, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 204) {
				dispatch({
					type: DELETE_WOREDA_DATA,
					payload: response,
				});
				dispatch(getWoredasData());
			}
		})
		.catch((error) => {
			if (
				error &&
				error.response &&
				(error.response.status === 500 || error.response.status === 400)
			) {
				dispatch({
					type: 'GET_ERRORS',
					payload: error.response,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// update woreda
export const updateWoredaData = (data) => (dispatch) => {
	axios
		.put(BASE_URL + `/woredas/${data.id}/`, data, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: UPDATE_WOREDA_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: 'GET_ERRORS',
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// get Woreda user data
export const getWoredaUser = (id) => (dispatch) => {
	axios
		.get(BASE_URL + `/woredas/${id}/users?membership=PERMANENT`, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: WOREDA_USER_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: 'GET_ERRORS',
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// get Woreda invited users data
export const getWoredaInvitedUser = (id) => (dispatch) => {
	axios
		.get(BASE_URL + `/woredas/${id}/users?membership=INVITED`, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: WOREDA_INVITED_USER_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: 'GET_ERRORS',
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// get Woreda single user data
export const getWoredaSingleUser = (id) => (dispatch) => {
	axios
		.get(BASE_URL + `/woredas/${id.WoredaId}/users/${id.userId}/`, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					type: SINGLE_WOREDA_USER_DATA,
					payload: response.data,
				});
			}
		})
		.catch((error) => {
			if (error && error.response && error.response.status === 400) {
				dispatch({
					type: GET_ERRORS,
					payload: error.response.data,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};

// delete Woreda single user data
export const deleteWoredaUser = (id) => (dispatch) => {
	axios
		.delete(BASE_URL + `/woredas/${id.WoredaId}/users/${id.userId}/`, {
			headers: authHeader(),
		})
		.then((response) => {
			if (response.status === 204) {
				dispatch({
					type: DELETE_WOREDA_USER_DATA,
					payload: response,
				});
				dispatch(getWoredaUser(id.WoredaId));
			}
		})
		.catch((error) => {
			if (
				error &&
				error.response &&
				(error.response.status === 500 || error.response.status === 400)
			) {
				dispatch({
					type: GET_ERRORS,
					payload: error.response,
				});
			} else {
				Authorization(
					error && error.response && error.response.status,
					dispatch
				);
			}
		});
};
