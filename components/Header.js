import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import RouteLink from '../components/Link'

export class Header extends Component {
  constructor(props, context) {
    super(props, context)
  }
  componentDidMount(){

  }

  componentWillUnmount(){

  }
  render() {
        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
          <div style={{float: "right"}}>
            <RouteLink route="beers">Beers</RouteLink> &nbsp;
            <RouteLink route="taps">Taps</RouteLink> &nbsp;
          </div>
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
