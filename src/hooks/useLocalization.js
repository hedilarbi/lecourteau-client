// localization.js
import { useEffect, useState } from "react";
import * as Localization from "expo-localization";
import I18n from "i18n-js";
import { Translation } from "../constants";

const useLocalization = () => {
  const [locale, setLocale] = useState(Localization.locale);

  useEffect(() => {
    const i18n = new I18n(Translation);
    i18n.locale = Localization.locale;
    i18n.enableFallback = true;
  }, [locale]);

  return { locale, setLocale, t: I18n.t };
};

export default useLocalization;
