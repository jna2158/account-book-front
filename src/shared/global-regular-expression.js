/**
   * 이메일 형식 체크
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