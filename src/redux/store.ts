import {configureStore} from '@reduxjs/toolkit';
import gameReducer from './slices/gameSlice';

console.log('Configuring store...');

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Add store subscription for debugging
store.subscribe(() => {
  console.log('Store updated:', store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
