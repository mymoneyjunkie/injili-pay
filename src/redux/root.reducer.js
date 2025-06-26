import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/user.reducer';
import languageReducer from './language/language.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'language']
}

const rootReducer = combineReducers({
	user: userReducer,
	language: languageReducer
});

export default persistReducer(persistConfig, rootReducer);