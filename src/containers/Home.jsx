import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import Icon from '../components/Icon';
import Currency from '../components/Currency';

import {
    fetchCryptoCurrencies,
    fetchPrice,
    selectCurrencyFrom,
    selectCurrencyTo,
    changeLanguage
} from '../actions';

class Home extends PureComponent {
    constructor(props) {
        super(props);

        this.handleFromCurrencyChange = this.handleFromCurrencyChange.bind(this);
        this.handleToCurrencyChange = this.handleToCurrencyChange.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);

        this.state = { loading: false };
    }

    componentDidMount() {
        this.props.fetchCryptoCurrencies();
        this.props.fetchPrice(this.props.from.code, this.props.to.code);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.loading });
    }

    handleFromCurrencyChange(event) {
        this.props.selectCurrencyFrom(event.target.value);
        this.props.fetchPrice(event.target.value, this.props.to.code);
    }

    handleToCurrencyChange(event) {
        this.props.selectCurrencyTo(event.target.value);
        this.props.fetchPrice(this.props.from.code, event.target.value);
    }

    onLanguageChange(event) {
        this.props.changeLanguage(event.target.value);
    }

    render() {
        const fromComponent = this.props.from !== undefined && (
            <Currency
                currency={this.props.from}
                currencies={this.props.cryptoCurrencies}
                onCurrencyChange={this.handleFromCurrencyChange}
                date={new Date()}
            />
        );
        const toComponent = this.props.to !== undefined && (
            <Currency
                currency={this.props.to}
                currencies={this.props.regularCurrencies}
                onCurrencyChange={this.handleToCurrencyChange}
                date={new Date()}
            />
        );

        let loadingClass = 'overlay';

        if (!this.state.loading) {
            loadingClass += ' __hidden';
        }

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="title">
                            <FormattedMessage
                                id="title"
                            />
                        </h1>
                    </div>
                    <div className="col-xs-12">
                        <div className="col-xs-12 col-md-3 col-md-offset-9 col-lg-2 col-lg-offset-10">
                            <select
                                value={this.props.intl.locale}
                                onChange={this.onLanguageChange}
                                className="form-control"
                            >
                                <option value="pt">Português</option>
                                <option value="en">English</option>
                                <option value="es">Español</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-xs-12">
                        <div className="col-xs-12 col-md-6">
                            {fromComponent}
                        </div>
                        <div className="col-xs-12 col-md-6">
                            {toComponent}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 footer">
                        <a href="https://github.com/dmarquesdev/bitcoin-price">GitHub</a>
                    </div>
                </div>
                <div className={loadingClass}>
                    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
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
        regularCurrencies: state.currency.regularList,
        intl: state.intl,
        loading: state.api.isLoading
    }
}

export default connect(mapStateToProps, {
    fetchCryptoCurrencies,
    fetchPrice,
    selectCurrencyFrom,
    selectCurrencyTo,
    changeLanguage
})(Home);