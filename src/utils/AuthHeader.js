export default function authHeader(){
	let user_data = JSON.parse(decodeURIComponent(localStorage.getItem('user_data')));
	if(user_data){
		let token = user_data.key
		return {Authorization : 'token ' + token};
	}
	else{
		return false;
	}
}
