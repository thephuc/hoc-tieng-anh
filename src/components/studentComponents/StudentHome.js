import Grid from '@material-ui/core/Grid';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import useStudentHomeStyles from '../../styles/studentComponentStyles/studentHomeStyle';
import { Link } from 'react-router-dom';

export default function StudentHome() {  
  const classes = useStudentHomeStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Link to='/student/exercise' className={classes.link} >
          <Card>
            <CardActionArea>
              <CardMedia 
                className={classes.cardMedia}
                image="/images/exercise-img.jpg"
                title="Do an exercise"
              />
              <CardContent>
                <Typography align="center" variant="h5" gutterBottom>Do an exercise</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={6}>
        <Link to='/student/review' className={classes.link} >
          <Card>
            <CardActionArea>
              <CardMedia 
                className={classes.cardMedia}
                image="/images/review-img.jpg"
                title="Review past results"
              />
              <CardContent>
                <Typography align="center" variant="h5" gutterBottom>Review past results</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
      
    </Grid>
  );
}
