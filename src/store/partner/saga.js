import { call, put, takeEvery } from "redux-saga/effects"


import { doRequest, getPartnerFail, getPartnerSuccess } from "./actions"


import { getPartners } from "../../helpers/backend_helper"




import { GET_PARTNER } from "./actionTypes"

function* fetchPartners({query}) {
    try {
      yield put(doRequest())
      const response = yield call(getPartners, query)
      if(response.state){
          yield put(getPartnerSuccess(response))
      }else{
          yield put(getPartnerFail(response.error))
      }
    } catch (error) {
      yield put(getPartnerFail(error.response?.data?.error))
    }
}


function* PartnerSaga() {
    yield takeEvery(GET_PARTNER, fetchPartners)
}

export default PartnerSaga;