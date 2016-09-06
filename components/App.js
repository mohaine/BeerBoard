import React, { Component, PropTypes } from 'react'
import Footer from './Footer'
import Header from '../components/Header'
import { Router, Route, browserHistory } from 'react-router'


export default class App extends Component {

  render() {
    const {children} = this.props
    return  (<div><Header/>{children}<Footer/></div>)
  }
}
