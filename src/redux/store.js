import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import authSlice from './slice/authSlice'
import examSlice from './slice/examSlice'
import { persistReducer,FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}
const reducer = combineReducers({
  "auth" : authSlice,
  "exam" : examSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)


export const store = configureStore({
  reducer: {
    "reducer" : persistedReducer,    
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export default store