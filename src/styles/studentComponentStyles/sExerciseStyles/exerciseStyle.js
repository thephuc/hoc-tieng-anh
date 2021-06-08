import { makeStyles } from '@material-ui/core/styles';

const useExerciseStyles = makeStyles(() => ({
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
}));

export default useExerciseStyles;
