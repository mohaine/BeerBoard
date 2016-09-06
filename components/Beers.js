import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import BeerView from '../components/BeerView'
import { requestCfg } from '../actions/cfg.js'

export class BeerDashboard extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    if(!cfg && !requestCfgStatus){
      requestCfg();
    }
  }

  render() {
        let {cfg,requestCfgStatus, requestCfg }  = this.props;
        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        Beer List
        {cfg && cfg.beers.map(b=>(<div key={b.id}> <BeerView beer={b} /></div>))}
        </div>)
  }
}

const mapStateToProps = (state) => {
  let {cfg,requestCfgStatus} = state.cfg
  return {
    cfg,requestCfgStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestCfg: () => {
      dispatch(requestCfg())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerDashboard)
