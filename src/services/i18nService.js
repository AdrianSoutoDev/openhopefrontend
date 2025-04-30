import messages from '../assets/i18n/messages';

export const initI18n = () => {
    let locale = (navigator.languages && navigator.languages[0]) ||
        navigator.language || navigator.userLanguage || 'es'

    const localeWithoutRegionCode = locale.toLowerCase().split(/[_-]+/)[0]
    
    const localeMessages = messages[locale] || 
        messages[localeWithoutRegionCode] || messages['es']

    locale = localeMessages === messages['es'] ? 'es' : locale

    return {locale, messages: localeMessages}
}