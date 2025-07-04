import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coursesByTeacher: [],
    selectedCourse: null,
};

export const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setSelectedCourse: (state, action) => {
        state.selectedCourse = action.payload;
        },
        clearSelectedCourse: (state) => {
        state.selectedCourse = null;
        },
        coursesByTeacher: (state, action) => {
            state.coursesByTeacher = action.payload;
        },
    }
});

export const { setSelectedCourse, clearSelectedCourse, coursesByTeacher} = courseSlice.actions;
export default courseSlice.reducer;
