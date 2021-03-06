import { Redirect } from "react-router"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Dashboard from "../pages/Dashboard/index"
import PartnerDetail from "../pages/Partner/PartnerDetail"
import PartnerList from "../pages/Partner/PartnerList"

const authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },

    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },

    //partner
    { path: "/partner-list", exact: true, component:  PartnerList},
    { path: "/partner-detail/:id", exact: true, component:  PartnerDetail},
]

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/logout", component: Logout }
]


export { authProtectedRoutes, publicRoutes }