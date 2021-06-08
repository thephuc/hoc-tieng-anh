import { push } from 'connected-react-router';
import { setUserInfo } from '../reducers/loginSlice';

export const login = ({ email, password }) => (dispatch) => {
  // if (email === "admin@gmail.com") {
  dispatch(setUserInfo({
    payload: {
      userName: 'admin',
      userEmail: email,
    },
  }));
  dispatch(push('/student'));
  // }
};
