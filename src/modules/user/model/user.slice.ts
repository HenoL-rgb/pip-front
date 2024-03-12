import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  role: '',
  isAuth: false,
  name: '',
  avatar: null,
  _inited: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData(state, action) {
      state = { ...state, ...action.payload };
    },
    setAuthorized(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    initAuthData(state) {
      const user = localStorage.getItem('user');
      if (user) {
        state.isAuth = true;
      }
      state._inited = true;
    },
    logout(state) {
      localStorage.removeItem('user');
      return { ...initialState, _inited: true };
    },
  },
});

export default userSlice.reducer;
export const { actions: userActions } = userSlice;
