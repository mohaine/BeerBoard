let dispatch = undefined;
export default (state = {}, action) => {
  switch (action.type) {
    case 'DISPATCH':
      dispatch = action.dispatch;
      return state;
    case 'UNDO_ENABLE':
      {
        return Object.assign({}, state, {
          undoDeleteBeer: action.beer
        })
      }
    case 'UNDO_CLEAR':
      {
        console.log(action.beer , state.undoDeleteBeer)
        if (action.beer == state.undoDeleteBeer) {
          return Object.assign({}, state, {
            undoDeleteBeer: undefined
          })
        } else return state
      }
    default:
      return state
  }
}
