import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    coursesByTeacherId: [],
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
            state.coursesByTeacherId = action.payload;
        },
    }
});

export const { setSelectedCourse, clearSelectedCourse, coursesByTeacher} = courseSlice.actions;
export default courseSlice.reducer;
