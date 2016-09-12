import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import {requestUpdateCfg} from '../actions/cfg'
import {generateAlpahId} from '../util/id'

let labelClass = "col-md-4"
let valueClass = "col-md-8"

export class BeerEdit extends Component {
  constructor(props, context) {
    super(props, context)
    let {beer}  = this.props;
    this.state = {beer:Object.assign({}, beer, {})}
  }
  createInputRow(title, field,autofocus){
    return (<div className="row">
      <div className={labelClass}>
        {title}
      </div>
      <div className={valueClass}>
        <input type="text" style={{width: "100%"}} value={this.state.beer[field]}  onChange={(e)=>{this.setValue(field,e.target.value)}} autofocus={autofocus}/>
      </div>
    </div>
    )
  }
  createInputRowTextArea(title, field){
    return (<div className="row">
      <div className={labelClass}>
        {title}
      </div>
      <div className={valueClass}>
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
        let {saveBeer,cfg, close} = this.props

        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        {this.createInputRow('Name','name', true)}
        {this.createInputRow('Style','style')}
        {this.createInputRow('IBUs','ibu')}
        {this.createInputRow('SRM','srm')}
        {this.createInputRow('ABV','abv')}
        {this.createInputRowTextArea('Notes','notes')}
        <div className="row">
        <div className="btn-group">
          <button type="button" className="btn btn-primary" onClick={()=>this.save()}>Save</button>
          <button type="button" className="btn btn-default" onClick={()=> setTimeout(close,10) }>Close</button>
        </div>
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
    saveBeer: (beer, cfg, close) => {
      let newBeers = cfg.beers.map(b => {
        if (b.id == beer.id) {
          return beer
        } else return b
      })
      if (!beer.id) {
        beer.id = generateAlpahId()
        newBeers.push(beer);
      }
      let newCfg = Object.assign({}, cfg, {
        beers: newBeers
      })

      let afterSave = undefined

      if(close){
          afterSave = ()=>{
            console.log("Close ", beer)
            close(beer)
          }
      }
      console.log(afterSave)

      dispatch(requestUpdateCfg(newCfg, afterSave))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerEdit)
