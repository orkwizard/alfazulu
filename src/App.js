import { BrowserRouter as Router, Switch } from "react-router-dom"
import NonAuthLayout from "./components/NonAuthLayout"
import VerticalLayout from "./components/VerticalLayout"

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"
import Authmiddleware from "./routes/route"

// Import scss
import "./assets/scss/theme.scss"

import fakeBackend from "./helpers/AuthType/fakeBackend"
// Activating fake backend
fakeBackend()

const App = props => {

  const Layout = VerticalLayout
  
  return (
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
              isAuthProtected={false}
              exact
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
  )
}

export default App