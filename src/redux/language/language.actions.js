import { LanguageActionTypes } from './language.types';
 
export const setLanguage = language => ({
  type: LanguageActionTypes.SET_LANGUAGE,
  payload: language
}); 