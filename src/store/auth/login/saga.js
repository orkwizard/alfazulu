import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess } from "./actions";

import {
    postFakeLogin,
    postJwtLogin,
  } from "../../../helpers/fakebackend_helper";

function* loginUser({ payload: { user, history } }) {
    try {
      if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
        const response = yield call(postJwtLogin, {
          email: user.email,
          password: user.password,
        });
        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginSuccess(response));
      } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
        // const response = yield call(postFakeLogin, {
        //   email: user.email,
        //   password: user.password,
        // });

        let response = {
          email: "demo@demo.com",
          password: "123456",
          role: "admin",
          uid: 1,
          username: "Demo",
        }

        localStorage.setItem("authUser", JSON.stringify(response));
        yield put(loginSuccess(response));
      }
      history.push("/dashboard");
    } catch (error) {
      yield put(apiError(error));
    }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
    yield takeEvery(LOGIN_USER, loginUser);
    yield takeEvery(LOGOUT_USER, logoutUser);
}
  
  export default authSaga;