// 1. action의 type을 정의한다.
export const IS_MODAL_OPEN = "IS_MODAL_OPEN";

// 2. action creators (액션 생성자)를 만든다.
export const isModalOpen = (state) => {
  console.log('[2]. isModalOpen', state);
  return {
    type: IS_MODAL_OPEN,
    state
  }
}

