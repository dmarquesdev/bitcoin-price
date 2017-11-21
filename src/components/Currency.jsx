import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';

class Currency extends PureComponent {
    render() {
        const {
            currency,
            currencies,
            onCurrencyChange
        } = this.props;

        console.log(currency);

        const image = currency.image !== undefined && (
            <img
                src={currency.image}
                className="image"
            />
        );

        const date = new Date().toString();

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
                    <h6>{date}</h6>
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