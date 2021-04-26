import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import LinearProgress from '@material-ui/core/LinearProgress';
import useStyles from './EditUserPage.styles';

import { getUserDetails, updateUser } from '../../redux/user/user.actions';
import { USER_UPDATE_RESET } from '../../redux/user/user.types';

export default function EditUserPage({ match, history }) {
  const userId = match.params.id;

  const classes = useStyles();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const { user } = useSelector((state) => state.userLogin);
  const { loading, userDetails } = useSelector((state) => state.userDetails);
  const { success } = useSelector((state) => state.userEdit);

  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };


  useEffect(() => {
    // eslint-disable-next-line
    if (!user) {
      history.push('/signin');
    }
    if (success) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!userDetails || userDetails._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(userDetails.name);
        setEmail(userDetails.email);
        setIsAdmin(userDetails.isAdmin);
      }
    }
  }, [history, user, userDetails, userId, dispatch, success]);

  return (
    <>
      {loading && <LinearProgress color="secondary" />}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit User
          </Typography>
          <form className={classes.form} onSubmit={(e) => onFormSubmit(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      name="isAdmin"
                    />
                  }
                  label="Is Admin?"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={user && userDetails && userDetails._id === user._id}
            >
              Edit User
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}