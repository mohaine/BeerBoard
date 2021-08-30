import React from 'react'
import { connect } from 'react-redux'
import { viewRoute} from '../actions/'

const Link = ({ className, children, onClick }) => {
  return (
    <span className={className} 
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </span>
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
