import { IS_MODAL_OPEN } from "../actions/loginAction";

const loginReducer = (state = false, action) => {
  switch(action.type) {
    case IS_MODAL_OPEN:
      return (
        Object.assign({}, state, {
          state: !action.state
        })
      );
    default:
      return state;
  }
}

export default loginReducer;