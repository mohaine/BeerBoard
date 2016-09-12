import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import Tap from '../components/Tap'
import { requestCfg } from '../actions/cfg.js'

export class Taps extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {modMode: false}
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

  enterModMode(){
    this.setState({modMode: true})
    if(this.modModeTimeout){
    clearTimeout(this.modModeTimeout)
    }
    this.modModeTimeout = setTimeout(()=>{this.setState({modMode: false})},30000)
  }

  render() {
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    let {modMode}  = this.state;
    let taps = cfg? cfg.taps.map(s=>s) : undefined

    if(taps && modMode){
      for(let i=1;i<=8;i++){
        if(!taps.find(t=>t.position == i)){
            taps.push({position: i})
        }
      }
    }
    if(taps){
      taps.sort((a,b)=>a.position - b.position)
    }

    return (<div className="container-fluid taps" style={{paddingTop: "15px"}} onClick={()=>this.enterModMode()}>
      <div style={{display: "flex", flexWrap:"wrap"}}>
      {taps && taps.map(t=>{
        let beer = this.beerForId(t.id)
        return (<Tap key={t.position} beer={beer} tap={t} />)
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
)(Taps)
