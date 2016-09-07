import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import BeerDash from '../components/BeerDash'
import { requestCfg } from '../actions/cfg.js'

export class Dashboard extends Component {
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
        <div className="row">

        

        {cfg && cfg.beers.map(b=>(<div key={b.id} className="col-md-6"> <BeerDash beer={b} /> </div>))}

        </div>

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
)(Dashboard)
