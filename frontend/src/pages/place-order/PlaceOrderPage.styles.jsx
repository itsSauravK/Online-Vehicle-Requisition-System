import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: '2rem 3rem',
  },
  button: {
    margin: '1rem 0.5rem 1rem 0',
  },
  root: {
    padding: '0 2rem',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
}));

export default useStyles;
