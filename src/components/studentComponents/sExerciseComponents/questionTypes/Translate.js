import React from 'react';
import { Input, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

export default function Translate(props) {
  const {
    questionData: {
      text,
    }, onInputChanged, studentAnswer
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
      <Input style={{width: "200px"}} onChange={handleInputChanged} value={studentAnswer}/>
    </div>
  );
}

Translate.propTypes = {
  questionData: PropTypes.shape({
    text: PropTypes.string,
  }),
  studentAnswer: PropTypes.string,
  onInputChanged: PropTypes.func,
};

Translate.defaultProps = {
  questionData: { text: "" },
  studentAnswer: "",
  onInputChanged: () => {},
}