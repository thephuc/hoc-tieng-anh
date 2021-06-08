import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function MCQ(props) {
  const {
    questionData: { answerOptions, text }, onAnswerSelected, studentAnswer
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
      {
        answerOptions.map((value) => (
          <FormControlLabel key={value} value={value} control={<Radio color="primary" />} label={value} />
        ))
      }
      </RadioGroup>

    </div>
  );
}

MCQ.propTypes = {
  questionData: PropTypes.shape({
    answerOptions: PropTypes.array,
    text: PropTypes.string
  }),
  studentAnswer: PropTypes.string,
  onAnswerSelected: PropTypes.func,
};

MCQ.defaultProps = {
  questionData: {
    answerOptions: [], text: ""
  },
  studentAnswer: "",
  onAnswerSelected: () => {},
}