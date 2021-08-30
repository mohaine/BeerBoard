

export const clearUndoDelete = (beer) => {
  return {
      type: "UNDO_CLEAR",
      beer
  }
}

export const enableUndoDelete = (beer) => {
    return dispatch => {
      dispatch({
          type: "UNDO_ENABLE",
          beer
      })
      setTimeout(()=>{
        dispatch(clearUndoDelete(beer))
      },5000)
    }
}
