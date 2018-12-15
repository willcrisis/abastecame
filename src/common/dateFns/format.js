import format from 'date-fns/format';
import en from 'date-fns/locale/en'
import pt from 'date-fns/locale/pt'
import { language } from '../../config';

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

export default (date, formatStr) => {
  const locale = locales[language] || locales.en;
  return format(date, formatStr || locale.formatStr, {
    locale: locale.locale,
  })
}
