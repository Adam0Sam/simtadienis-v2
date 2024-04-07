import React, { useState, useContext } from 'react';

import { IntlProvider } from "react-intl";
import English from '../languages/en.json';
import Lithuanian from '../languages/lt.json';

const LanguageContext = React.createContext();
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error(`useLanguage must be used within a LanguageProvider`);
    }
    return context;
}

export default function LanguageProvider({ children }) {
    const existingLocales = ['en', 'lt'];
    let initialLocale = navigator.language.substring(0, 2);
    if (!existingLocales.includes(initialLocale)) {
        initialLocale = 'en';
    }
    const messages = {
        'en': English,
        'lt': Lithuanian
    };

    const [locale, setLocale] = useState(initialLocale);
    const changeLocale = (selectedLocale) => setLocale(selectedLocale);

    return (
        <LanguageContext.Provider value={{ locale, changeLocale }}>
            <IntlProvider messages={messages[locale]} locale={locale}>
                {children}
            </IntlProvider>
        </LanguageContext.Provider>

    )
}