import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import {requestUpdateBeerCfg} from '../actions/cfg'
import {generateAlpahId} from '../util/id'
import {styles} from '../util/styles'

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
        <input type="text" style={{width: "100%"}} value={this.state.beer[field]}  onChange={(e)=>{this.setValue(field,e.target.value)}} autoFocus={autofocus}/>
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
        let {beer} = this.state

        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        {this.createInputRow('Name','name', true)}
        <div className="row">
          <div className={labelClass}>
            Style
          </div>
          <div className={valueClass}>
            <input type="text" list="styles" style={{width: "100%"}} value={beer.style}  onChange={(e)=>{this.setValue("style",e.target.value)}} />
          </div>
        </div>
        <datalist id="styles">
          {styles && styles.map(s=>(<option value={s.name} key={s.name}>{s.name}</option>))}
        </datalist>
        <div className="row">
          <div className={labelClass}>
            IBU
          </div>
          <div className={valueClass}>
            <input type="number" min="1" max="120" style={{width: "100%"}} value={beer.ibu}  onChange={(e)=>{this.setValue("ibu",e.target.value)}} />
          </div>
        </div>
        <div className="row">
          <div className={labelClass}>
            SRM
          </div>
          <div className={valueClass}>
            <input type="number" min="1" max="41" style={{width: "100%"}} value={beer.srm}  onChange={(e)=>{this.setValue("srm",e.target.value)}} />
          </div>
        </div>
        <div className="row">
          <div className={labelClass}>
            ABV
          </div>
          <div className={valueClass}>
            <input type="number" min="1" max="20" style={{width: "100%"}} value={beer.abv}  onChange={(e)=>{this.setValue("abv",e.target.value)}} />
          </div>
        </div>
        <div className="row">
          <div className={labelClass}>
            Notes
          </div>
          <div className={valueClass}>
            <textarea value={beer.notes} style={{width: "100%", height:"5em"}} onChange={(e)=>{this.setValue("notes",e.target.value)}}/>
          </div>
        </div>
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
      if (!beer.id) {
        beer.id = generateAlpahId()
      }
      let afterSave = undefined
      if(close){
          afterSave = ()=>{
            close(beer)
          }
      }

      dispatch(requestUpdateBeerCfg(beer, afterSave))
    }
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerEdit)
