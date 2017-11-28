import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import messages from '../locales/data.json';

import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';

addLocaleData([...en, ...es, ...pt]);

const language = (navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const INITIAL_STORE = {
    intl: {
        defaultLocale: 'pt',
        locale: languageWithoutRegionCode,
        messages: messages[languageWithoutRegionCode]
    } 
};
const store = createStore(reducers, INITIAL_STORE, applyMiddleware(ReduxThunk));

export default store;