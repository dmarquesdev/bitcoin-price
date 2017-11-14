import axios from 'axios';
import _ from 'lodash';

import { API_URL } from '../config';
import {
    FETCH_CURRENCIES_SUCCESS,
    FETCH_CURRENCIES_FAILURE,
    FETCH_PRICE_SUCCESS,
    FETCH_PRICE_FAILURE,
    START_API_CALL,
    END_API_CALL,
    SELECT_CURRENCY_TO,
    SELECT_CURRENCY_FROM
} from './constants';

export const fetchCurrencies = () => (dispatch) => {
    dispatch({
        type: START_API_CALL
    });

    axios
        .get(`${API_URL}/data/all/coinlist`)
        .then(response => {
            const data = _.keysIn(response.data.Data).map(key => {
                const value = response.data.Data[key];
                return {
                    code: key,
                    name: value.CoinName,
                    image: value.ImageUrl
                }
            });
            dispatch({
                type: FETCH_CURRENCIES_SUCCESS,
                payload: data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_CURRENCIES_FAILURE,
                payload: err
            });
        });
        dispatch({
            type: END_API_CALL
        });
}

export const fetchPrice = (value, from, to) => dispatch => {
    dispatch({
        type: START_API_CALL
    });
    let price = value || 1;
    axios
        .get(`${API_URL}/data/price?fsym=${from}&tsyms=${to}`)
        .then(response => {
            const data = [
                {
                    code: from,
                    price
                },
                {
                    code: to,
                    price: value * response.data[to]
                }
            ]
            dispatch({
                type: FETCH_PRICE_SUCCESS,
                payload: data
            });
        })
        .catch(err => {
            dispatch({
                type: FETCH_PRICE_FAILURE,
                payload: err
            });
        });
    dispatch({
        type: END_API_CALL
    });
}

export const selectCurrencyFrom = (currency) => (dispatch) => {
    dispatch({
        type: SELECT_CURRENCY_FROM,
        payload: currency
    });
}

export const selectCurrencyTo = (currency) => (dispatch) => {
    dispatch({
        type: SELECT_CURRENCY_TO,
        payload: currency
    });
}