import React, { Component } from 'react'
import { connect } from 'react-redux'
import {requestUpdateCfg,requestCfg} from '../actions/cfg'
import {enableUndoDelete} from '../actions/ui'


import BeerEdit from '../components/BeerEdit'
import QuickEdit from '../components/QuickEdit'


export class SelectBeer extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {editingBeer: false}
  }
  componentDidMount(){
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    if(!cfg && !requestCfgStatus){
      requestCfg();
    }
  }

  selectBeer(beer){
    let {select} = this.props
    select(beer)
  }
  deleteBeer(beer){
    let {deleteBeer,cfg} = this.props
    deleteBeer(beer,cfg)
  }
  render() {
    let {cfg,  filter,select} = this.props
    let {beer} = this.state
    let stopEditing = ()=>this.setState({editingBeer: false})

    if(!cfg) return (<div></div>)
    let {beers} = cfg;
    let beersFiltered = beers
    if(filter){
      beersFiltered = beers.filter(filter)
    }

    beersFiltered = beersFiltered.sort((a, b) => a.name.localeCompare(b.name))

    return (<div className="container-fluid" style={{paddingTop: "15px"}}>
    <h1>Beers</h1>


    {this.state.editingBeer && <QuickEdit  width="500px" height="400px" close={stopEditing}>
      <BeerEdit beer={beer} close={(beer)=>{if(beer && select) select(beer) ; stopEditing()}} />
    </QuickEdit>}

    {beersFiltered.length === 0 && beers.length > 0 && <div>No beers avaliable</div>}

    {beersFiltered.map(b=>(<div className="row" key={b.id}>
      <div className="col-sm-8"><strong>
      {select && <span className="clickable" onClick={()=>this.selectBeer(b)}>{b.name} {b.brewer && (<span>by {b.brewer}</span>)} </span>}
      {!select && <div>{b.name} {b.brewer && (<span>by {b.brewer}</span>)} </div>}
      </strong></div>
      <div className="col-sm-4">
        <div className="btn-group">
        <button className="btn btn-default" type="button" onClick={()=>this.setState({editingBeer: true, beer: b})}>Edit</button>
        <button className="btn btn-default" type="button" onClick={()=>this.deleteBeer(b)}>Delete</button>
        </div>
      </div>
      </div>))}

      < br />
      <button className="btn btn-default" type="button" onClick={()=>this.setState({editingBeer: true, beer: {}})}>New</button>

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
    },

    saveBeer: (beer, cfg, close) => {
      let newBeers = cfg.beers.map(b => {
        if (b.id === beer.id) {
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
    },
    deleteBeer: (beer, cfg) => {
      let newBeers = cfg.beers.filter(b => b.id !== beer.id);
      let newCfg = Object.assign({}, cfg, {
        beers: newBeers
      })
      dispatch(requestUpdateCfg(newCfg, ()=>{
        dispatch(enableUndoDelete(beer))
      }))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBeer)
