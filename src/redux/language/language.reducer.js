import { LanguageActionTypes } from './language.types';

const INITIAL_STATE = {
  currentLanguage: 'en' // Default to Spanish
};

const languageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LanguageActionTypes.SET_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload
      };
    default:
      return state;
  }
};

export default languageReducer; 