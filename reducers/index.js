import { combineReducers } from 'redux'

import cfg from './cfg'
import ui from './ui'

import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

export default combineReducers({
  cfg,ui,
  routing: routerReducer
})
