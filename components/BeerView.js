import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import QuickEdit from '../components/QuickEdit'
import BeerEdit from '../components/BeerEdit'
import {getSrmColor} from '../util/srm'


let labelClass = "col-md-2"
let valueClass = "col-md-6"

export default class BeerView extends Component {


  constructor(props, context) {
    super(props, context)
    this.state = {editingBeer: false}
  }
  createRow(title, field){
    let {beer} =  this.props
    let value = beer[field]
    if(value) {
    return (<div className="row">
      <div className={labelClass}>
        {title}
      </div>
      <div className={valueClass}>
        {value}
      </div>
    </div>
  )}
  }

  render() {
    let {beer} =  this.props
    let stopEditing = ()=>this.setState({editingBeer: false})

    return (<div className="container-fluid" style={{paddingTop: "15px"}} onClick={()=>this.setState({editingBeer: true})}>

    {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
      <BeerEdit beer={this.props.beer} close={stopEditing} />
    </QuickEdit>}

    {this.createRow('Name','name')}
    {this.createRow('Style','style')}
    {this.createRow('IBUs','ibu')}
    {beer.srm && (<div className="row">
      <div className={labelClass}>
        SRM
      </div>
      <div className={valueClass}> <span style={{backgroundColor: getSrmColor(beer.srm), paddingLeft: "2em", paddingRight: "2em"}}> {beer.srm} </span> </div>
      </div> )}

    {this.createRow('Notes','notes')}
    </div>)
  }
}
