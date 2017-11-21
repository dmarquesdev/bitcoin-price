import _ from 'lodash';
import { combineReducers } from 'redux';

import {
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAILURE,
    SELECT_CURRENCY_FROM,
    SELECT_CURRENCY_TO,
    GET_USER_LOCATION_SUCCESS
} from './constants';

import { MEDIA_URL } from '../config';

const INITIAL_STATE = {
    from: {
        code: 'BTC',
        name: 'Bitcoin',
        image: `${MEDIA_URL}/media/19633/btc.png`,
        price: 1
    },
    to: {
        code: 'BRL',
        name: 'Real',
        image: 'http://sincorgo.com.br/wp-content/uploads/2014/09/reais.jpg',
        price: 23000
    },
    cryptoList: [],
    regularList: [
        {
            code: 'BRL',
            name: 'Real',
            image: 'http://sincorgo.com.br/wp-content/uploads/2014/09/reais.jpg'
        },
        {
            code: 'USD',
            name: 'US Dollar',
            image: 'https://2.bp.blogspot.com/_iC4-uGwan-s/TDcHjiuG-SI/AAAAAAAABmo/JLagbXPWwSA/s1600/United_States_one_dollar_bill,_obverse.jpg'
        }
    ],
    location: 'BR' 
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
        case GET_USER_LOCATION_SUCCESS:
            return { ...state, location: action.payload };
        default:
            return state;
    }
};

export default combineReducers({
    currency: currencyReducer
});