import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  question_set : [],
  answer_set: {}
}

export const examSlice = createSlice({
  name: 'exam',
  initialState,
  reducers: {
    setQuestionSet: (state, action) => {
      state.question_set = action.payload.question_set
    },
    setAnswerSet: (state, action) => {
      state.answer_set = action.payload.answer_set
    },
    setGivenAnswer: (state, action) => {
     state.question_set.find((item) => item.question_id == action.payload.question_id).given_answer_id = action.payload.given_answer_id
    }
  },
})

export const { setQuestionSet,setAnswerSet,setGivenAnswer } = examSlice.actions

export default examSlice.reducer