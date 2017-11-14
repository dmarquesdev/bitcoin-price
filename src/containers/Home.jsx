import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Icon from '../components/Icon';
import Currency from '../components/Currency';

import {
    fetchCurrencies,
    fetchPrice,
    selectCurrencyFrom,
    selectCurrencyTo
} from '../actions';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.handleFromCurrencyChange = this.handleFromCurrencyChange.bind(this);
        this.handleToCurrencyChange = this.handleToCurrencyChange.bind(this);
        this.handleFromValueChange = this.handleFromValueChange.bind(this);
        this.handleToValueChange = this.handleToValueChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchCurrencies();
        this.props.fetchPrice(1, this.props.from.code, this.props.to.code);
    }

    handleFromCurrencyChange(event) {
        console.log(event.target.value);
    }

    handleToCurrencyChange(event) {
        console.log('to currency changed');
    }

    handleFromValueChange(newValue) {
        if (!isNaN(newValue)) {
            this.props.fetchPrice(newValue, this.props.from.code, this.props.to.code);
        }
    }

    handleToValueChange(newValue) {
        console.log('to value changed');
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Quanto custa o Bitcoin?</h1>
                    </div>
                    <div className="col-xs-12">
                        <div className="col-xs-12 col-md-4">
                            <Currency
                                currency={this.props.from}
                                currencies={this.props.cryptoCurrencies}
                                onCurrencyChange={this.handleFromCurrencyChange}
                                onValueChange={this.handleFromValueChange}
                            />
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <Icon
                                name="exchange"
                                onClick={() => {}}
                            />
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <Currency
                                currency={this.props.to}
                                currencies={this.props.regularCurrencies}
                                onCurrencyChange={this.handleToCurrencyChange}
                                onValueChange={this.handleToValueChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        from: state.currency.from,
        to: state.currency.to,
        cryptoCurrencies: state.currency.cryptoList,
        regularCurrencies: state.currency.regularList
    }
}

export default connect(mapStateToProps, {
    fetchCurrencies,
    fetchPrice,
    selectCurrencyFrom,
    selectCurrencyTo
})(Home);