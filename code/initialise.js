/********** This is in our legacy app ***********/
//Set up our events in jQuery
$(document).ready(function() {
  //Handle the click event on the button
  $('#changeName').click(function(e) {
    e.preventDefault()
    reactComponents('app').message.setState({
      userToMessage: 'It Changed!'
    });
    
  })
})

