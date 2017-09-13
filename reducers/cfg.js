

let dispatch = undefined;
export default (state = {}, action) => {
  switch (action.type) {
    case 'DISPATCH':
      dispatch= action.dispatch;
      return state;

    case 'ERROR_STATUS':
    case 'REQUEST_CFG':
      return Object.assign({}, state, {
        requestBeersStatus: action.status
      })

    case 'RECEIVE_CFG':
      let cfg = action.data;
      if(state.cfg && cfg && state.cfg.version === cfg.version){
        // No changes, just drop the data
        cfg == state.cfg
      }
      return Object.assign({}, state, {
        cfg,
        requestBeersStatus: null,
        lastStatusDate : new Date()
      })
    default:
      return state
  }
}
