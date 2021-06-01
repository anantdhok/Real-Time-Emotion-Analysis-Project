import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import store from "./store/configStore";
import setAuthToken from "./store/utils/setAuthToken";
import { setCurrentUser, signoutUser } from "./store/actions/authActions";
import { Welcome, NotFound } from "./pages/welcome/Welcome";
import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import Dashboard from "./pages/dashboard/Dashboard";
import userSignin from "./pages/auth/user/userSignin";
import userSignup from "./pages/auth/user/userSignup";
import "./styles/Basic.css";
import "./styles/Buttons.css";
import "./styles/Inputs.css";
import "./styles/Layout.css";
import "./App.css";

function App() {
  if (localStorage.jwtToken) {
    const token = localStorage.jwtToken;
    setAuthToken(token);
    const decoded = jwt_decode(token);
    store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      store.dispatch(signoutUser());
      window.location.href = "./signin";
    }
  }

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" component={Welcome} exact />
            <Route path="/home" component={Home} />
            <Route path="/community" component={Community} />
            <Route path="/signin" component={userSignin} />
            <Route path="/signup" component={userSignup} />
            <Route path="/community-signin" component={userSignin} />
            <Route path="/community-signup" component={userSignup} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
