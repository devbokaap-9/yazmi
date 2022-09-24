import {
	DELETE_WOREDA_DATA,
	GET_WOREDA_DATA,
	UPDATE_WOREDA_DATA,
	SAVE_WOREDAS_DATA,
	GET_WOREDAS_DATA,
	WOREDA_USER_DATA,
	DELETE_WOREDA_USER_DATA,
	SINGLE_WOREDA_USER_DATA,
	WOREDA_INVITED_USER_DATA,
	GET_REGION_SPECIFIC_WOREDAS_DATA,
} from '../Constants';

const initialState = {
	woredaData: '',
	addWoredasData: '',
	status: '',
	deleteworeda: '',
	singleWoredaData: '',
	updateWoredaData: '',
	getWoredaUser: '',
	deleteWoredaUserData: '',
	getWoredaSingleUserData: '',
	woredaInvitedUsersData: '',
	regionSpecificWoredaData: '',
};

export default function (state = initialState, action) {
	switch (action.type) {
		case GET_WOREDAS_DATA:
			return {
				...state,
				woredaData: action.payload,
			};
		case SAVE_WOREDAS_DATA:
			return {
				...state,
				addWoredasData: action.payload.data,
				status: action.payload.status,
			};
		case GET_WOREDA_DATA:
			return {
				...state,
				singleWoredaData: action.payload,
			};
		case DELETE_WOREDA_DATA:
			return {
				...state,
				deleteworeda: action.payload,
			};
		case UPDATE_WOREDA_DATA:
			return {
				...state,
				updateWoredaData: action.payload,
			};
		case WOREDA_USER_DATA:
			return {
				...state,
				getWoredaUser: action.payload,
			};
		case SINGLE_WOREDA_USER_DATA:
			return {
				...state,
				getWoredaSingleUserData: action.payload,
			};
		case DELETE_WOREDA_USER_DATA:
			return {
				...state,
				deleteWoredaUserData: action.payload,
			};
		case WOREDA_INVITED_USER_DATA:
			return {
				...state,
				woredaInvitedUsersData: action.payload,
			};
		case GET_REGION_SPECIFIC_WOREDAS_DATA:
			return {
				...state,
				regionSpecificWoredaData: action.payload,
			};
		default:
			return state;
	}
}
