import { Redirect } from "react-router"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Dashboard from "../pages/Dashboard/index"

const authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },

    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/logout", component: Logout }
]


export { authProtectedRoutes, publicRoutes }