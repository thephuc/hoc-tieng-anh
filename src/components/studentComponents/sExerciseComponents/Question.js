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
import { EXERCISE_COMPONENT_STATE } from '../../../actions/exerciseActions';
import { Check, Close } from '@material-ui/icons';
import { COLOR_CODES } from '../../../styles/styleConstants';

export default function Question(props) {
  const classes = useQuestionStyles();
  const {
    questionData: {
      instruction, text, answerOptions, id, point, type, answer
    }, onAnswerSet, studentAnswer, idx, error, isTouched, mode
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
        return <MCQ mode={mode} questionData={{answerOptions, text, answer}} onAnswerSelected={handleAnswerSet} studentAnswer={studentAnswer}/>
      }
      case QUESTION_TYPES.FILL_IN_GAPS: {
        return <FillGap mode={mode} questionData={{text, answer}} onInputChanged={handleAnswerSet} studentAnswer={studentAnswer} />
      }
      case QUESTION_TYPES.TRANSLATE: {
        return <Translate mode={mode} questionData={{text, answer}} onInputChanged={handleAnswerSet} studentAnswer={studentAnswer} />
      }
      default: {
        return <></>
      }
    }
  }

  const renderCardHeader = () => {
    if (mode == EXERCISE_COMPONENT_STATE.SUBMITTED) {
      const _color = studentAnswer === answer ? COLOR_CODES.CORRECT : COLOR_CODES.ERROR;
      const _title = <span>Question {idx + 1} <span style={{color: _color}}>({point} {point > 1 ? 'points' : 'point'})</span></span>;
      return (
        <div className={classes.cardHeader}>
        <CardHeader title={_title} />
        {studentAnswer === answer ? <Check style={{color: _color}}/> : <Close style={{color: _color}}/>}
        </div>
      )
    } else {
      return <CardHeader className={classes.cardHeader} title={`Question ${idx + 1} (${point} ${point > 1 ? 'points' : 'point'})`} />;
    }
  }

  return (
    <Grid item xs={12}>
      <Card className={classes.card}>
        {renderCardHeader()}
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
    type: PropTypes.string,
    answer: PropTypes.string
  }),
  studentAnswer: PropTypes.string,
  onAnswerSet: PropTypes.func,
  idx: PropTypes.number,
  error: PropTypes.string,
  isTouched: PropTypes.bool,
  mode: PropTypes.string
};

Question.defaultProps = {
  questionData: {
    instruction: "", text: "", answerOptions: [], id: null, point: null, type: null,
    answer: ""
  },
  studentAnswer: "",
  onAnswerSet: () => {},
  idx: null,
  error: null,
  isTouched: false,
  mode: EXERCISE_COMPONENT_STATE.UNSUBMITTED
}