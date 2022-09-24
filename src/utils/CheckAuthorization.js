import history from "./history";
import {UNAUTHORIZED} from "../Constants";

export const Authorization = (status,dispatch) => {
	//when token expired
	if(status === 401){
		// history.push('/401')
		// dispatch({
		// 	type : UNAUTHORIZED,
		// 	payload : Math.random()
		// })
		localStorage.removeItem('user_data')
		localStorage.removeItem('user_permissions')
		localStorage.removeItem('last_log_in_as')
		// localStorage.removeItem('username')
		window.location.href = '/';
	}
}