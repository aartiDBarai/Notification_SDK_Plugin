import { combineReducers } from 'redux'


const todo = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_TODO':

       var k=action.notificationId;
       var timeStamp = new Date(Date.now());

      var delta = Math.abs(timeStamp - k) / 1000;

       var days = Math.floor(delta / 86400);
       delta -= days * 86400;

       var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      var seconds = Math.floor(delta % 60);  // in theory the modulus is not required
       
     var notificationTime="";
      if(days>0)
      notificationTime=days+"d ago";
    else if(days==0 && hours<24 && hours>0)
       notificationTime=hours+"h ago";
    else if(days==0 && hours==0 && minutes>0 && minutes<60)
      notificationTime=(minutes)+"m ago";
    else if(days==0 && hours==0 && minutes==0)
      notificationTime=(seconds)+"s ago";

      return {
        notificationId: action.notificationId,
        recipient: action.recipient,
        messageSubject: action.messageSubject,
        notificationState: action.notificationState,
        sender: action.sender,
        important: action.important,
        webNotificationBody: action.webNotificationBody,
        id:action.id,
        messageBody:action.messageBody,
        markValue:action.markValue,
        notificationSent:notificationTime,
        


      }
      case 'READ_UPDATE':
        if(state.id !== action.id)
          { return state}
        return Object.assign({}, state, {
        notificationState: "READ"
      })
      case 'DISMISS_ONE':
        if(state.id !== action.id)
          { return state}
        return Object.assign({}, state, {
        notificationState: "UNREAD"
      })
      case 'VALUE_UPDATE':
         if(state.id !== action.id)
          { return state}
        return Object.assign({}, state, {
          markValue: !state.markValue
      }) 
      default:
      return state
  }
}

const notifications = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
      case 'READ_UPDATE':
         return state.map(t=> todo(t,action))
      case 'DISMISS_ALL':   
        return state.filter(t => (t.markValue === true))
      case 'DISMISS_ONE':
        return state.filter(t=> (t.id !== action.id))  
      case 'VALUE_UPDATE':
        return state.map(t=> todo(t,action))
      case 'NEW_UPDATE':
        return [];  
       default:
      return state
  }
}

const notificationApp = combineReducers({
  notifications
})

export default notificationApp