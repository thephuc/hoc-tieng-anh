import { push } from 'connected-react-router';
import { KEYS } from '../data/constants';
import { setUserInfo } from '../reducers/loginSlice';
import { getUserInfoFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

export const login = ({ email, password, role }) => (dispatch) => {
  // if (email === "admin@gmail.com") {
  const payload = {
    userName: 'admin',
    userEmail: email,
    userRole: role
  }
  dispatch(setUserInfo({payload}));
  saveToLocalStorage(KEYS.USER_INFO, payload);
  dispatch(push('/'));
  // }
};

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch(push('/login'))
}