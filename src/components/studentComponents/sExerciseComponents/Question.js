import React from 'react';
import {
  Card, CardActions, CardContent, CardHeader, Grid, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { QUESTION_TYPES } from '../../../data/constants';
import MCQ from './questionTypes/MCQ';
import FillGap from './questionTypes/FillGap';
import useQuestionStyles from '../../../styles/studentComponentStyles/sExerciseStyles/questionStyle';
import Translate from './questionTypes/Translate';

export default function Question(props) {
  const classes = useQuestionStyles();
  const {
    questionData: {
      instruction, text, answerOptions, id, point, type
    }, onAnswerSet, studentAnswer, idx, error, isTouched
  } = props;

  if (!instruction) {
    return (
      <Grid item xs={12}>
        <Typography variant="h6">No question found</Typography>
      </Grid>
    );
  }

  const handleAnswerSet = (value) => {
    onAnswerSet(id, value);
  };

  const renderQuestionByType = () => {
    switch(type) {
      case QUESTION_TYPES.MCQ: {
        return <MCQ questionData={{answerOptions, text}} onAnswerSelected={handleAnswerSet} studentAnswer={studentAnswer}/>
      }
      case QUESTION_TYPES.FILL_IN_GAPS: {
        return <FillGap questionData={{text}} onInputChanged={handleAnswerSet} studentAnswer={studentAnswer} />
      }
      case QUESTION_TYPES.TRANSLATE: {
        return <Translate questionData={{text}} onInputChanged={handleAnswerSet} studentAnswer={studentAnswer} />
      }
      default: {
        return <></>
      }
    }
  }

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        <CardHeader className={classes.cardHeader} title={`Question ${idx + 1} (${point} ${point > 1 ? 'points' : 'point'})`} />
        <CardContent className={classes.cardContent}>
        {
          isTouched && error && <Typography variant="subtitle1" className={classes.error}>{error}</Typography>
        }
          <Typography className={classes.instruction}>{instruction}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {renderQuestionByType()}
        </CardActions>
      </Card>
    </Grid>
  );
}

Question.propTypes = {
  questionData: PropTypes.shape({
    instruction: PropTypes.string,
    text: PropTypes.string,
    answerOptions: PropTypes.array,
    id: PropTypes.string,
    point: PropTypes.number,
    type: PropTypes.string
  }),
  studentAnswer: PropTypes.string,
  onAnswerSet: PropTypes.func,
  idx: PropTypes.number,
  error: PropTypes.string,
  isTouched: PropTypes.bool
};

Question.defaultProps = {
  questionData: {
    instruction: "", text: "", answerOptions: [], id: null, point: null, type: null
  },
  studentAnswer: "",
  onAnswerSet: () => {},
  idx: null,
  error: null,
  isTouched: false
}