import {
  Button, CardHeader, Grid, Paper, Typography, TextField
} from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useFormik } from 'formik';

import { getExerciseById, EXERCISE_COMPONENT_STATE } from '../../../actions/exerciseActions';
import useExerciseStyles from '../../../styles/studentComponentStyles/sExerciseStyles/exerciseStyle';
import { KEYS } from '../../../data/constants';
//import Question from './Question';

const validateForm = (values) => {
  const { name, data } = values;
  if (!name) {
    errorMap[KEYS.NAME] = "Exercise name is required";
  }
  const errors = data.reduce((errorMap, question) => {
    if (!question) {
      errorMap[id] = "Field is required";
    }
    return errorMap;
  }, {})
  return errors;
}

export default function TeacherExercise() {
  const { difficultyLevel, exerciseId } = useParams();
  const classes = useExerciseStyles();
  const dispatch = useDispatch();
  const { name = null, id = null, data = [] } = useSelector((state) => (state.exercise && state.exercise.currentExercise) || {});

  const [fullScore, setFullScore] = useState(0);
  const [componentState, setComponentState] = useState(EXERCISE_COMPONENT_STATE.UNSUBMITTED);

  const startExerciseRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      name, data
    },
    initialTouched: {},
    onSubmit: values => {
      let _fullScore = 0;
      setComponentState(EXERCISE_COMPONENT_STATE.LOADING);
      if (data) {
        data.forEach((question) => {
          const { point } = question;
          _fullScore += point;
        });
        setFullScore(_fullScore);
        setComponentState(EXERCISE_COMPONENT_STATE.SUBMITTED);
      }
    },
    validate: (values) => validateForm(values)
  });


  useEffect(() => {
    if (!id && exerciseId) {
      dispatch(getExerciseById(difficultyLevel, exerciseId));
    }
  }, []);

  const handleSetFieldValue = (field, value) => {
    //  only re-validate form when field is set, NOT when marking field as touched
    formik.setFieldTouched(field, true, false);
    formik.setFieldValue(field, value);
  };

  //const handleRetryClicked = () => {
  //  formik.handleReset();
  //  setComponentState(EXERCISE_COMPONENT_STATE.UNSUBMITTED);
  //  scrollToStart();
  //}

  //const scrollToStart = () => {
  //  //  scroll to beginning
  //  startExerciseRef.current && startExerciseRef.current.scrollIntoView();
  //}

  const renderQuestionList = () => exerciseData.map((question, idx) => {
    const { id } = question;
    const { errors = {}, touched = {} } = formik;
    const _error = errors[id] || null;
    const _isTouched = touched[id] || false;
    return <Question
      mode={componentState}
      key={id || idx}
      questionData={question}
      error={_error} isTouched={_isTouched} idx={idx} onAnswerSet={handleSetStudentAnswer} />;
  });

  const handleSaveClicked = () => {

  }

  const renderActionSection = () => {
    const _questionCount = data.length;
    const { errors = {} } = formik;
    const _isSubmitDisabled = Object.keys(errors).length > 0 || _questionCount === 0 || fullScore === 0;
    return (
      <Grid item xs={12} className={classes.actionSection}>
        {
          _isSubmitDisabled &&
          <Typography variant="h6" gutterBottom={true}>
            Number of questions: <b>{_questionCount}.</b>
            Total score: <b>{fullScore}.</b>
          </Typography>
        }
        <Button
          type="submit"
          variant="contained"
          disabled={_isSubmitDisabled}
          color="primary"
          onClick={handleSaveClicked}
        >
          Save exercise
        </Button>
      </Grid>
    )
  }

  const { values: { name: exerciseName, data: exerciseData } } = formik;

  return (
    <Paper elevation={3}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <CardHeader ref={startExerciseRef} className={classes.exerciseHeader} title={`Create new exercise`} subheader={`Difficulty: ${difficultyLevel}`} />
          </Grid>
          <Grid item xs={12} className={classes.exerciseInput}>
            <Typography variant="subtitle1">Exercise name</Typography>
            <TextField 
              id="exerciseName"
              variant="filled"
              value={exerciseName}
              onChange={({target: {value}}) => handleSetFieldValue(KEYS.NAME, value)}
              disabled={componentState !== EXERCISE_COMPONENT_STATE.UNSUBMITTED}
            />

          </Grid>
          {renderQuestionList()}
          {renderActionSection()}
        </Grid>
      </form>
    </Paper>
  );
}
