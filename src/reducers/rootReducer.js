import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import loginReducer from './loginSlice';
import exerciseReducer from './exerciseSlice';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  login: loginReducer,
  exercise: exerciseReducer,
});
export default createRootReducer;
