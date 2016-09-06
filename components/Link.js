import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { viewRoute} from '../actions/'

const Link = ({ className, children, onClick }) => {
  return (
    <a className={className} href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

const mapStateToProps = (state,ownProps) => {
   return {  };
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return {
    onClick: (route) => {
      dispatch(viewRoute(ownProps.route));
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Link)
