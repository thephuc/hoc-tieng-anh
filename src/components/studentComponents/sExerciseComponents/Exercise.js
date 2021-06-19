import {
  Button, CardHeader, Grid, Paper, Typography,
} from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFormik } from 'formik';
import { getExerciseById, EXERCISE_COMPONENT_STATE } from '../../../actions/exerciseActions';
import useExerciseStyles from '../../../styles/studentComponentStyles/sExerciseStyles/exerciseStyle';
import Question from './Question';

const validateForm = (values, exerciseData= []) => {
  const errors = exerciseData.reduce((errorMap, question) => {
    const { id } = question;
    if (!(id in values)) {
      errorMap[id] = "Please attempt this question";
    }
    return errorMap;
  }, {})
  return errors;
}

export default function Exercise() {
  const { difficultyLevel, exerciseId } = useParams();
  const classes = useExerciseStyles();
  const dispatch = useDispatch();
  const { name = null, id = null, data = [] } = useSelector((state) => (state.exercise && state.exercise.currentExercise) || {});

  const [studentScore, setStudentScore] = useState(0);
  const [fullScore, setFullScore] = useState(0);
  const [componentState, setComponentState] = useState(EXERCISE_COMPONENT_STATE.UNSUBMITTED);

  const startExerciseRef = useRef(null); 

  const formik = useFormik({
    initialValues: {},
    initialTouched: {},
    onSubmit: values => {
      let _studentScore = 0;
      let _fullScore = 0;
      setComponentState(EXERCISE_COMPONENT_STATE.LOADING);
      if (data) {
        data.forEach((question) => {
          const { id, answer, point } = question;
          _fullScore += point;
          if (id && values[id] && values[id] === answer) {
            _studentScore += point; 
          }
        });
        setStudentScore(_studentScore);
        setFullScore(_fullScore);
        setComponentState(EXERCISE_COMPONENT_STATE.SUBMITTED);
      }
    },
    validate: (values) => validateForm(values, data)
  });


  useEffect(() => {
    if (!id) {
      dispatch(getExerciseById(difficultyLevel, exerciseId));
    }
  }, []);

  const handleSetStudentAnswer = (questionId, studentAnswer) => {
    //  only re-validate form when field is set, NOT when marking field as touched
    formik.setFieldTouched(questionId, true, false);
    formik.setFieldValue(questionId, studentAnswer);
  };

  const handleRetryClicked = () => {
    formik.handleReset();
    setStudentScore(0);
    setComponentState(EXERCISE_COMPONENT_STATE.UNSUBMITTED);
    scrollToStart();
  }

  const scrollToStart = () => {
    //  scroll to beginning
    startExerciseRef.current && startExerciseRef.current.scrollIntoView();
  }

  const renderQuestionList = () => data.map((question, idx) => {
    const { id } = question;
    const { values = {}, errors = {}, touched = {} } = formik;
    const _studentAnswer = values[id] || "";
    const _error = errors[id] || null;
    const _isTouched = touched[id] || false;
    return <Question 
    mode={componentState}
    key={id} 
    questionData={question} 
    error={_error} isTouched={_isTouched} idx={idx} studentAnswer={_studentAnswer} onAnswerSet={handleSetStudentAnswer} />;    
  });

  const highlightUnfinishedQuestions = () => {
    //  mark all fields as touched so that highlights can be applied for unfinished questions
    data.forEach((question) => {
      if (question.id) {
        formik.setFieldTouched(question.id, true, false);
      }
    })
    formik.validateForm();
    scrollToStart();
  }

  const renderActionSection = () => {
    switch(componentState) {
      case EXERCISE_COMPONENT_STATE.UNSUBMITTED: {
        const _questionCount = data.length;
        const { values = {}, errors = {} } = formik;
        const _attemptedCount = Object.keys(values).length;
        const _isSubmitDisabled = Object.keys(errors).length > 0 || _attemptedCount !== _questionCount;
        return (
          <Grid item xs={12} className={classes.actionSection}>
            {
              _isSubmitDisabled && 
              <Typography variant="h6" gutterBottom={true}>
                You have attempted <b>{_attemptedCount}/{_questionCount}</b> question(s). 
                Click <a className={classes.highlightUnfinished} onClick={highlightUnfinishedQuestions}>here</a> to highlight unfinished question(s)
            </Typography>
            }
            <Button
              type="submit"
              variant="contained"
              disabled={_isSubmitDisabled}
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        )
      }
      case EXERCISE_COMPONENT_STATE.SUBMITTED: {
        return (
          <Grid item xs={12} className={classes.actionSection}>
            <Typography variant="h6" gutterBottom={true}>Your score is <b>{studentScore}/{fullScore}</b></Typography>
            <Button
              variant="contained"
              onClick={handleRetryClicked}
              // disabled={!selectedExerciseId}
              //color="secondary"
              //className={classes.button}
            >
              Retry
            </Button>
          </Grid>
        )
      }

    }
  }


  if (!id) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">No exercise data found</Typography>
        </Grid>
      </Grid>
    );
  }

  return (

    <Paper elevation={3}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardHeader ref={startExerciseRef} className={classes.exerciseHeader} title={`Exercise ${name}`} subheader={`Difficulty: ${difficultyLevel}`} />
          </Grid>
          {renderQuestionList()}
          {renderActionSection()}
        </Grid>
      </form>
    </Paper>
  );
}
