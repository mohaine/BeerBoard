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
    let {beer, tap} =  this.props
    let stopEditing = ()=>this.setState({editingBeer: false})

    return (<div className="container-fluid dash-beer" style={{paddingTop: "15px"}} onClick={()=>this.setState({editingBeer: true})}>

    {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
      <BeerEdit beer={this.props.beer} close={stopEditing} />
    </QuickEdit>}
    <div className="col-md-2"><BeerGlass beer={beer}/></div>
    <div className="col-md-10">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
              <span className="header">{tap.position}  {beer.name}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <span className="style">{beer.style}&nbsp;</span>
          </div>
          <div className="col-md-6">
          {beer.ibu && <span className="ibu">{beer.ibu} IBU </span>}
          {beer.abv && <span className="abv">{beer.abv}% ABV </span>}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <span className="style">{beer.notes}</span>
          </div>
        </div>
      </div>
      </div>
    </div>)
  }
}
