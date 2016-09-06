import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RouteLink from '../components/Link'
import BeerView from '../components/BeerView'
import BeerEdit from '../components/BeerEdit'
import QuickEdit from '../components/QuickEdit'
import { requestCfg } from '../actions/cfg.js'

export class BeerDashboard extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {editingBeer:false}
  }
  componentDidMount(){
    let {cfg,requestCfgStatus, requestCfg }  = this.props;
    if(!cfg && !requestCfgStatus){
      requestCfg();
    }
  }

  render() {

        let stopEditing = ()=>this.setState({editingBeer: false})

        let {cfg,requestCfgStatus, requestCfg }  = this.props;
        return (<div className="container-fluid" style={{paddingTop: "15px"}}>
        Beer List
        {cfg && cfg.beers.map(b=>(<div key={b.id}> <BeerView beer={b} /></div>))}


        {this.state.editingBeer && <QuickEdit  width="500px" height="300px" close={stopEditing}>
          <BeerEdit beer={{}} close={stopEditing} />
        </QuickEdit>}

        <button type="button" className="btn btn-default" onClick={()=>this.setState({editingBeer: true})}>New Beer</button>

        </div>)
  }
}

const mapStateToProps = (state) => {
  let {cfg,requestCfgStatus} = state.cfg
  return {
    cfg,requestCfgStatus
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestCfg: () => {
      dispatch(requestCfg())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeerDashboard)
