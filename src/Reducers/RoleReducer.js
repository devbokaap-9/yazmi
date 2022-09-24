import {
    GET_ROLES_DATA,
    DELETE_ROLE_DATA,
    CREATE_ROLE_DATA,
    EDIT_ROLE_DATA,
    GET_SINGLE_ROLE_DATA,
    GET_ROLES_DATA_LEVEL_WISE,
    GET_SIDEBAR_ROLES_DATA,
    GET_PERMISSIONS_DATA
} from "../Constants"

const initialState = {
    rolesData: "",
    roleDeleteData: "",
    createData: "",
    editData: "",
    singleRoleData: "",
    levelWiseRolesData: "",
    rolesDataForSidebar: "",
    permissionData: ""
}

export default function(state = initialState, action) {
    switch (action.type) {
            case GET_ROLES_DATA:
            return {
                ...state,
                rolesData: action.payload,
            }
            case GET_SINGLE_ROLE_DATA:
            return {
                ...state,
                singleRoleData: action.payload,
            }
            case CREATE_ROLE_DATA:
            return {
                ...state,
                createData: action.payload,
            }
            case EDIT_ROLE_DATA:
                console.log("reducer", action.payload);
            return {
                ...state,
                editData: action.payload,
            }
            case DELETE_ROLE_DATA:
                return {
                    ...state,
                    roleDeleteData: action.payload,
                }
            case GET_ROLES_DATA_LEVEL_WISE:
                return {
                    ...state,
                    levelWiseRolesData: action.payload,
                }
            case GET_SIDEBAR_ROLES_DATA:
                return {
                    ...state,
                    rolesDataForSidebar: action.payload,
                }
            case GET_PERMISSIONS_DATA:
                return {
                    ...state,
                    permissionData: action.payload,
                }
        default:
            return state
    }
}