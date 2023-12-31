import { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const LocaleContext = createContext(null);

export function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => localStorage.getItem("locale") || "id");

  const toggleLocale = () => {
    setLocale((prev) => {
      const next = prev === "id" ? "en" : "id";
      localStorage.setItem("locale", next);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      locale,
      toggleLocale,
    }),
    [locale]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useLocaleContext() {
  return useContext(LocaleContext);
}

export default LocaleContext;
