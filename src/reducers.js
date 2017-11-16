import _ from 'lodash';
import { combineReducers } from 'redux';

import {
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAILURE,
    SELECT_CURRENCY_FROM,
    SELECT_CURRENCY_TO
} from './constants';

const INITIAL_STATE = {
    from: {
        code: 'BTC',
        name: 'Bitcoin',
        image: '/media/19633/btc.png',
        price: 1
    },
    to: {
        code: 'BRL',
        name: 'Real',
        price: 23000
    },
    cryptoList: [],
    regularList: [
        {
            code: 'BRL',
            name: 'Real'
        },
        {
            code: 'USD',
            name: 'US Dollar'
        }
    ]
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

export default combineReducers({
    currency: currencyReducer
});