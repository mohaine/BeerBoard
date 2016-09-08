import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import QuickEdit from '../components/QuickEdit'
import BeerEdit from '../components/BeerEdit'
import BeerGlass from '../components/BeerGlass'
import {getSrmColor} from '../util/srm'


let labelClass = "col-md-2"
let valueClass = "col-md-6"

export default class Tap extends Component {


  constructor(props, context) {
    super(props, context)
    this.state = {editingBeer: false}
  }


  render() {
    let {beer, tap} =  this.props
    let stopEditing = ()=>this.setState({editingBeer: false})

    return (<div className="tap" style={{paddingTop: "15px", display: "flex"}} onClick={()=>this.setState({editingBeer: true})}>

    {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
      <BeerEdit beer={this.props.beer} close={stopEditing} />
    </QuickEdit>}

    <BeerGlass beer={beer}/>
    <div className="info">
      <div style={{display: "flex", flexDirection: "column"}}>
        <div>
              <span className="header">{tap.position}  {beer.name}</span>
        </div>
        <div>
          <span className="style">{beer.style}&nbsp;</span>
          {beer.ibu && <span className="ibu">{beer.ibu} IBU </span>}
          {beer.abv && <span className="abv">{beer.abv}% ABV </span>}
        </div>
        <div >
            <span className="style">{beer.notes}</span>
        </div>
      </div>
      </div>
    </div>)
  }
}
