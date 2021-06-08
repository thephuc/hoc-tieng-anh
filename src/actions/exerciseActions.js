import { push } from 'connected-react-router';
import { MOCK_EXERCISE_MAP } from '../data/mockData/exerciseMap';
import { setCurrentExerciseData, setExerciseMapData } from '../reducers/exerciseSlice';

export const EXERCISE_COMPONENT_STATE = {
  UNSUBMITTED: "UNSUBMITTED",
  LOADING: "LOADING",
  SUBMITTED: "SUBMITTED"
}

export const setCurrentExercise = (difficultyLevel, exerciseId) => (dispatch) => {
  if (exerciseId && difficultyLevel && MOCK_EXERCISE_MAP[difficultyLevel]) {
    const exerciseData = MOCK_EXERCISE_MAP[difficultyLevel].find((data) => data.id === exerciseId);
    if (exerciseData) {
      dispatch(setCurrentExerciseData(exerciseData));
      dispatch(push(`/student/difficulty/${difficultyLevel}/exercise/${exerciseId}`));
    }
  }
};

const getMockExerciseData = () => setTimeout(() => MOCK_EXERCISE_MAP, 1000);

export const getExerciseMapData = () => (dispatch) => {
  const data = MOCK_EXERCISE_MAP;
  // const data = await getMockExerciseData();
  dispatch(setExerciseMapData(data));
};

export const getExerciseById = (difficultyLevel, exerciseId) => (dispatch) => {
  dispatch(getExerciseMapData());
  dispatch(setCurrentExercise(difficultyLevel, exerciseId));
};
