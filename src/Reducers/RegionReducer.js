import {
  GET_REGIONS_DATA,
  SAVE_REGIONS_DATA,
  GET_REGION_DATA,
  UPDATE_REGION_DATA,
  SINGLE_REGION_USERS_DATA,
  SINGLE_DATA_FOR_REGION_USER,
  SINGLE_DELETE_FOR_REGION_USER,
  DELETE_REGION_DATA,
  SINGLE_INVITED_REGION_USERS_DATA
} from "../Constants";

const initialState = {
  regionData: "",
  regionSaveData: "",
  singleRegionData: "",
  deleteRegionData: "",
  updateRegionData: "",
  getSingleRegionUserData: "",
  getSingleDeleteForRegion: "",
  singleInvitedRegionUsers: ""
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REGIONS_DATA:
      return {
        ...state,
        regionData: action.payload,
      };
    case SAVE_REGIONS_DATA:
      return {
        ...state,
        regionSaveData: action.payload,
      };
    case GET_REGION_DATA:
      return {
        ...state,
        singleRegionData: action.payload,
      };
    case DELETE_REGION_DATA:
      return {
        ...state,
        deleteRegionData: action.payload,
      };
    case UPDATE_REGION_DATA:
      return {
        ...state,
        updateRegionData: action.payload,
      };
    case SINGLE_REGION_USERS_DATA:
      return {
        ...state,
        getSingleRegionUserData: action.payload,
      };
    case SINGLE_DATA_FOR_REGION_USER:
      return {
        ...state,
        getSingleDataForRegion: action.payload,
      };
    case SINGLE_DELETE_FOR_REGION_USER:
      return {
        ...state,
        getSingleDeleteForRegion: action.payload,
      };
      case SINGLE_INVITED_REGION_USERS_DATA:
        return {
          ...state,
          singleInvitedRegionUsers: action.payload,
        };
    default:
      return state;
  }
}
