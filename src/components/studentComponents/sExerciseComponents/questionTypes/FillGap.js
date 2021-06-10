import React from 'react';
import { Input, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import useFillGapStyles from '../../../../styles/studentComponentStyles/sExerciseStyles/fillGapStyle';
import { EXERCISE_COMPONENT_STATE } from '../../../../actions/exerciseActions';
import { COLOR_CODES } from '../../../../styles/styleConstants';

export default function FillGap(props) {
  const classes = useFillGapStyles();
  const {
    questionData: {
      text, answer
    }, onInputChanged, studentAnswer, mode
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
                {
                  mode === EXERCISE_COMPONENT_STATE.UNSUBMITTED ?
                  <Input className={classes.inputPart} onChange={handleInputChanged} value={studentAnswer}/>
                  : 
                  <Input 
                  className={classes.inputPart} onChange={handleInputChanged} value={studentAnswer}
                  disabled
                  style={{color: studentAnswer === answer ? COLOR_CODES.CORRECT : COLOR_CODES.ERROR}}
                  />
                }
              </span>
            )
          } else {
            return (
              <Typography className={classes.sentencePart} variant="subtitle1" key={idx}>{subText}</Typography>
            )
          }
        })
      }
      {
        mode === EXERCISE_COMPONENT_STATE.SUBMITTED && studentAnswer !== answer && (
          <Typography className={classes.correctAnswer} variant="subtitle1">{answer}</Typography>
        )
      }
    </div>
  );
}

FillGap.propTypes = {
  questionData: PropTypes.shape({
    text: PropTypes.string,
    answer: PropTypes.string
  }),
  studentAnswer: PropTypes.string,
  onInputChanged: PropTypes.func,
  mode: PropTypes.string
};

FillGap.defaultProps = {
  questionData: { text: "", answer: ""},
  studentAnswer: "",
  onInputChanged: () => {},
  mode: EXERCISE_COMPONENT_STATE.UNSUBMITTED
}