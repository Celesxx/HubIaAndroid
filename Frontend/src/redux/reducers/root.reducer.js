import { combineReducers } from "redux";
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import authreducer from "./auth.reducer";
import authErrorReducer from "./authError.reducer";


const persistConfig =
{
    key: 'root',
    storage,
    whitelist: ['authState', 'authError']
}

const rootReducer = combineReducers({
  authState: authreducer,
  authError: authErrorReducer,
});

export default persistReducer(persistConfig, rootReducer)
