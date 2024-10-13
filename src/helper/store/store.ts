import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {useSelector, useDispatch} from 'react-redux';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authReducer} from './slices/auth.slice';
import {settingAppReducer} from './slices/app.slice';
import {MemoryStorage} from './memoryStorage';
import {sortReducer} from './slices/sort.slice';

const persistAsyncStorage = {
  key: 'persistAsyncStorage',
  version: 1,
  storage: AsyncStorage,
};

const memoryStorage = new MemoryStorage();

const persistMemory = {
  key: 'persistMemory',
  version: 1,
  storage: memoryStorage,
};

const rootReducer = combineReducers({
  auth: persistReducer(persistAsyncStorage, authReducer),
  app: persistReducer(persistAsyncStorage, settingAppReducer),
  sort: persistReducer(persistMemory, sortReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export type AppStore = typeof store;
export const persistor = persistStore(store);
