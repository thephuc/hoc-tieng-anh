import { configureStore } from '@reduxjs/toolkit'
import loginReducer from "../src/reducers/loginSlice";

export default configureStore({
  reducer: {
    login: loginReducer
  }
});