import useStyles from './LandingPage.styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { carModel } from '../../data';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.hero}>
        <Box>Sharma Vehicle</Box>
      </Box>
      <Container maxWidth="lg" className={classes.carModelContainer}>
        <Typography variant="h5" className={classes.carModelTitle}>
          Car Models
        </Typography>
        <Grid container spacing={3}>
          {carModel.map((car) => (
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.root}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="250"
                    image={car.image}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {car.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to={`/order?model=${car.title}`}>Buy Now</Link>
                  </Button>
                  <Button size="small" color="primary">
                    <Link to={car.link} className="link">
                      Preview
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default LandingPage;
