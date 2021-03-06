import axios from 'axios';
import _ from 'lodash';

import { API_URL, MEDIA_URL } from '../config';
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

export const fetchCryptoCurrencies = () => (dispatch) => {
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
                    image: `${MEDIA_URL}${value.ImageUrl}`
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

export const fetchPrice = (from, to) => dispatch => {
    dispatch({
        type: START_API_CALL
    });
    axios
        .get(`${API_URL}/data/price?fsym=${from}&tsyms=${to}`)
        .then(response => {
            const data = [
                {
                    code: from,
                    price: 1
                },
                {
                    code: to,
                    price: response.data[to]
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

export const fetchCurrencyInfo = currency => dispatch => {
    dispatch({
        type: START_API_CALL
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

export const getUserLocation = () => {
    dispatch({
        type: START_API_CALL
    });
    axios
        .get(`${IP_API}`)
        .then(response => {
            dispatch({
                type: GET_USER_LOCATION_SUCCESS,
                payload: response.data.countryCode
            });
        })
        .catch(err => {
            dispatch({
                type: GET_USER_LOCATION_FAILURE,
                payload: err
            });
        });
    dispatch({
        type: END_API_CALL
    });
}