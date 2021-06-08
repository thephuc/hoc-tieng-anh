import React from 'react';
import { Input, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useFillGapStyles from '../../../../styles/studentComponentStyles/sExerciseStyles/fillGapStyle';

export default function FillGap(props) {
  const classes = useFillGapStyles();
  const {
    questionData: {
      text,
    }, onInputChanged, studentAnswer
  } = props;

  if (!text || text.indexOf("___") < 0) {
    return (
      <Typography variant="h6">No question found</Typography>
    );
  }

  const handleInputChanged = ({ target: { value } }) => {
    onInputChanged(value);
  };

  const _textParts = text.split("___");

  return (
    <div>
      {
        _textParts.map((subText, idx) => {
          if (idx < _textParts.length - 1) {
            return (
              <span key={idx} className={classes.sentencePart}>
                <Typography className={classes.sentencePart} variant="subtitle1" key={idx}>{subText}</Typography>
                <Input className={classes.inputPart} onChange={handleInputChanged} value={studentAnswer}/>
              </span>
            )
          } else {
            return (
              <Typography className={classes.sentencePart} variant="subtitle1" key={idx}>{subText}</Typography>
            )
          }
        })
      }
    </div>
  );
}

FillGap.propTypes = {
  questionData: PropTypes.shape({
    text: PropTypes.string,
  }),
  studentAnswer: PropTypes.string,
  onInputChanged: PropTypes.func,
};

FillGap.defaultProps = {
  questionData: { text: "" },
  studentAnswer: "",
  onInputChanged: () => {},
}