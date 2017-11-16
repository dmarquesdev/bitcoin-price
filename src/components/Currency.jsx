import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';

import { MEDIA_API } from '../../config';

class Currency extends PureComponent {
    render() {
        const {
            currency,
            currencies,
            onCurrencyChange
        } = this.props;

        console.log(currency);

        const image = currency.image !== undefined && (
            <img src={`${MEDIA_API}${currency.image}`} />
        );

        return (
            <div className="currency-container">
                <h3>{currency.code}</h3>
                {image}
                <div className="currency-info">
                    <Dropdown
                        items={currencies}
                        onChange={onCurrencyChange}
                        currentValue={currency.code}
                    />
                    <h5>{currency.price}</h5>
                </div>
            </div>
        );
    }
};

Currency.propTypes = {
    currency: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    onCurrencyChange: PropTypes.func.isRequired
};

export default Currency;