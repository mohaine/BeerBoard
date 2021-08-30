import React, { Component } from 'react'
import Footer from './Footer'
import Header from '../components/Header'

import { Switch, Route } from 'react-router-dom'

import Default from './Default'
import Taps from './Taps'
import Beers from './Beers'
import About from './About'

export default class App extends Component {

  render() {
    return  (<div><Header/>

    <Route path="/ui">
          <Switch>
            <Route path="/ui/about"><About /></Route>
            <Route path="/ui/beers" ><Beers /></Route>
            <Route path="/ui/taps"><Taps /></Route>
            <Route><Default /></Route>
          </Switch>
        </Route>
    
    <Footer/></div>)
  }
}
