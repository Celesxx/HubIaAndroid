import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { persistStore } from "redux-persist"
import thunk from "redux-thunk";
import rootReducer from "./reducers/root.reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store)

export default {store, persistor};