import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'


import { ConnectedRouter } from 'connected-react-router'

import App from './components/App'


import configureStore, { history } from './store/configureStore'

const store = configureStore()


render(<div>

<Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>

  </div>,
  document.getElementById('root')
)
