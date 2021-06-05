import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
  rootContainter: {
    color: "red",
    margin: "auto 100px"
  }
};

export default withStyles(styles)(({
  classes,
}) => {
  return (
    <Grid container justify="center" spacing={1} className={classes.rootContainter}>
      <Grid item xs={12} container justify="space-between">
        <Grid item>
          <Typography variant="h6" component="h2">
            Login 
          </Typography>
        </Grid>
        <Grid item>
          Enter your info below
        </Grid>
      </Grid>
    </Grid>
  )
});
