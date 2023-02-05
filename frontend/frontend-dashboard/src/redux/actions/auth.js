import { SET_CURRENT_USER } from "../actionTypes/auth";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}
