import { configureStore } from '@reduxjs/toolkit';
import locatorReducer from './slices/locationSlice';

export default configureStore({
  reducer: {
    locator: locatorReducer
  }
})