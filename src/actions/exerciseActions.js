import { push } from 'connected-react-router';
import { MOCK_EXERCISE_MAP } from '../data/mockData/exerciseMap';
import { setCurrentExerciseData, setExerciseMapData } from '../reducers/exerciseSlice';

export const EXERCISE_COMPONENT_STATE = {
  UNSUBMITTED: "UNSUBMITTED",
  LOADING: "LOADING",
  SUBMITTED: "SUBMITTED"
}

export const setCurrentExercise = ({difficultyLevel, exerciseId, userRole, redirect}) => (dispatch) => {
  if (exerciseId && difficultyLevel && MOCK_EXERCISE_MAP[difficultyLevel]) {
    const exerciseData = MOCK_EXERCISE_MAP[difficultyLevel].find((data) => data.id === exerciseId);
    if (exerciseData) {
      dispatch(setCurrentExerciseData(exerciseData));
      if (redirect) {
        dispatch(redirectToExercise({difficultyLevel, exerciseId, userRole}));
      }
    }
  }
};

export const redirectToExercise = ({difficultyLevel, exerciseId, userRole}) => (dispatch, getState) => {
  if (!difficultyLevel) return;
  let _userRole = userRole;
  if (!_userRole) {
    _userRole = getState().login?.userInfo?.userRole;
  }
  if (_userRole) {
    dispatch(push(`/${_userRole}/difficulty/${difficultyLevel}/exercise/${exerciseId ? exerciseId : 'new'}`));
  }
}

export const createNewExercise = (difficultyLevel) => (dispatch) => {
  dispatch(setCurrentExerciseData({id: '', name: '', difficultyLevel, data: []}));
  dispatch(redirectToExercise({difficultyLevel}));
}

const getMockExerciseData = () => setTimeout(() => MOCK_EXERCISE_MAP, 1000);

export const getExerciseMapData = () => (dispatch) => {
  const data = MOCK_EXERCISE_MAP;
  // const data = await getMockExerciseData();
  dispatch(setExerciseMapData(data));
};

export const getExerciseById = (difficultyLevel, exerciseId) => (dispatch) => {
  dispatch(getExerciseMapData());
  dispatch(setCurrentExercise({difficultyLevel, exerciseId}));
};
