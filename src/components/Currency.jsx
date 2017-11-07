import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';

class Currency extends PureComponent {
    constructor(props) {
        super(props);

        this.state = { value: this.props.price };
        this.handleValueChange = this.handleValueChange.bind(this);
    }

    handleValueChange(event) {
        this.setState({ value: event.target.value * this.props.price });
    }    

    render() {
        const {
            currency,
            currencies,
            onCurrencyChange
        } = this.props;
        return (
            <div className="currency-container">
                <h3>{currency.code}</h3>
                <img src="test.png" />
                <div className="currency-info">
                    <Dropdown
                        items={currencies}
                        onChange={onCurrencyChange}
                        currentValue={currency}
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
}

Currency.propTypes = {
    currency: PropTypes.object.isRequired,
    currencies: PropTypes.array.isRequired,
    value: PropTypes.number,
    onCurrencyChange: PropTypes.func.isRequired
};

Currency.defaultProps = {
    value: 1
};

export default Currency;