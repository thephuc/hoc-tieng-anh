import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  difficultyLevelRadio: {
    textTransform: 'capitalize',
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
}));

export default useStyles;
