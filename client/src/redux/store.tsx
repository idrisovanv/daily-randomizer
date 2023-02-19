import { configureStore } from '@reduxjs/toolkit';
import { developersApi } from 'api/developers.api';
import { teamsApi } from 'api/teams.api';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const configureAppStore = (initialState = {}) => {

  const middleware = [
    developersApi.middleware, 
    teamsApi.middleware
  ];

  const store = configureStore({
    reducer: {
      [developersApi.reducerPath]: developersApi.reducer,
      [teamsApi.reducerPath]: teamsApi.reducer,
    },
    middleware: (gDM) => gDM().concat([...middleware]),
    preloadedState: initialState,
    devTools: process.env.NODE_ENV !== 'production',
  });

  return store;
};

export const store = configureAppStore();

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
