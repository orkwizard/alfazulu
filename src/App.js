import { BrowserRouter as Router, Switch } from "react-router-dom"
import NonAuthLayout from "./components/NonAuthLayout"
import VerticalLayout from "./components/VerticalLayout"
import { BrowserRouter } from "react-router-dom"

// Import Routes all
import { authProtectedRoutes, publicRoutes } from "./routes"
import Authmiddleware from "./routes/route"

// Import scss
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import "./assets/scss/theme.scss"

import fakeBackend from "./helpers/AuthType/fakeBackend"
import { Provider } from "react-redux"
import store from "./store"

// Activating fake backend
//fakeBackend()

const App = props => {

  const Layout = VerticalLayout
  
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  )
}

export default App