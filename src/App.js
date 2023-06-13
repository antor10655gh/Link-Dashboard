import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Billing from "./pages/Billing";
import Rtl from "./pages/Rtl";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from "./pages/Users";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="App">
      {
        user ?
        <Switch>
          <Main>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/billing" component={Billing} />
            <Route exact path="/rtl" component={Rtl} />
            <Route exact path="/profile" component={Profile} />
            <Redirect from="*" to="/dashboard" />
          </Main>
        </Switch> :
        <Switch>
          <Route path="/sign-in" exact component={SignIn} />
          <Redirect from="*" to="/sign-in" />
        </Switch>
      }
      <ToastContainer />
    </div>
  );
}

export default App;