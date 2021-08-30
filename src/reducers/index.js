import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'


import cfg from './cfg'
import ui from './ui'


export const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  cfg,ui,
})
