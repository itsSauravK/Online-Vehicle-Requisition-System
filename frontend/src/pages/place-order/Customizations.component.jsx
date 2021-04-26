import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Card,
  TableContainer,
  makeStyles,
} from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    width: '100%',
  },
  heading: {
    borderBottom: '5px solid #c7821c',
    marginBottom: '1.5rem',
    width: '225px',
  },
  dimensionBox: {
    marginRight: '0.75rem',
    [theme.breakpoints.down('md')]: {
      margin: '0 0 0.75rem 0',
    },
  },
}));

const Customizations = ({ details, onChange, price, onButtonChange }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item sm={8}>
        <form>
          <Grid container spacing={3}>
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell>Models</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      exclusive
                      value={details.model}
                      onChange={onButtonChange}
                    >
                      <ToggleButton name="model" value="sedan">
                        Sedan
                      </ToggleButton>
                      <ToggleButton name="model" value="convertible">
                        Convertible
                      </ToggleButton>
                      <ToggleButton name="model" value="suv">
                        SUV
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Color</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      exclusive
                      value={details.color}
                      onChange={onButtonChange}
                    >
                      <ToggleButton name="color" value="black">
                        Black
                      </ToggleButton>
                      <ToggleButton name="color" value="white">
                        White
                      </ToggleButton>
                      <ToggleButton name="color" value="red">
                        Red
                      </ToggleButton>
                      <ToggleButton name="color" value="blue">
                        Blue
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Engine</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      exclusive
                      value={details.engine}
                      onChange={onButtonChange}
                    >
                      <ToggleButton name="engine" value="CL-100">
                        CL-100
                      </ToggleButton>
                      <ToggleButton name="engine" value="CL-200">
                        CL-200
                      </ToggleButton>
                      <ToggleButton name="engine" value="CL-300">
                        CL-300
                      </ToggleButton>
                      <ToggleButton name="engine" value="CL-400">
                        CL-400
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Tires</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      exclusive
                      value={details.tire}
                      onChange={onButtonChange}
                    >
                      <ToggleButton name="tire" value="Bridgestone">
                        Bridgestone
                      </ToggleButton>
                      <ToggleButton name="tire" value="JK Tyres">
                        JK Tyres
                      </ToggleButton>
                      <ToggleButton name="tire" value="Yokoshima">
                        Yokoshima
                      </ToggleButton>
                      <ToggleButton name="tire" value="CEAT Tyres">
                        CEAT Tyres
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Fuel</TableCell>
                  <TableCell>
                    <ToggleButtonGroup
                      exclusive
                      value={details.fuel}
                      onChange={onButtonChange}
                    >
                      <ToggleButton name="fuel" value="Electric">
                        Electric
                      </ToggleButton>
                      <ToggleButton name="fuel" value="Petrol">
                        Petrol
                      </ToggleButton>
                      <ToggleButton name="fuel" value="Diesel">
                        Diesel
                      </ToggleButton>
                      <ToggleButton name="fuel" value="CNG">
                        CNG
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </TableCell>
                </TableRow>
              </Table>
            </TableContainer>
          </Grid>
        </form>
      </Grid>
      <Grid item sm={4}>
        <Typography className={classes.heading} variant="h5" gutterBottom>
          Cost Breakdown
        </Typography>
        <TableContainer className={classes.tableContainer} component={Card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Cost Type</b>
                </TableCell>
                <TableCell>
                  <b>Price</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell scope="row">Car Cost</TableCell>
                <TableCell>₹ {price.orderPrice || 0}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Tax</TableCell>
                <TableCell>₹ {price.taxPrice || 0}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">Shipping</TableCell>
                <TableCell>₹ {price.shippingPrice || 0}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell scope="row">
                  <b>Total Cost</b>
                </TableCell>
                <TableCell>
                  <b>
                    ₹{' '}
                    {Math.round(
                      ((price.orderPrice || 0) +
                        (price.taxPrice || 0) +
                        (price.shippingPrice || 0)) *
                        100
                    ) / 100}
                  </b>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default Customizations;
