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

  beerForId(id){
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    return cfg.beers.find(b=>b.id == id)
  }


  render() {
        let {cfg,requestCfgStatus, requestCfg }  = this.props;
        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        Beer List
        <div className="row">



        {cfg && cfg.taps.map(t=>{
          let beer = this.beerForId(t.id)
          if(beer)
            return (<div key={t.position} className="col-md-6"> <BeerDash beer={beer} tap={t} /> </div>)
        })}

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
