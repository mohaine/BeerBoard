import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'


import App from './components/App'
import Default from './components/Default'
import Taps from './components/Taps'
import Beers from './components/SelectBeer'
import About from './components/About'

import config from 'config'

import { Router, Route,IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'


import configureStore from './store/configureStore'

const store = configureStore()

const history = syncHistoryWithStore(browserHistory, store)

store.dispatch({
    type: "DISPATCH",
    dispatch: store.dispatch
});

render(<div>
  <Provider store={store}>
        <Router history={history}>
          <Route path="/ui" component={App}>
            <IndexRoute component={Default}/>
            <Route path="taps" component={Taps}/>
            <Route path="beers" component={Beers}/>
            <Route path="about" component={About}/>
          </Route>
        </Router>
  </Provider></div>,
  document.getElementById('root')
)
