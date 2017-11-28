import _ from 'lodash';
import { combineReducers } from 'redux';
import { intlReducer } from 'react-intl-redux';

import {
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAILURE,
    SELECT_CURRENCY_FROM,
    SELECT_CURRENCY_TO,
    START_API_CALL,
    END_API_CALL
} from './constants';

import { MEDIA_URL } from '../config';

const language = (navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const currencies = [
    {
        code: 'BRL',
        regionCode: 'pt',
        name: 'Real',
        image: 'http://sincorgo.com.br/wp-content/uploads/2014/09/reais.jpg'
    },
    {
        code: 'USD',
        regionCode: 'us',
        name: 'Dolar',
        image: 'http://euqueru.net/wp-content/uploads/2010/08/dolar2.jpg'
    },
    {
        code: 'EUR',
        regionCode: 'es',
        name: 'Euro',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Euro_coins_and_banknotes.jpg/220px-Euro_coins_and_banknotes.jpg'
    }
];

const INITIAL_STATE = {
    from: {
        code: 'BTC',
        name: 'Bitcoin',
        image: `${MEDIA_URL}/media/19633/btc.png`,
        price: 1
    },
    to: _.find(currencies, c => c.regionCode === languageWithoutRegionCode),
    cryptoList: [],
    regularList: currencies
};

const currencyReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_CURRENCIES_SUCCESS:
            return { ...state, cryptoList: action.payload };
        case FETCH_CURRENCIES_FAILURE:
            return { ...state, cryptoList: [] };
        case FETCH_PRICE_SUCCESS:
            const result = action.payload;
            return { ...state, from: _.assignIn({}, state.from, result[0]), to: _.assignIn({}, state.to, result[1]) };
        case FETCH_PRICE_FAILURE:
            return { ...state, from: INITIAL_STATE.from, to: INITIAL_STATE.to };
        case SELECT_CURRENCY_FROM:
            const from = _.find(state.cryptoList, { code: action.payload });
            return { ...state, from: _.assignIn({}, state.from, from) };
        case SELECT_CURRENCY_TO:
            const to = _.find(state.regularList, { code: action.payload });
            return { ...state, to: _.assignIn({}, state.to, to) };
        default:
            return state;
    }
};

const apiState = {
    isLoading: false
};

const apiReducer = (state = apiState, action) => {
    switch(action.type) {
        case START_API_CALL:
            return { ...state, isLoading: true }
        case END_API_CALL:
            return { ...state, isLoading: false }
        default:
            return state
    }
};

export default combineReducers({
    currency: currencyReducer,
    api: apiReducer,
    intl: intlReducer
});