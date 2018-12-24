import format from 'date-fns/format';
import en from 'date-fns/locale/en'
import pt from 'date-fns/locale/pt'
import I18n from '../../i18n';

const locales = {
  en: {
    locale: en,
    formatStr: 'MM/DD/YYYY'
  },
  pt: {
    locale: pt,
    formatStr: 'DD/MM/YYYY'
  },
}

const currentLanguage = I18n.getCurrentLanguage();

export default (date, formatStr) => {
  const locale = locales[currentLanguage] || locales.en;
  return format(date, formatStr || locale.formatStr, {
    locale: locale.locale,
  })
}
