import { Redirect } from "react-router"
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Dashboard from "../pages/Dashboard/index"
import EmailTemplateCreate from "../pages/EmailTemplate/EmailTemplateCreate"
import EmailTemplateList from "../pages/EmailTemplate/EmailTemplateList"
import LLamadasAsignadas from "../pages/Partner/LLamadasAsignadas"
import PartnerDetail from "../pages/Partner/PartnerDetail"
import PartnerList from "../pages/Partner/PartnerList"
import PartnerMembership from "../pages/Partner/PartnerMembership"
import WelcomeCall from "../pages/Partner/WelcomeCall"

const authProtectedRoutes = [
    { path: "/dashboard", component: Dashboard },

    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },

    //partner
    { path: "/partner-list", exact: true, component:  PartnerList},
    { path: "/partner-detail/:id", exact: true, component:  PartnerDetail},
    { path: "/partner-welcome-call", exact: true, component:  WelcomeCall},
    { path: "/partner-asigned-call", exact: true, component:  LLamadasAsignadas},
    { path: "/partner-membership/:contractNumber/:idPartner", exact: true, component:  PartnerMembership},

    //email template managment
    { path: "/email-templates/list", exact: true, component:  EmailTemplateList},
    { path: "/email-templates/add", exact: true, component:  EmailTemplateCreate},
    { path: "/email-templates/edit/:id", exact: true, component:  EmailTemplateCreate},
]

const publicRoutes = [
    { path: "/login", component: Login },
    { path: "/logout", component: Logout }
]


export { authProtectedRoutes, publicRoutes }