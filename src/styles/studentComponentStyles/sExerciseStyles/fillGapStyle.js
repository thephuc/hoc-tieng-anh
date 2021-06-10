import { makeStyles } from '@material-ui/core/styles';
import { COLOR_CODES } from '../../styleConstants';

const useFillGapStyles = makeStyles(() => ({
  sentencePart: {
    display: 'inline-block',
  },
  inputPart: {
    margin: "0 5px",
    display: 'inline-block',
  },
  correctAnswer: {
    color: COLOR_CODES.CORRECT
  }
}));

export default useFillGapStyles;
