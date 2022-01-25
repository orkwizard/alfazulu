import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Profile from "./auth/profile/reducer"


const rootReducer = combineReducers({
    // public
    Login,
    Layout,
    Profile
  })
  
  export default rootReducer