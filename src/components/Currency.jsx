import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    FormattedNumber,
    FormattedDate
} from 'react-intl';

import Dropdown from './Dropdown';

class Currency extends PureComponent {
    render() {
        const {
            currency,
            currencies,
            onCurrencyChange,
            date
        } = this.props;

        const image = currency.image !== undefined && (
            <img
                src={currency.image}
                className="image"
            />
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
                    <h4>
                        <FormattedDate
                            value={date}
                        />
                    </h4>
                    <h5>
                        <FormattedNumber
                            value={currency.price}
                            style="currency"
                            currency={currency.code}
                        />
                    </h5>
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