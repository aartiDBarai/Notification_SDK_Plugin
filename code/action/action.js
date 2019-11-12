 let nextTodoId = 0;
 export const addTodo = (object) => {
    
 	return {
 		type:'ADD_TODO' ,
 		id:nextTodoId++ ,
 		notificationId: object.notificationId,
        recipient: object.recipient,
        messageSubject: object.messageSubject,
        notificationState: object.notificationState,
        sender: object.sender,
        important: object.important,
        webNotificationBody: object.webNotificationBody,
        messageBody:object.messageBody,
        markValue:false,
 	}
 }

 export const readNotification = (id) => {

 	return {
 		type:'READ_UPDATE',
 		id
 	}
 }

 export const dismissAll =() => {

 	return {
 		type:'DISMISS_ALL',
 	}
 }

 export const dismissOnlyOne = (id) => {

 	return {
 		type:'DISMISS_ONE',
 		id
 	}
 }

 export const valueUpdate = (id) => {
 	return {
 		type:'VALUE_UPDATE',
 		id
 	}
 }

  export const newUpdate = () => {
 	return {
 		type:'NEW_UPDATE',
 		
 	}
 }