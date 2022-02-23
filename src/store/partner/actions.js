import { GET_PARTNER, GET_PARTNER_FAIL, GET_PARTNER_SUCCESS, PROCCESSING_REQUEST } from "./actionTypes"


export const gePartner = (query) => ({
    type: GET_PARTNER,
    query
})

export const doRequest = () =>({
    type: PROCCESSING_REQUEST
})

export const getPartnerSuccess = partners => ({
    type: GET_PARTNER_SUCCESS,
    payload: partners,
})

export const getPartnerFail = error => ({
    type: GET_PARTNER_FAIL,
    payload: error,
})