import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';

import { API_URL } from '../../config';

class Currency extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { value: (this.props.currency.price || 1) };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        this.setState({ value: event.target.value }); 
        this.props.onValueChange(this.state.value);
    }

    render() {
        const {
            currency,
            currencies,
            onCurrencyChange,
            onValueChange
        } = this.props;
        return (
            <div className="currency-container">
                <h3>{currency.code}</h3>
                <img src={`${API_URL}/${currency.image}`} />
                <div className="currency-info">
                    <Dropdown
                        items={currencies}
                        onChange={onCurrencyChange}
                        currentValue={currency.code}
                    />
                    <input
                        className="currency-value"
                        type="text"
                        value={this.state.value}
                        onChange={this.handleValueChange}
                    />
                </div>
            </div>
        );
    }
};

Currency.propTypes = {
    currency: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    onCurrencyChange: PropTypes.func.isRequired,
    onValueChange: PropTypes.func.isRequired
};

export default Currency;