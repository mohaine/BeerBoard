import React, { Component } from 'react'
import { connect } from 'react-redux'
import {requestUpdateBeerCfg} from '../actions/cfg'
import {generateAlpahId} from '../util/id'
import {styles} from '../util/styles'

let labelStyle = {width: "6em"}
let valueStyle = {width: "22em"}

export class BeerEdit extends Component {
  constructor(props, context) {
    super(props, context)
    let {beer}  = this.props;
    this.state = {beer:Object.assign({}, beer, {})}
  }

  createTextInputRow(title, field,autofocus){
    return (<div style={{display: "flex", flexDirection: "row"}}>
      <div style={labelStyle}>
        {title}
      </div>
      <div style={valueStyle}>
        <input type="text" style={{width: "100%"}} value={this.state.beer[field]}  onChange={(e)=>{this.setValue(field,e.target.value)}} autoFocus={autofocus}/>
      </div>
    </div>
    )
  }
  createNumberInputRow(title, field,min,max){
    return (<div style={{display: "flex", flexDirection: "row"}}>
      <div style={labelStyle}>
        {title}
      </div>
      <div style={valueStyle}>
        <input type="number" min={min} max={max} style={{width: "100%"}} value={this.state.beer[field]}  onChange={(e)=>{this.setValue(field,e.target.value)}} />
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
        let {close} = this.props
        let {beer} = this.state

        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        {this.createTextInputRow('Name','name', true)}
        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={labelStyle}>
            Style
          </div>
          <div style={valueStyle}>
            <input type="text" list="styles" style={{width: "100%"}} value={beer.style}  onChange={(e)=>{this.setValue("style",e.target.value)}} />
          </div>
        </div>
        <datalist id="styles">
          {styles && styles.map(s=>(<option value={s.name} key={s.name}>{s.name}</option>))}
        </datalist>
        {this.createNumberInputRow('IBU','ibu', 1,120)}
        {this.createNumberInputRow('SRM','srm', 1,41)}
        {this.createNumberInputRow('ABV','abv', 1,25)}
        {this.createTextInputRow('Brewer','brewer', false)}

        <div style={{display: "flex", flexDirection: "row"}}>
          <div style={labelStyle}>
            Notes
          </div>
          <div style={valueStyle}>
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
