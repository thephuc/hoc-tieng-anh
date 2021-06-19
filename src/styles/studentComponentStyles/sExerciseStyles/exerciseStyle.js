import { makeStyles } from '@material-ui/core/styles';

const useExerciseStyles = makeStyles((theme) => ({
  difficultyLevelRadio: {
    textTransform: 'capitalize',
  },
  button: {
    margin: theme.spacing(1, 1, 0, 0),
  },
  exerciseHeader: {
    paddingBottom: 0,
    paddingTop: 10,
  },
  actionSection: {
    margin: "0 16px",
  },
  highlightUnfinished: {
    cursor: "pointer",
    color: "#1B64F2",
    textDecoration: "underline"
  },
  exerciseInput: {
    margin: "0 16px",
  }
}));

export default useExerciseStyles;
