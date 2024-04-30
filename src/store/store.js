// store.js
import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice'; 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: storage,
  whiteList:['imageReducer']
}
const persistedReducer = persistReducer(persistConfig, imageReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store)
