import { createSlice } from '@reduxjs/toolkit';
import { getUserInfoFromLocalStorage } from '../utils/localStorage';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    userInfo: {
      userName: getUserInfoFromLocalStorage().userName,
      userEmail: getUserInfoFromLocalStorage().userEmail,
      userRole: getUserInfoFromLocalStorage().userRole
    },
  },
  reducers: {
    setUserName: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.userInfo.userName = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, setUserInfo } = loginSlice.actions;

export default loginSlice.reducer;
