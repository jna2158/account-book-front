import { GET_USER, SET_USER } from "../actions/userAction";

const userReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_USER:
      return (
        Object.assign({}, state)
      );
    
    case SET_USER:
      Object.assign({}, state, {
        nickname: action.state.nickname
      })
      return (
        Object.assign({}, state, {
          nickname: action.state.nickname
        })
      );
      
    default:
      return state;
  }
}

export default userReducer;