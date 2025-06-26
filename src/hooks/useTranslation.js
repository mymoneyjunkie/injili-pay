import { useSelector } from 'react-redux';
import translations from '../translations/index';

const useTranslation = () => {
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  
  const t = (key) => {
    if (!translations[currentLanguage]) {
      return key; // Fallback to key if language not found
    }
    
    return translations[currentLanguage][key] || key; // Fallback to key if translation not found
  };
  
  return { t, currentLanguage };
};

export default useTranslation; 