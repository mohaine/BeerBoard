

function uiReducer(state = {}, action) {
  switch (action.type) {
    case 'DISPATCH':
      return state;
    case 'UNDO_ENABLE':
      {
        return Object.assign({}, state, {
          undoDeleteBeer: action.beer
        })
      }
    case 'UNDO_CLEAR':
      {
        console.log(action.beer, state.undoDeleteBeer)
        if (action.beer === state.undoDeleteBeer) {
          return Object.assign({}, state, {
            undoDeleteBeer: undefined
          })
        } else return state
      }
    default:
      return state
  }
}

export default uiReducer