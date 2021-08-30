
import React, { Component } from 'react'


export default class QuickPick extends Component {
  constructor(props) {
      super(props);
      this.state = {}
  }

  close(){
    let { close } = this.props
    setTimeout(()=>close(), 10)
  }

  render() {
      let { children, width, height } = this.props

      return (
        <div style={{position: "relative", display: "inline"}}>
        <div  onClick={(e) => {e.preventDefault(); this.close();}} style={{
          position: 'fixed',
          width: '100%',
          height: '100%',
          margin: '0',
          padding: '0',
          top: '0',
          left: '0',
          opacity: '0.2',
          backgroundColor: '#000',
          zIndex: 1
        }}>
        </div>
      <div  style={{backgroundColor: "#fff",position: "absolute", top: "0px",left: "0px", zIndex: 11, border: "1px solid black"}} >
        <div style={{ width: width,position: 'relative',height: height,display: 'inline-block'}}>
          <div className="container-fluid">
          {children}
          </div>
        </div>
        </div>
        </div>
      )
  }
}
