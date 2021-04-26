import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import useStyles from './PlaceOrderPage.styles';

import { placeOrder } from '../../redux/order/order.actions';

import Customizations from './Customizations.component';
import DocumentUpload from './DocumentUpload.component';
import ShippingDetails from './ShippingDetails.component';
import OrderResult from './OrderResult.component';

function getSteps() {
  return ['Customize Car', 'Documents Upload', 'Shipping Details'];
}

const PlaceOrderPage = ({ history }) => {
  const { user } = useSelector((state) => state.userLogin);

  const { order } = useSelector((state) => state.orderCreate);

  const shippingAddress = useSelector((state) => state.shippingAddress);

  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((previousStep) => previousStep + 1);
  };

  const handleBack = () => {
    setActiveStep((previousStep) => previousStep - 1);
  };

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const [details, setDetails] = useState({
    model: query.get('model') || '',
    color: '',
    engine: '',
    tire: '',
    fuel: '',
  });

  const { model, color, engine, tire, fuel } = details;

  const [file, setFile] = useState('');

  const [shippingDetails, setShippingDetails] = useState({
    addressLine1: shippingAddress.addressLine1 || '',
    addressLine2: shippingAddress.addressLine2 || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
    pincode: shippingAddress.pincode || '',
    phoneNumber: shippingAddress.phoneNumber || '',
  });

  let orderPrice, taxPrice, shippingPrice;

  const calculateOrderPrice = (model, color, engine, tire, fuel) => {
    const modelPrice =
      model === 'sedan' ? 5000 : model === 'convertible' ? 7000 : 10000;
    const colorPrice =
      color === 'black'
        ? 2500
        : color === 'white'
        ? 2500
        : color === 'red'
        ? 3500
        : 3500;
    const enginePrice =
      engine === 'CL-100'
        ? 2500
        : engine === 'CL-200'
        ? 4500
        : engine === 'CL-300'
        ? 6500
        : 8500;
    const tirePrice =
      tire === 'Bridgestone'
        ? 100
        : tire === 'JK Tyres'
        ? 300
        : tire === 'Yokoshima'
        ? 400
        : 200;
    const fuelPrice =
      fuel === 'Electric'
        ? 5000
        : fuel === 'Diesel'
        ? 3000
        : fuel === 'Petrol'
        ? 3000
        : 2000;
    return modelPrice + colorPrice + enginePrice + tirePrice + fuelPrice;
  };

  if (
    details.model &&
    details.color &&
    details.engine &&
    details.tire &&
    details.fuel
  ) {
    orderPrice = calculateOrderPrice(
      details.model,
      details.color,
      details.engine,
      details.tire,
      details.fuel
    );
    taxPrice = Math.round(0.18 * orderPrice * 100) / 100;
    shippingPrice = 200;
  }

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const onButtonChange = (e) => {
    setDetails({ ...details, [e.currentTarget.name]: e.currentTarget.value });
  };

  const onShippingChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    const orderDetails = {
      documentsUrl: file,
      orderDetails: {
        model,
        engine,
        color,
        tires: tire,
        fuel,
      },
      orderPrice,
      taxPrice,
      shippingPrice,
      totalPrice: orderPrice + taxPrice + shippingPrice,
      shippingDetails,
    };
    dispatch(placeOrder(orderDetails));
    setActiveStep(3);
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <Customizations
            details={details}
            onChange={onChange}
            onButtonChange={onButtonChange}
            price={{ orderPrice, taxPrice, shippingPrice }}
          />
        );
      case 1:
        return <DocumentUpload file={file} setFile={setFile} />;
      case 2:
        return (
          <ShippingDetails
            details={shippingDetails}
            onChange={onShippingChange}
          />
        );
      default:
        return 'You were not supposed to reach here!';
    }
  }

  const customizationsCheck = () => {
    if (
      details.model !== '' &&
      details.color !== '' &&
      details.engine !== '' &&
      details.fuel !== '' &&
      details.tires !== ''
    )
      return false;
    return true;
  };

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    }
    if (user && user.isAdmin) {
      history.push('/');
    }
    setShippingDetails({
      addressLine1: shippingAddress.addressLine1 || '',
      addressLine2: shippingAddress.addressLine2 || '',
      city: shippingAddress.city || '',
      state: shippingAddress.state || '',
      pincode: shippingAddress.pincode || '',
    });
  }, [history, user, shippingAddress]);

  const classes = useStyles();

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container className={classes.contentContainer}>
        {activeStep === steps.length ? (
          <OrderResult orderId={order && order._id} />
        ) : (
          <Grid container className={classes.root}>
            {getStepContent(activeStep)}
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              className={classes.button}
              color="primary"
            >
              Back
            </Button>
            {activeStep < 2 && (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && customizationsCheck()) ||
                  (activeStep === 1 && !file)
                }
              >
                Next
              </Button>
            )}
            {activeStep === 2 && (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={onSubmit}
                disabled={
                  !shippingDetails.addressLine1 ||
                  !shippingDetails.addressLine2 ||
                  !shippingDetails.city ||
                  !shippingDetails.state ||
                  !shippingDetails.pincode ||
                  !shippingDetails.phoneNumber
                }
              >
                Place Order
              </Button>
            )}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default PlaceOrderPage;
