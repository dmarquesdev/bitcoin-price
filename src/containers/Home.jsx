import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Icon from '../components/Icon';
import Currency from '../components/Currency';

import { fetchCurrencies, calculateConversion } from '../actions/currency';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.handleFromCurrencyChange = this.handleFromCurrencyChange.bind(this);
        this.handleToCurrencyChange = this.handleToCurrencyChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchCurrencies();
    }

    handleFromCurrencyChange(event) {

    }

    handleToCurrencyChange(event) {

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
                                currencies={this.props.currencies}
                                value={1}
                                onCurrencyChange={this.handleFromCurrencyChange}
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
                                currencies={this.props.currencies}
                                value={this.props.to.price}
                                onCurrencyChange={this.handleToCurrencyChange}
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
        currencies: state.currency.list
    }
}

export default connect(mapStateToProps, { fetchCurrencies, calculateConversion })(Home);