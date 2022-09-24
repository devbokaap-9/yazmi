export default function checkPermission(codename){
    let user_permissions = JSON.parse(decodeURIComponent(localStorage.getItem('user_permissions')));
    // console.log(user_permissions,'permissions')
    if(user_permissions && user_permissions.indexOf(codename) !== -1){
        return true;
    }
    else{
        return false;
    }
}