import { SET_CURRENT_USER } from "../actionTypes/auth";
import isEmpty from "lodash/isEmpty";
import jwt_decode from 'jwt-decode';

const initialState = {
  isAuthenticated:  localStorage.getItem('authTokens')?(JSON.parse(localStorage.getItem('authTokens')).access):false,
  user: localStorage.getItem('authTokens')?jwt_decode(JSON.parse(localStorage.getItem('authTokens')).access):null,
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated:true,
        user: action.user,
      };
    default:
      return state;
  }
};
