import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import {requestUpdateCfg} from '../actions/cfg'

let labelClass = "col-md-4"
let valueClass = "col-md-8"

export class SelectBeer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {}
  }

  selectBeer(beer){
    let {select} = this.props
    select(beer)
  }
  render() {
        let {cfg, close, filter} = this.props

        let {beers} = cfg;

        if(filter){
          beers = beers.filter(filter)
        }

        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        Select

        {beers.map(b=>(<div key={b.id}>
          <a className="clickable" onClick={()=>this.selectBeer(b)}>{b.name}</a>
          </div>))}
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
    saveBeer: (beer, cfg, close) => {
      let newBeers = cfg.beers.map(b => {
        if (b.id == beer.id) {
          return beer
        } else return b
      })
      if (!beer.id) {
        newBeers.push(beer);
      }
      let newCfg = Object.assign({}, cfg, {
        beers: newBeers
      })
      dispatch(requestUpdateCfg(newCfg, close))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBeer)
