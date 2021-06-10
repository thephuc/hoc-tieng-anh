import Grid from '@material-ui/core/Grid';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import useStudentHomeStyles from '../../styles/studentComponentStyles/studentHomeStyle';
import { Link } from 'react-router-dom';

export default function TeacherHome() {  
  const classes = useStudentHomeStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Link to='/teacher/exercise' className={classes.link} >
          <Card>
            <CardActionArea>
              <CardMedia 
                className={classes.cardMedia}
                image="/images/teacher-exercise.jpg"
                title="Create/Edit an exercise"
              />
              <CardContent>
                <Typography align="center" variant="h5" gutterBottom>Create/Edit an exercise</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>

      <Grid item xs={6}>
        <Link to='/teacher/students' className={classes.link} >
          <Card>
            <CardActionArea>
              <CardMedia 
                className={classes.cardMedia}
                image="/images/manage-students.jpg"
                title="Manage students"
              />
              <CardContent>
                <Typography align="center" variant="h5" gutterBottom>Manage students</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    </Grid>
  );
}
