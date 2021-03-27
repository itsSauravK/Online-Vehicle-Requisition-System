import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage.component';
import SignIn from './pages/sign-in/SignIn.component';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route path="/signin" component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
