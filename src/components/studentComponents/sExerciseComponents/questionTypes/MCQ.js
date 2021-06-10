import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EXERCISE_COMPONENT_STATE } from '../../../../actions/exerciseActions';
import { green } from '@material-ui/core/colors';
import { COLOR_CODES } from '../../../../styles/styleConstants';

export default function MCQ(props) {
  const {
    questionData: { answerOptions, text, answer }, onAnswerSelected, studentAnswer, mode
  } = props;

  if (answerOptions.length === 0) {
    return (
      <Typography variant="h6">No question data found</Typography>
    );
  }

  const handleAnswerSelected = ({ target: { value } }) => {
    onAnswerSelected(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">{text}</Typography>
      <RadioGroup aria-label="mcqAnswerOptions" name="mcqAnswerOptions" value={studentAnswer} onChange={handleAnswerSelected}>
      { mode === EXERCISE_COMPONENT_STATE.UNSUBMITTED ? 
        answerOptions.map((value) => (
          <FormControlLabel key={value} value={value} 
            control={<Radio color="primary" />} label={value} 
          />
        )) : mode === EXERCISE_COMPONENT_STATE.SUBMITTED ?
        answerOptions.map((value) => {
          if (value === answer) {
            return (
              <FormControlLabel key={value} disabled value={value}
                control={<Radio color="default" style={{color: COLOR_CODES.CORRECT}} />} label={<span style={{color: COLOR_CODES.CORRECT}}>{value}</span>} 
              />
            )
          } else {
            return (
              <FormControlLabel key={value} disabled value={value} 
                control={<Radio color="default" />} label={value} 
              />
            )
          }
        }) :
        answerOptions.map((value) => (
          <FormControlLabel key={value} disabled value={value} 
            control={<Radio color="primary" />} label={value} 
          />
        ))
      }
      </RadioGroup>

    </div>
  );
}

MCQ.propTypes = {
  questionData: PropTypes.shape({
    answerOptions: PropTypes.array,
    text: PropTypes.string,
    answer: PropTypes.string
  }),
  studentAnswer: PropTypes.string,
  onAnswerSelected: PropTypes.func,
  mode: PropTypes.string
};

MCQ.defaultProps = {
  questionData: {
    answerOptions: [], 
    text: "",
    answer: ""
  },
  studentAnswer: "",
  onAnswerSelected: () => {},
  mode: EXERCISE_COMPONENT_STATE.UNSUBMITTED
}