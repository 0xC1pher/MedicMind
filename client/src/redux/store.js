import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

// Combine your reducers
const rootReducer = combineReducers({
    user: userReducer,
});

// Persist configuration
const persistConfig = {
    key: 'root', // Key for the root level of storage
    storage,     // Storage engine
    version: 1,  // Versioning (optional)
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
export const store = configureStore({
    reducer: persistedReducer, // Use persisted reducer here
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializability check for redux-persist
        }),
});

// Create persistor instance
export const persistor = persistStore(store);
