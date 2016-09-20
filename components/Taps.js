import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import Tap from '../components/Tap'
import { requestCfg } from '../actions/cfg.js'

export class Taps extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {modMode: false,innerWidth: window.innerWidth}
  }
  componentWillUnmount(){
    window.removeEventListener("resize",this.resizeListener)
  }

  componentDidMount(){
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    if(!cfg && !requestCfgStatus){
      requestCfg();
    }
    this.resizeListener = () =>{
      if(this.resizeTimeout){
        clearTimeout(this.resizeTimeout)
      }
      this.resizeTimeout = setTimeout(()=>{
        this.setState({innerWidth: window.innerWidth})
      },75)
    }
    window.addEventListener("resize",this.resizeListener);
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
    this.modModeTimeout = setTimeout(()=>{this.setState({modMode: false})},15000)
  }

  render() {
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    let {modMode,innerWidth}  = this.state;
    let taps = cfg? cfg.taps.map(s=>s) : undefined

    let tapsWidth =  Math.floor(innerWidth/2 - 50) + "px"

    if(taps){
      for(let i=1;i<=8;i++){
        if(!taps.find(t=>t.position == i)){
            taps.push({position: i})
        }
      }
      taps.sort((a,b)=>a.position - b.position)
    }

    return (<div className="container-fluid taps" style={{paddingTop: "15px"}} onClick={()=>this.enterModMode()}>

      {modMode && (
        <div style={{  position: 'fixed',
          opacity: '0.9',
          right: "0px",
          backgroundColor: '#fff',
          margin: "2px 10px 10px 15px",
          zIndex: 2}}>
          <RouteLink route="beers">Beers</RouteLink> &nbsp;
        </div>
      )}


      <div style={{display: "flex", flexWrap:"wrap"}}>

      {taps && taps.map(t=>{
        let beer = this.beerForId(t.id)
        return (<Tap key={t.position} beer={beer} tap={t} modMode={modMode} width={tapsWidth}/>)
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
