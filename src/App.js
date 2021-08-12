import { Switch, Route, BrowserRouter } from "react-router-dom";
import LandingPage from "./Containers/LandingPage/LandingPage";


const App = () => (
  <div className="App">
    <BrowserRouter>
      <div>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  </div>

);

export default App;
