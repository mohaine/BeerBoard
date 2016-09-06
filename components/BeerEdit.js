import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import {requestUpdateCfg} from '../actions/cfg'


export class BeerEdit extends Component {
  constructor(props, context) {
    super(props, context)
    let {beer}  = this.props;
    this.state = {beer:Object.assign({}, beer, {})}
  }
  createInputRow(title, field){
    return (<div className="row">
      <div className="col-md-4">
        {title}
      </div>
      <div className="col-md-8">
        <input type="text" style={{width: "100%"}} value={this.state.beer[field]}  onChange={(e)=>{this.setValue(field,e.target.value)}}/>
      </div>
    </div>
    )
  }
  createInputRowTextArea(title, field){
    return (<div className="row">
      <div className="col-md-4">
        {title}
      </div>
      <div className="col-md-8">
        <textarea value={this.state.beer[field]} style={{width: "100%", height:"5em"}} onChange={(e)=>{this.setValue(field,e.target.value)}}/>
      </div>
    </div>
    )
  }
  setValue(field,newVal){
    let value = {}
    value[field] = newVal
    let beer = Object.assign({}, this.state.beer, value)
    this.setState({beer})
  }

  save(){
    let {beer} = this.state
    let {saveBeer,cfg, close} = this.props
    saveBeer(beer,cfg, close)
  }
  render() {
        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        {this.createInputRow('Name','name')}
        {this.createInputRow('Style','style')}
        {this.createInputRow('IBUs','ibu')}
        {this.createInputRow('Color','color')}
        {this.createInputRowTextArea('Notes','notes')}
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={()=>this.save()} >Save</button>
        </div>
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
    saveBeer: (beer,cfg,close) => {
      let newBeers = cfg.beers.map(b=>{
        if(b.id == beer.id){
          return beer
        } else return b
      })
      let newCfg = Object.assign({}, cfg, {beers:newBeers})
      dispatch(requestUpdateCfg(newCfg,close))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerEdit)
