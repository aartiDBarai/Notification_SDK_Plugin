import React from 'react';
import { connect } from 'react-redux'
import PopupTable from '../component/PopupTable.jsx'

function select(state) {
  console.log(state.notifications);
   return {
      nmList: state.notifications
      
   }
}

export default connect(select)(PopupTable);