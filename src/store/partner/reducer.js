import { GET_PARTNER_FAIL, GET_PARTNER_SUCCESS, PROCCESSING_REQUEST } from "./actionTypes"

const INIT_STATE = {
    loadPartner: true,
    partners: [],
    partnerProfile: {},
    error: {},
}


const partners = (state = INIT_STATE, action) => {
    switch(action.type){
        case PROCCESSING_REQUEST:
            return {
                ...state,
                loadPartner: true,
            }
        case GET_PARTNER_SUCCESS:
            return {
                ...state,
                loadPartner: false,
                partners: action.payload,
            }
        case GET_PARTNER_FAIL:
            return {
                ...state,
                loadPartner: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export default partners