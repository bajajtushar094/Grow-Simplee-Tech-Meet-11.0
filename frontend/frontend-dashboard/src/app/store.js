import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import riderReducer from '../features/rider/riderSlice';
import auth from '../redux/reducers/auth';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    rider: riderReducer,
    auth: auth,
  },
});
