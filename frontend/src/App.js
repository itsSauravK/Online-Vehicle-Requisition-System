import { Provider } from 'react-redux';
import { pdfjs } from 'react-pdf';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Button, ThemeProvider } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';
import { closeSnackbar } from './redux/alert/alert.actions';
import Notifier from './components/notifier/Notifier.component';
import Navbar from './components/navbar/Navbar.component';
import LandingPage from './pages/landing/LandingPage.component';
import SignIn from './pages/sign-in/SignIn.component';
import SignUp from './pages/sign-up/SignUp.component';
import VerificationPage from './pages/verification-page/VerificationPage.component';
import ForgotPasswordPage from './pages/forgot-password/ForgotPassword.component';
import ResetPasswordPage from './pages/reset-password/ResetPassword.component';
import PlaceOrderPage from './pages/place-order/PlaceOrder.component';
import OrderDetailsPage from './pages/order-details/OrderDetails.component';
import dashboard from './pages/dashboard/DashboardPage.component';
import firstModel from './pages/preview/Preview1.component';
import secondModel from './pages/preview/Preview2.component';
import thirdModel from './pages/preview/Preview3.component';
import store from './redux/store';
import theme from './theme';
import './App.css';
import AdminPanelOrders from './pages/admin-panel-orders/AdminPanelOrders.component';
import AdminPanelUsers from './pages/admin-panel-users/AdminPanelUsers.component';
import EditUserPage from './pages/EditUser/EditUserPage.component';

const App = () => {
  const snackbarDimissButton = () => (
    <Button onClick={() => store.dispatch(closeSnackbar())}>dismiss me</Button>
  );

  const snackbarPosition = () => ({ vertical: 'bottom', horizontal: 'right' });

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={1}
          action={snackbarDimissButton}
          anchorOrigin={snackbarPosition()}
        >
          <Notifier />
          <BrowserRouter>
            <Navbar />
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route
                path="/verify/:verificationToken"
                component={VerificationPage}
              />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route path="/preview/first" component={firstModel} />
              <Route path="/preview/second" component={secondModel} />
              <Route path="/preview/third" component={thirdModel} />
              <Route exact path="/order" component={PlaceOrderPage} />
              <Route
                path="/reset-password/:resetToken"
                component={ResetPasswordPage}
              />
              <Route path="/admin/users/:id" component={EditUserPage} />
              <Route path="/dashboard" component={dashboard} />
              <Route path="/admin/orders" component={AdminPanelOrders} />
              <Route path="/admin/users" component={AdminPanelUsers} />
              <Route path="/order/:id" component={OrderDetailsPage} />
            </Switch>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
