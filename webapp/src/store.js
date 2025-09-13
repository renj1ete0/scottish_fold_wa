import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import keplerGlReducer, { enhanceReduxMiddleware } from '@kepler.gl/reducers';
import appReducer from './app-reducer';

// Combine the reducers
const reducers = combineReducers({
  keplerGl: keplerGlReducer,
  app: appReducer,
});

// Set up middleware for Kepler.gl
const middlewares = enhanceReduxMiddleware([]); // You can add additional middleware if needed

// Create enhancers (for applying middleware)
const enhancers = [applyMiddleware(...middlewares)];

// Create the store with the combined reducers and enhancers
const store = createStore(reducers, {}, compose(...enhancers));

// Export the store
export default store;