import { all, fork } from "redux-saga/effects"

//public
import AuthSaga from "./auth/login/saga"
import LayoutSaga from "./layout/saga"
import ProfileSaga from "./auth/profile/saga"

export default function* rootSaga() {
    yield all([
      //public
      fork(AuthSaga),
      fork(LayoutSaga),
      fork(ProfileSaga)
    ])
  }