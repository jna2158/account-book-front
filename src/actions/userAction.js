export const GET_USER = "GET_USER";
export const SET_USER = "SET_USER";

export const getUser = (state) => {
  return {
    type: GET_USER,
    state
  }
}

export const setUser = (state) => {
  return {
    type: SET_USER,
    state
  }
}

