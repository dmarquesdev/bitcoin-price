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
    }

    componentDidMount() {
        this.props.fetchCurrencies();
        this.props.fetchPrice(this.props.from.code, this.props.to.code);
    }

    handleFromCurrencyChange(event) {
        this.props.selectCurrencyFrom(event.target.value);
        this.props.fetchPrice(event.target.value, this.props.to.code);
    }

    handleToCurrencyChange(event) {
        this.props.selectCurrencyTo(event.target.value);
        this.props.fetchPrice(this.props.from.code, event.target.value);
    }

    render() {
        const fromComponent = this.props.from !== undefined && (
            <Currency
                currency={this.props.from}
                currencies={this.props.cryptoCurrencies}
                onCurrencyChange={this.handleFromCurrencyChange}
            />
        );
        const toComponent = this.props.to !== undefined && (
            <Currency
                currency={this.props.to}
                currencies={this.props.regularCurrencies}
                onCurrencyChange={this.handleToCurrencyChange}
            />
        );
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h1>Quanto custa o Bitcoin?</h1>
                    </div>
                    <div className="col-xs-12">
                        <div className="col-xs-12 col-md-4">
                            {fromComponent}
                        </div>
                        <div className="col-xs-12 col-md-4">
                            <Icon
                                name="exchange"
                                onClick={() => {}}
                            />
                        </div>
                        <div className="col-xs-12 col-md-4">
                            {toComponent}
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