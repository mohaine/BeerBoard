import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import QuickEdit from '../components/QuickEdit'
import BeerEdit from '../components/BeerEdit'
import BeerGlass from '../components/BeerGlass'
import {getSrmColor} from '../util/srm'


let labelClass = "col-md-2"
let valueClass = "col-md-6"

export default class BeerDash extends Component {


  constructor(props, context) {
    super(props, context)
    this.state = {editingBeer: false}
  }


  render() {
    let {beer} =  this.props
    let stopEditing = ()=>this.setState({editingBeer: false})

    return (<div className="container-fluid" style={{paddingTop: "15px"}} onClick={()=>this.setState({editingBeer: true})}>

    {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
      <BeerEdit beer={this.props.beer} close={stopEditing} />
    </QuickEdit>}

    <BeerGlass beer={beer} />
    {beer.name}

    </div>)
  }
}
