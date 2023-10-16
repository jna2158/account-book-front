import { IS_MODAL_OPEN } from "../actions/loginAction";

// 3. Reducer(리듀서)를 생성한다.
// action을 통해 어떠한 행동을 정의했다면, 그 결과 애플리케이션의 상태가 어떻게 바뀌는지 특정한다.
// action의 type에 따라 변화된 state를 반환한다.

const loginReducer = (state = false, action) => {
  console.log('[3]. oginReducer', state, action);
  switch(action.type) {
    case IS_MODAL_OPEN:
      const obj = {
        ...state,
        state: !action.state
      };
      console.log('object', obj);
      return obj;
    default:
      return state;
  }
}

export default loginReducer;