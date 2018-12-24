import path from 'object-path';
import translations from './languages';
import { language } from '../config'

const PARAM_PLACEHOLDER = '%s';

let currentLanguage = language;
let currentTranslation = translations[language] || translations.en;

function t(key, ...args) {
  const value = path.get(currentTranslation, key);
  if (!value) {
    return key;
  }
  if (args && args.length) {
    return args.reduce((acc, arg) =>
      acc.replace(PARAM_PLACEHOLDER, arg),
    value);
  }
  return value;
}

function setCurrentLanguage(lang) {
  currentLanguage = lang;
  currentTranslation = translations[lang] || translations.en;
}

export default {
  t,
  getCurrentLanguage: () => currentLanguage,
  setCurrentLanguage,
}
