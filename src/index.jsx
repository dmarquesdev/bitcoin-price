import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Provider } from 'react-redux';

import store from './store';

import Home from './containers/Home';

require('./styles/main.scss');

import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import br from 'react-intl/locale-data/br';

import localeData from '../locales/data.json';

addLocaleData([...en, ...es, ...br]);

const language = (navigator.languages && navigator.languages[0]) ||
navigator.language ||
navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById('root')
);