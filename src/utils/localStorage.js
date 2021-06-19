import { KEYS } from "../data/constants";

export const getLocalStorageKey = (key) => {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(`failed to get data for key ${key} in localStorage: `, err);
    return undefined;
  }
}

export const saveToLocalStorage = (key, value) => {
  try {
    if (!key || !value) return;
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (err) {
    console.log(`Failed to save data ${value} to localStorage for key ${key}: ${err}`)
  }
}

export const getUserInfoFromLocalStorage = () => {
  return getLocalStorageKey(KEYS.USER_INFO) || {
    userName: '',
    userEmail: '',
    userRole: ''
  }
}