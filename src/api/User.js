import { Auth } from "aws-amplify";

export const userLoginRequest = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "LOADING_USER" });
      const res = await Auth.signIn(email, password);
      dispatch({ type: "GET_USER_DATA", userData: res.attributes });
    } catch (e) {
      dispatch({ type: "FAIL_LOGIN", error: e });
    }
  };
};

export function getCurrentUserSession() {
  return async (dispatch) => {
    try {
      const res = await Auth.currentSession();
      if (res.isValid()) {
        const idToken = res.getIdToken();
        dispatch({ type: "GET_USER_DATA", userData: idToken.payload });
      }
    } catch (e) {
      console.log("auth check: ", e.message);
    }
  };
}

export function logout() {
  return async (dispatch) => {
    await Auth.signOut();
    dispatch({ type: "USER_LOGOUT" });
  };
}
