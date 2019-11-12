import React from 'react';
import ReactDOM from 'react-dom';
import notificationApp from './reducer/reducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import AppStyle from './styles/app.css'
import PopupTable from './container/PopupTable.js'

let store = createStore(notificationApp)	


//Set up our rawReactComponents. Ready for render
window.rawReactComponents = {
    message: (user) => {<Provider store = {store}><PopupTable userToMessage={user}/></Provider>}
  }
  /********** End bundel.js file ***********/

//Here we render the react component to the DOM and save it for later as a global
window.reactComponents = function(id){
  return {
    message : ReactDOM.render(
        <Provider store = {store}>
        <PopupTable/>
        </Provider>,
        document.getElementById(id))
  };
}
/*window.reactComponents(id) = {
    messageUser : ReactDOM.render(
        window.rawReactComponents.messageUser('Chuck'),
        document.getElementById(id);
};*/

console.log('reactComponents', reactComponents);