import React from 'react';
import { Input, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { EXERCISE_COMPONENT_STATE } from '../../../../actions/exerciseActions';
import { COLOR_CODES } from '../../../../styles/styleConstants';

export default function Translate(props) {
  const {
    questionData: {
      text, answer
    }, onInputChanged, studentAnswer, mode
  } = props;

  if (!text) {
    return (
      <Typography variant="h6">No question found</Typography>
    );
  }

  const handleInputChanged = ({ target: { value } }) => {
    onInputChanged(value);
  };

  return (
    <div>
      <Typography variant="subtitle1">{text}</Typography>
      {
        mode === EXERCISE_COMPONENT_STATE.UNSUBMITTED ?
        <Input style={{width: "200px"}} onChange={handleInputChanged} value={studentAnswer}/>
        :
        <Input 
        disabled
        style={{
          width: "200px",
          color: studentAnswer === answer ? COLOR_CODES.CORRECT : COLOR_CODES.ERROR
        }} onChange={handleInputChanged} value={studentAnswer}/>
      }
      {
        mode === EXERCISE_COMPONENT_STATE.SUBMITTED && studentAnswer !== answer &&
        <Typography style={{color: COLOR_CODES.CORRECT}} variant="subtitle1">{answer}</Typography>
      }
    </div>
  );
}

Translate.propTypes = {
  questionData: PropTypes.shape({
    text: PropTypes.string,
    answer: PropTypes.string
  }),
  studentAnswer: PropTypes.string,
  onInputChanged: PropTypes.func,
  mode: PropTypes.string
};

Translate.defaultProps = {
  questionData: { text: "", answer: "" },
  studentAnswer: "",
  onInputChanged: () => {},
  mode: ""
}