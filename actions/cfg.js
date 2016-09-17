import axios from 'axios'
import { push } from 'react-router-redux'

import { buildUrl, userErrorMessage } from '../actions'

import RequestStatus from './RequestStatus'

let beersLoadInterval = undefined;

export const cancelCfgLoad = () => {
  if(beersLoadInterval){
    clearInterval(beersLoadInterval);
    beersLoadInterval = undefined;
  }
}
const rescheduleCfgLoad = (dispatch) => {
    cancelCfgLoad();
    startCfgLoad(dispatch);
}
const startCfgLoad = (dispatch) => {
  if(!beersLoadInterval){
    beersLoadInterval = setInterval(()=>{
      dispatch(requestCfgNoSchedule());
    }, 15000);
  }
}



function recieveCfg(status,json){
  return {
      type: "RECEIVE_CFG",
      status: status.success(),
      data: json.data
  };
}

export const requestUpdateCfg = (newCfg, onComplete) => {
    let status = new RequestStatus();
    return dispatch => {
        dispatch({
            type: 'REQUEST_CFG',
            status: status.copy()
        });
        return axios( {
                method: 'POST',
                url: buildUrl('/cmd/cfg'),
                data: JSON.stringify(newCfg,null,2)
            })
            .then(json => {
              dispatch(recieveCfg(status,json))
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
              dispatch(recieveCfg(status,json))
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
