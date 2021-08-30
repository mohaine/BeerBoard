import React, { Component } from 'react'
import Footer from './Footer'
import Header from '../components/Header'

import { Switch, Route } from 'react-router-dom'

import Default from './Default'
import Taps from './Taps'
import Beers from './Beers'
import About from './About'

import { connect } from 'react-redux'

import { viewRoute} from '../actions/'

class App extends Component {

  render() {

    let { location, route } = this.props

    if (location && location.pathname && !location.pathname.startsWith("/ui")) {
      route("")
    }

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


const mapStateToProps = (state,ownProps) => {
  return { location: state.router.location };
}

const mapDispatchToProps = (dispatch,ownProps) => {
 return {
   route: (route) => {
     dispatch(viewRoute(route));
   }
 }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)
