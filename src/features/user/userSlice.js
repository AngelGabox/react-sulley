import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { user, access, refresh } = action.payload
      if (user) state.user = user
      if (access) state.access = access
      if (refresh) state.refresh = refresh
    },
    logoutUser(state) {
      state.user = null
      state.access = null
      state.refresh = null
      localStorage.removeItem('access')
      localStorage.removeItem('refresh')
      sessionStorage.removeItem('user')
    },

  },
});

export const { setCredentials, logoutUser } = userSlice.actions;
export default userSlice.reducer;
