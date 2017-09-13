import axios from 'axios'
import {
  push
} from 'react-router-redux'

import {
  buildUrl,
  userErrorMessage
} from '../actions'

import RequestStatus from './RequestStatus'

let beersLoadInterval = undefined;

export const cancelCfgLoad = () => {
  if (beersLoadInterval) {
    clearInterval(beersLoadInterval);
    beersLoadInterval = undefined;
  }
}
const rescheduleCfgLoad = (dispatch) => {
  cancelCfgLoad();
  startCfgLoad(dispatch);
}
const startCfgLoad = (dispatch) => {
  if (!beersLoadInterval) {
    beersLoadInterval = setInterval(() => {
      dispatch(requestCfgNoSchedule());
    }, 15000);
  }
}

function recieveCfg(status, json) {
  return {
    type: "RECEIVE_CFG",
    status: status.success(),
    data: json.data
  };
}


function updateCfgRequest(data, onComplete) {
  let status = new RequestStatus();
  return dispatch => {
    dispatch({
      type: 'REQUEST_CFG',
      status: status.copy()
    });
    return axios({
        method: 'POST',
        url: buildUrl('/cmd/cfg'),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        data: data
      })
      .then(json => {
        dispatch(recieveCfg(status, json))
        if (onComplete) {
          onComplete();
        }
      }).catch(e => {
        dispatch({
          type: "ERROR_CFG",
          status: status.error(userErrorMessage(e, "Beer Load Failed"))
        })
      })
  }
}

export const requestUpdateCfg = (newCfg, onComplete) => {
  let data = "configuration=" + encodeURI(JSON.stringify(newCfg, null, 2));
  return (updateCfgRequest(data, onComplete))
}
export const requestUpdateBeerCfg = (beer, onComplete) => {
  let data = "beer=" + encodeURI(JSON.stringify(beer, null, 2));
  return (updateCfgRequest(data, onComplete))
}
export const requestDeleteBeerCfg = (beer, onComplete) => {
  let data = "deleteBeer=" + encodeURI(beer.id);
  return (updateCfgRequest(data, onComplete))
}
export const requestUpdateTapCfg = (tap, onComplete) => {
  let data = "tap=" + encodeURI(JSON.stringify(tap, null, 2));
  return (updateCfgRequest(data, onComplete))
}

let requestCfgNoSchedule = (onComplete) => {
  let status = new RequestStatus();
  return dispatch => {
    rescheduleCfgLoad(dispatch);
    dispatch({
      type: 'REQUEST_CFG',
      status: status.copy()
    });
    return axios.get(buildUrl('/cmd/cfg'))
      .then(json => {
        dispatch(recieveCfg(status, json))
        if (onComplete) {
          onComplete();
        }
      })
      .catch(e => {
        dispatch({
          type: "ERROR_CFG",
          status: status.error(userErrorMessage(e, "Beer Load Failed"))
        })
      })
  }
}


export const requestCfg = (onComplete) => {
  let status = new RequestStatus();
  return dispatch => {
    rescheduleCfgLoad(dispatch);
    requestCfgNoSchedule()(dispatch)
  }
}
