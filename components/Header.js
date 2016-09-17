import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {requestUpdateCfg} from '../actions/cfg'
import {clearUndoDelete} from '../actions/ui'


import RouteLink from '../components/Link'

export class Header extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){
  }

  componentWillUnmount(){
  }

  undelete(beer){
    let {saveBeer,cfg} = this.props
    saveBeer(beer,cfg)
  }
  render() {
    let {undoDeleteBeer} = this.props
        return (<div>
          <div style={{  position: 'fixed',
            opacity: '0.9',
            right: "100px",
            backgroundColor: '#fff',
            margin: "2px 10px 10px 15px",
            zIndex: 2}}>
            {undoDeleteBeer && <a className="clickable" onClick={()=>this.undelete(undoDeleteBeer)}> Undo Delete {undoDeleteBeer.name}</a> }
          </div>
        </div>)
  }
}

const mapStateToProps = (state) => {
  let {cfg,requestCfgStatus} = state.cfg
  let {undoDeleteBeer} = state.ui
  return {cfg,requestCfgStatus,undoDeleteBeer}
}

const mapDispatchToProps = (dispatch) => {
  return {
    saveBeer: (beer, cfg, close) => {
      var found = false
      let newBeers = cfg.beers.map(b => {
        if (b.id == beer.id) {
          found = true
          return beer
        } else return b
      })
      if (!found) {
        newBeers.push(beer);
      }
      let newCfg = Object.assign({}, cfg, {
        beers: newBeers
      })
      dispatch(requestUpdateCfg(newCfg, ()=>{dispatch(clearUndoDelete(beer))}))
    }

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
