import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"

//partner
import Partner from './partner/reducer'


const rootReducer = combineReducers({
    // public
    Login,
    Layout,
    Profile,
    Partner
  })
  
  export default rootReducer