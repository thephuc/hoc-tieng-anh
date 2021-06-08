import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice = createSlice({
  name: 'exercise',
  initialState: {
    selectedDifficultyLevel: '',
    currentExercise: {
      id: '',
      name: '',
      difficultyLevel: '',
      data: [],
    },
    exerciseMap: {},
  },
  reducers: {
    setCurrentExerciseData: (state, action) => {
      state.currentExercise = action.payload;
    },
    setExerciseMapData: (state, action) => {
      console.log(action);
      state.exerciseMap = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentExerciseData, setExerciseMapData } = exerciseSlice.actions;

export default exerciseSlice.reducer;
