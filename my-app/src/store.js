import { configureStore, createSlice } from '@reduxjs/toolkit'

// Action Creator

//export const userLogin = createAction('user/auth')

// Reducer 

const loginSlice = createSlice({
  name: 'login',
  initialState: {},
  reducers: {
    authSuccessful: (state, action) => {
      state.isAuth = true
      state.email = action.payload.email
      state.id = action.payload.id
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    },
    authFailed: (state) => {
      state.isAuth = false
      state.isRemember = false
    },
    resetState: (state) => {
      state.email = ''
      state.firstName = ''
      state.lastName =  ''
      state.isAuth = false
    },
    editState: (state) => {
      state.isEdit = !state.isEdit
    },
  }
})


export const {authSuccessful, authFailed, resetState, editState} =  loginSlice.actions

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer
  }
})