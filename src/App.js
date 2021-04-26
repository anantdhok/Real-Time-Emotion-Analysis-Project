import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Welcome from "./pages/welcome/Welcome";
import Home from "./pages/home/Home";
import Community from "./pages/community/Community";
import Dashboard from "./pages/dashboard/Dashboard";
import Conference from "./pages/conference/Conference";
import { Signin, Signup } from "./pages/auth/Auth";
import { SigninCommunity, SignupCommunity } from "./pages/auth/AuthCommunity";
import NotFound from "./components/conference/NotFound";
import "./styles/Basic.css";
import "./styles/Buttons.css";
import "./styles/Inputs.css";
import "./styles/Layout.css";
import "./App.css";
import "./meet.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Welcome} exact />
          <Route path="/home" component={Home} />
          <Route path="/community" component={Community} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
          <Route path="/community-signin" component={SigninCommunity} />
          <Route path="/community-signup" component={SignupCommunity} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/meet/:id" component={Conference} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
