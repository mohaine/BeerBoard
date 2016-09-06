import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import QuickEdit from '../components/QuickEdit'
import BeerEdit from '../components/BeerEdit'

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
      <div className="col-md-2">
        {title}
      </div>
      <div className="col-md-6">
        {value}
      </div>
    </div>
  )}
  }

  render() {
       let stopEditing = ()=>this.setState({editingBeer: false})

       return (<div className="container-fluid" style={{paddingTop: "15px"}} onClick={()=>this.setState({editingBeer: true})}>

        {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
          <BeerEdit beer={this.props.beer} close={stopEditing} />
        </QuickEdit>}

        {this.createRow('Name','name')}
        {this.createRow('Style','style')}
        {this.createRow('IBUs','ibu')}
        {this.createRow('Color','color')}
        {this.createRow('Notes','notes')}
    </div>)
  }
}
