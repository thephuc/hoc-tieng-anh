import { makeStyles } from '@material-ui/core/styles';

const useStudentHomeStyles = makeStyles((theme) => ({
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  link: {
    textDecoration: "none"
  }
}));

export default useStudentHomeStyles;
