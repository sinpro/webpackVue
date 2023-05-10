import VueI18n from 'vue-i18n';
import Vue from 'vue';

import locale from 'element-ui/src/locale'
import localeLib from 'element-ui/lib/locale'

Vue.use(VueI18n);
import sc from "./lang/sc";
import tc from "./lang/tc";
import en from "./lang/en";
const i18n = new VueI18n({
  locale: window.localStorage.getItem("lang") || "sc",
  fallbackLocale: 'sc',
  messages: {
    'sc':sc,
    'tc':tc,
    'en':en
  },
  silentTranslationWarn: true
});

locale.i18n((key, value) => i18n.t(key, value))
localeLib.i18n((key, value) => i18n.t(key, value))


export default i18n

