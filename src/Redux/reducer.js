const initialState = {
    user: '',
    contacts: [],
    chat: '',
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        currentChat: (state, action) => {
            state.chat = action.payload;
        },
    },
    extraReducers: (builder) => {
    builder
    .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Error al obtener usuario';
    });
},
});

export const { setUser, currentChat } = userSlice.actions;
export default userSlice.reducer;