import React from 'react';
import { connect } from 'react-redux'
import App from '../component/App.jsx'

function select(state) {
  console.log(state.notifications);
   return {
      nmList: state.notifications
      
   }
}
export default connect(select)(App);