import React from 'react';
import { connect } from 'react-redux';
import { setLanguage } from '../../redux/language/language.actions';

const LanguageSwitch = ({ currentLanguage, setLanguage, showFullNames = false }) => {
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <select 
      className="bg-transparent border border-gray-700 text-white p-2 rounded-md focus:outline-none text-sm cursor-pointer"
      value={currentLanguage}
      onChange={handleLanguageChange}
    >
      <option value="en" className="bg-black text-white">
        {showFullNames ? "English" : "en"}
      </option>
      <option value="es" className="bg-black text-white">
        {showFullNames ? "Spanish" : "sp"}
      </option>
    </select>
  );
};

const mapStateToProps = state => ({
  currentLanguage: state.language.currentLanguage
});

const mapDispatchToProps = {
  setLanguage
};

export default connect(mapStateToProps, mapDispatchToProps)(LanguageSwitch); 