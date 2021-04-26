import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Grid,
  Typography,
  Button,
  TextField,
  LinearProgress,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  Check,
  Clear,
  AccountCircle,
  Receipt,
  ShoppingCart,
} from '@material-ui/icons';
//import PageHeader from '../../components/page-header/PageHeader.component';
import useStyles from './Dashboard.styles';

import regionData from '../../utils/region';

import {
  getUserDetails,
  updateUserProfile,
} from '../../redux/user/user.actions';
import {
  getMyOrders,
  saveShippingDetails,
} from '../../redux/order/order.actions';

const DashboardPage = ({ history }) => {
  const { user } = useSelector((state) => state.userLogin);
  const { loading, userDetails } = useSelector((state) => state.userDetails);

  const { loading: orderLoading, orders } = useSelector(
    (state) => state.orderListMy
  );


  const shippingAddress = useSelector((state) => state.shippingAddress);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  const [changePassword, setChangePassword] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);

  const [shippingDetails, setShippingDetails] = useState({
    addressLine1: shippingAddress.addressLine1 || '',
    addressLine2: shippingAddress.addressLine2 || '',
    city: shippingAddress.city || '',
    state: shippingAddress.state || '',
    pincode: shippingAddress.pincode || '',
    phoneNumber: shippingAddress.phoneNumber || '',
  });


  const onShippingChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };


  const onShippingSubmit = (e) => {
    setShippingDialogOpen(false);
    dispatch(saveShippingDetails(shippingDetails));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      history.push('/signin');
    } else {
      dispatch(getMyOrders());
      if (!userDetails.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
      }
    }
  }, [user, history, userDetails, dispatch]);

  const onSubmit = (e) => {
    e.preventDefault();
    setProfileDialogOpen(false);
    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        currentPassword,
        password,
      })
    );
  };

  const classes = useStyles();

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      {/* <PageHeader title="Dashboard" subtitle="Manage Profile & Orders" /> */}
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography className={classes.heading} variant="h5" gutterBottom>
              Manage Orders
            </Typography>
            <TableContainer component={Paper}>
              {orderLoading ? (
                <LinearProgress />
              ) : orders.length > 0 ? (
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Order ID</b>
                      </TableCell>
                      <TableCell>
                        <b>Placed On</b>
                      </TableCell>
                      <TableCell>
                        <b>Total Price</b>
                      </TableCell>
                      <TableCell>
                        <b>Review Status</b>
                      </TableCell>
                      <TableCell>
                        <b>Paid</b>
                      </TableCell>
                      <TableCell>
                        <b>Dispatched</b>
                      </TableCell>
                      <TableCell>
                        <b>Actions</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order._id}>
                        <TableCell component="th" scope="row">
                          {order._id.substring(order._id.length - 7)}
                        </TableCell>
                        <TableCell>
                          {order.createdAt.substring(0, 10)}
                        </TableCell>
                        <TableCell>
                          ₹{' '}
                          {order.isAdjusted
                            ? order.adjustedTotal
                            : order.totalPrice}
                        </TableCell>
                        <TableCell>
                          {order.underReview
                            ? 'Under Review'
                            : order.reviewPassed
                            ? 'Passed'
                            : 'Failed'}
                        </TableCell>
                        <TableCell>
                          {order.isPaid ? (
                            <Check className={classes.checkIcon} />
                          ) : (
                            <Clear className={classes.clearIcon} />
                          )}
                        </TableCell>
                        <TableCell>
                          {order.isDispatched ? (
                            <Check className={classes.checkIcon} />
                          ) : (
                            <Clear className={classes.clearIcon} />
                          )}
                        </TableCell>
                        <TableCell>
                          <Link to={`/order/${order._id}`}>
                            <Button variant="contained" color="primary">
                              View Order
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="h6" style={{ padding: '1rem' }}>
                  You haven't placed any orders yet
                </Typography>
              )}
            </TableContainer>
          </Grid>
          <Grid item sm={4} xs={12}>
            <Typography className={classes.heading} variant="h5" gutterBottom>
              Manage Profile
            </Typography>
            <Card>
              <CardHeader
                avatar={
                  <Avatar className={classes.avatar}>
                    <AccountCircle />
                  </Avatar>
                }
                title="Profile Info"
                subheader="Update your name, email & password"
              />
              <CardContent>
                <Table>
                  <TableRow>
                    <TableCell>
                      <b>Name</b>
                    </TableCell>
                    <TableCell>
                      <b>{userDetails.name}</b>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <b>Email Address</b>
                    </TableCell>
                    <TableCell>
                      <b>{userDetails.email}</b>
                    </TableCell>
                  </TableRow>
                </Table>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => setProfileDialogOpen(true)}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Update Profile
                </Button>
              </CardActions>
            </Card>
            <Dialog
              open={profileDialogOpen}
              onClose={() => setProfileDialogOpen(false)}
            >
              <DialogTitle>Update Profile</DialogTitle>
              <DialogContent>
                <form
                  className={classes.cardContent}
                  onSubmit={(e) => onSubmit(e)}
                >
                  <TextField
                    required
                    fullWidth
                    label="Name"
                    variant="outlined"
                    color="secondary"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <TextField
                    required
                    fullWidth
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={changePassword}
                          onChange={(e) => setChangePassword(e.target.checked)}
                        />
                      }
                      label="Update password?"
                    />
                  </FormGroup>
                  {changePassword && (
                    <>
                      <TextField
                        fullWidth
                        label="Current Password"
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                      <TextField
                        fullWidth
                        label="New Password"
                        variant="outlined"
                        color="secondary"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </>
                  )}
                </form>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setProfileDialogOpen(false)}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => onSubmit(e)}
                  variant="contained"
                  color="secondary"
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
          <Grid item sm={8} xs={12}>
            <Typography className={classes.heading} variant="h5" gutterBottom>
              Manage Addresses
            </Typography>
            <Grid container spacing={3}>
              {/* <Grid item sm={6} xs={12}>
               
              </Grid> */}
              <Grid item sm={6} xs={12}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar className={classes.avatar}>
                        <ShoppingCart />
                      </Avatar>
                    }
                    title="Shipping Info"
                    subheader="View & update your shipping address"
                  />
                  <CardContent>
                    {shippingAddress.addressLine1 ? (
                      <Table>
                        <TableRow>
                          <TableCell>
                            <b>Address Line 1</b>
                          </TableCell>
                          <TableCell>{shippingAddress.addressLine1}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Address Line 2</b>
                          </TableCell>
                          <TableCell>{shippingAddress.addressLine2}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>City</b>
                          </TableCell>
                          <TableCell>{shippingAddress.city}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>State</b>
                          </TableCell>
                          <TableCell>{shippingAddress.state}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Pincode</b>
                          </TableCell>
                          <TableCell>{shippingAddress.pincode}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <b>Phone Number</b>
                          </TableCell>
                          <TableCell>{shippingAddress.phoneNumber}</TableCell>
                        </TableRow>
                      </Table>
                    ) : (
                      <Typography>
                        You don't have a saved billing address. Add an address
                        by pressing on the button given below for faster
                        checkout.
                      </Typography>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={(e) => setShippingDialogOpen(true)}
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Update Shipping Address
                    </Button>
                  </CardActions>
                </Card>
                <Dialog
                  open={shippingDialogOpen}
                  onClose={() => setShippingDialogOpen(false)}
                >
                  <DialogTitle>Update Shipping Address</DialogTitle>
                  <DialogContent>
                    <form className={classes.cardContent}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Address Line 1"
                        name="addressLine1"
                        value={shippingDetails.addressLine1}
                        onChange={onShippingChange}
                      />
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        label="Address Line 2"
                        name="addressLine2"
                        value={shippingDetails.addressLine2}
                        onChange={onShippingChange}
                      />
                      <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="stateLabel">State</InputLabel>
                        <Select
                          labelId="stateLabel"
                          label="State"
                          color="secondary"
                          name="state"
                          value={shippingDetails.state}
                          onChange={onShippingChange}
                        >
                          {regionData.map((state) => (
                            <MenuItem value={state.state} key={state.state}>
                              {state.state}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl variant="outlined" fullWidth required>
                        <InputLabel id="cityLabel">City / Town</InputLabel>
                        <Select
                          labelId="cityLabel"
                          label="City / Town"
                          color="secondary"
                          name="city"
                          value={shippingDetails.city}
                          onChange={onShippingChange}
                          disabled={!shippingDetails.state}
                        >
                          {shippingDetails.state
                            ? regionData
                                .find(
                                  ({ state }) => shippingDetails.state === state
                                )
                                .regions.map((region) => (
                                  <MenuItem value={region} key={region}>
                                    {region}
                                  </MenuItem>
                                ))
                            : []}
                        </Select>
                      </FormControl>
                      <TextField
                        variant="outlined"
                        type="number"
                        required
                        fullWidth
                        InputProps={{ inputProps: { max: 999999 } }}
                        name="pincode"
                        label="Pincode"
                        value={shippingDetails.pincode}
                        onChange={onShippingChange}
                      />
                      <TextField
                        variant="outlined"
                        type="number"
                        required
                        fullWidth
                        name="phoneNumber"
                        label="Phone Number"
                        value={shippingDetails.phoneNumber}
                        onChange={onShippingChange}
                      />
                    </form>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setShippingDialogOpen(false)}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={(e) => onShippingSubmit(e)}
                      variant="contained"
                      color="secondary"
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DashboardPage;