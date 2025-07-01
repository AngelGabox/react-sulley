import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('token');
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
});

export const { setUser, logoutUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
