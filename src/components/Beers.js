import React, { Component } from 'react'
import { connect } from 'react-redux'

import RouteLink from '../components/Link'
import SelectBeer from '../components/SelectBeer'

export class Header extends Component {

  componentDidMount(){

  }

  componentWillUnmount(){

  }
  render() {
        return (<div>
          <div style={{  position: 'fixed',
            opacity: '0.9',
            right: "0px",
            backgroundColor: '#fff',
            margin: "2px 10px 10px 15px",
            zIndex: 2}}>
            <RouteLink route="taps">Taps</RouteLink> &nbsp;
          </div>
          <SelectBeer />
        </div>)
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
