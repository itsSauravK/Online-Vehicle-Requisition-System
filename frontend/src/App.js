import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage.component';
import SignIn from './pages/sign-in/SignIn.component';
import SignUp from './pages/sign-up/SignUp.component';
import VerificationPage from './pages/verification-page/VerificationPage.component';
import store from './redux/store';
import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/verify/:verificationToken"
            component={VerificationPage}
          />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
