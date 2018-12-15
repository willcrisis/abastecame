import { Platform, NativeModules } from 'react-native';

export const isAndroid = Platform.OS === 'android'
export const locale = isAndroid
  ? NativeModules.I18nManager.localeIdentifier
  : NativeModules.SettingsManager.settings.AppleLocale;
export const language = locale.substring(0, 2);

export default {
  isAndroid,
  locale,
  language,
};
