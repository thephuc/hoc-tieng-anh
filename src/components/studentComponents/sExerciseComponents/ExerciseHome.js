import { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentExercise, getExerciseMapData } from '../../../actions/exerciseActions';
import useExerciseStyles from '../../../styles/studentComponentStyles/sExerciseStyles/exerciseStyle';

export default function ExerciseHome() {
  const classes = useExerciseStyles();
  const dispatch = useDispatch();
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [selectedExerciseId, setSelectedExerciseId] = useState('');
  const exerciseMap = useSelector((state) => (state.exercise && state.exercise.exerciseMap) || {});

  const handleDifficultyLevelSelected = ({ target: { value } }) => {
    setDifficultyLevel(value);
  };

  const handleExerciseSelected = ({ target: { value } }) => {
    setSelectedExerciseId(value);
  };

  const handleStartButtonClicked = () => {
    dispatch(setCurrentExercise(difficultyLevel, selectedExerciseId));
  };

  useEffect(() => {
    dispatch(getExerciseMapData());
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Please select a difficulty level</FormLabel>
          <RadioGroup className={classes.difficultyLevelRadio} aria-label="level" name="levelRadio" value={difficultyLevel} onChange={handleDifficultyLevelSelected}>
            {
              Object.keys(exerciseMap).map((key) => (
                <FormControlLabel key={key} value={key} control={<Radio color="primary" />} label={key} />
              ))
            }
          </RadioGroup>
        </FormControl>
      </Grid>

      {
        difficultyLevel && exerciseMap[difficultyLevel]
        && (
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Please select an exercise</FormLabel>
            <RadioGroup className={classes.difficultyLevelRadio} aria-label="exercise" name="exerciseRadio" value={selectedExerciseId} onChange={handleExerciseSelected}>
              {
                exerciseMap[difficultyLevel].map((exercise) => (
                  <FormControlLabel key={exercise.id} value={exercise.id} control={<Radio color="primary" />} label={exercise.name} />
                ))
              }
            </RadioGroup>
          </FormControl>
        </Grid>
        )
      }
      <Grid item xs={12}>
        <Button
          variant="contained"
          disabled={!selectedExerciseId}
          color="primary"
          className={classes.button}
          onClick={handleStartButtonClicked}
        >
          Start exercise
        </Button>
      </Grid>
    </Grid>
  );
}
