export function isAuthenticated(sendUserInfo=false) {
  let AuthStatus = {};
  try {
    AuthStatus = JSON.parse(localStorage.getItem("ZDSCRSCREDS"));
  } catch (e) {}

  try {
    if (AuthStatus.message === "Logged in") {
      if(sendUserInfo){
        return AuthStatus.data
      }
      else{

        return AuthStatus.data.token;
      }
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}
