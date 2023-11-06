/**
   * 이메일 형식이 맞는지 확인하는 함수
   * 
   * @param email 이메일
   */
export const checkEmail = (email) => {
  const regExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  if (regExp.test(email)) {
    return true;
  } else {
    return false;
  }
}