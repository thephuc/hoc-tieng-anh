import { makeStyles } from '@material-ui/core/styles';
import { COLOR_CODES } from '../../styleConstants';

const useQuestionStyles = makeStyles(() => ({
  card: {
    margin: '0 16px',
  },
  error: {
    color: COLOR_CODES.ERROR
  },
  cardHeader: {
    paddingBottom: 8,
    display: "flex", 
    alignItems: "center"
  },
  cardContent: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  instruction: {
    marginBottom: '8px',
    fontSize: '20px',
  },
  cardActions: {
    padding: '0 16px 16px',
  },
}));

export default useQuestionStyles;
