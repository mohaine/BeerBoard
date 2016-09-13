import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import QuickEdit from '../components/QuickEdit'
import BeerEdit from '../components/BeerEdit'
import SelectBeer from '../components/SelectBeer'
import BeerGlass from '../components/BeerGlass'
import {getSrmColor} from '../util/srm'
import {requestUpdateCfg} from '../actions/cfg'


let labelClass = "col-md-2"
let valueClass = "col-md-6"

export class Tap extends Component {


  constructor(props, context) {
    super(props, context)
    this.state = {editingBeer: false, selectingBeer: false}
  }


  untap(){
    let {tap,untapBeer,cfg} =  this.props
    untapBeer(tap,cfg)
  }

  tap(beer){
    let {tap,tapBeer,cfg} =  this.props
    tapBeer(tap,beer,cfg)
  }


  render() {
    let {beer, tap, cfg, modMode} =  this.props
    let {editingBeer, selectingBeer} =  this.state

    let notTappedFilter = function(beer){
      return !cfg.taps.find(t=>t.id == beer.id)
    }

    let hasBeer = true
    if(!beer){
      beer = {}
      hasBeer = false
    }

    let fullDisplay = hasBeer || modMode

    let stopEditing = ()=>this.setState({editingBeer: false})
    let stopSelecting = ()=>this.setState({selectingBeer: false})


    return (<div className="tap" style={{paddingTop: "15px", display: "flex"}}>
    {modMode && (
      <div style={{  position: 'fixed',
        opacity: '0.8',
        backgroundColor: '#fff',
        zIndex: 1}}>
        <div className="btn-group">
        <button type="button" className="btn btn-default" onClick={()=>this.setState({editingBeer: true})}>{hasBeer? "Edit":"New"}</button>
        {hasBeer && <button type="button" className="btn btn-default" onClick={()=>this.untap()}>Untap</button>}
        <button type="button" className="btn btn-default" onClick={()=>this.setState({selectingBeer: true})}>Select</button>
        </div>
      </div>
    )}
    {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
      <BeerEdit beer={this.props.beer} close={(beer)=>{if(beer){this.tap(beer)};stopEditing()}} />
    </QuickEdit>}
    {this.state.selectingBeer && <QuickEdit  width="500px" height="300px" close={stopSelecting}>
      <SelectBeer beer={this.props.beer} select={(beer)=>{this.tap(beer); stopSelecting()}} filter={notTappedFilter} close={stopSelecting} />
    </QuickEdit>}

      {hasBeer && <BeerGlass beer={beer}/> }

      {fullDisplay &&
      <div className="info">
        <div style={{display: "flex", flexDirection: "column"}}>
          <div>
            <span className="header">{tap.position}  {beer.name}</span>
          </div>
          <div>
            <span className="style">{beer.style}&nbsp;</span>
            {beer.ibu && <span className="ibu">{beer.ibu} IBU </span>}
            {beer.abv && <span className="abv">{beer.abv}% ABV </span>}
          </div>
          <div>
            <span className="style">{beer.notes}</span>
          </div>
        </div>
      </div>
    }
    </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    cfg: state.cfg.cfg
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    untapBeer: (tap, cfg) => {
      let newTaps = cfg.taps.filter(t => t.position != tap.position)
      let newCfg = Object.assign({}, cfg, {
        taps: newTaps
      })
      dispatch(requestUpdateCfg(newCfg))
    },
    tapBeer: (tap,beer,cfg) => {
      let newTaps = cfg.taps.filter(t => t.position != tap.position)
      newTaps.push(Object.assign({}, tap, {id: beer.id}))
      let newCfg = Object.assign({}, cfg, {
        taps: newTaps
      })
      dispatch(requestUpdateCfg(newCfg))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tap)
