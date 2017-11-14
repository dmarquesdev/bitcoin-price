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
        name: 'Bitcoin'
    },
    to: {
        code: 'BRL',
        name: 'Real'
    },
    cryptoList: [],
    regularList: [
        {
            code: 'BRL',
            name: 'Real'
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
            return { ...state, from: _.merge(state.from, result[0]), to: _.merge(state.to, result[1]) };
        case FETCH_PRICE_FAILURE:
            return { ...state, from: INITIAL_STATE.from, to: INITIAL_STATE.to };
        case SELECT_CURRENCY_FROM:
            return { ...state, from: action.payload };
        case SELECT_CURRENCY_TO:
            return { ...state, to: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    currency: currencyReducer
});