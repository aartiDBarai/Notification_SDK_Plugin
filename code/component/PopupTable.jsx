import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import {Button,ButtonToolbar , OverlayTrigger, Popover ,Grid,Row, Col, ListGroupItem,ListGroup ,Dropdown} from 'react-bootstrap'
import Mright from 'react-icons/lib/md/chevron-right'
import Msetting from 'react-icons/lib/md/settings'
import Mclose from 'react-icons/lib/fa/close'
import ScrollArea from 'react-scrollbar'
import { connect } from 'react-redux'
import { addTodo } from '../action/action.js'
import AppStyle from '../styles/app.css'
import classNames from "classnames";
import FaDoubleLeft from 'react-icons/lib/fa/angle-double-left'
import { readNotification } from '../action/action.js'
import {dismissAll} from '../action/action.js'
import {dismissOnlyOne} from '../action/action.js'
import CheckboxType from './CheckboxType.jsx'
import {valueUpdate} from '../action/action.js'
import Loader from 'react-loader'
import notificationApp from '../reducer/reducer';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import {newUpdate} from '../action/action.js'
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var MESSAGEBODY;
var COUNT=0;
var pageKey=0;

class PopupTable extends React.Component {


     constructor(props) {
    super(props);

     this.state = {
      popoverOpen: true,
       loaded: true,
      data: 'Show More',
      pageLoaded:false,
      countLoaded:false,
      settingOpen:false,
      userLoaded:false,
      userDetails:{},
      settingLoaded:false,
      disableButton:false,
      thingIsVisible: false,

    }

    this.handleClosePopup=this.handleClosePopup.bind(this); 
    
    this.handleBackToNotification=this.handleBackToNotification.bind(this);
    this.handleReadNotification=this.handleReadNotification.bind(this);
    this.handleThisNotification=this.handleThisNotification.bind(this);
    this.handleMoreNotification=this.handleMoreNotification.bind(this);
    this.handleLoadingNotification=this.handleLoadingNotification.bind(this);
    this.handleSetting=this.handleSetting.bind(this);
    this.handleStatusClick=this.handleStatusClick.bind(this);

    
    }

    appear(e,visible) {
      this.setState({thingIsVisible: visible}); 
      console.log(this.state.thingIsVisible);
    }

    componentWillMount() {
    
    

    var _this=this;
  
  axios.get(`/nm/nmsvc/api/user/v1/notification/getUnreadNotificationCount`)
    .then(function(response) {
      
    
     console.log(response.data.notificationCount);
       COUNT=response.data.notificationCount;
       
    })
    .catch(function (error) {
      console.log(error);
    });
      setTimeout(function() {
            this.setState({ countLoaded: true });
          }.bind(this), 1500);
     
      console.log(this.state.countLoaded);
  
        var _this=this;
    setInterval(function() {
  // method to be executed;
    
  axios.get(`/nm/nmsvc/api/user/v1/notification/getUnreadNotificationCount`)
  .then(function(response) {
    
     if(COUNT==0)
     {
        COUNT=response.data.notificationCount;
     }
     else if(response.data.notificationCount!=COUNT )
    { COUNT=response.data.notificationCount;
         console.log(COUNT);
         console.log("change");
          axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
        .then(function(response) {
    
    var p=response.data.notifications;
    var pageKey=response.data.nextPageKey;
    console.log(pageKey);
    _this.props.dispatch(newUpdate());
    p.map(t=>{_this.props.dispatch(addTodo(t))});


  })
  .catch(function (error) {
    console.log(error);
  }); 

 
  setTimeout(function() {
     
           _this.setState({thingIsVisible: true});
       }.bind(this), 2500);
       setTimeout(function() {
     
           _this.setState({thingIsVisible: false});
       }.bind(this), 5000);
  
      }
    })
  .catch(function (error) {
    console.log(error);
  });
    

           
          _this.setState({ countLoaded: true });
       
   console.log("loading");
    
}, 70000);
   
        

   
  }

   handleSetting(){
      this.setState({settingOpen:!this.state.settingOpen});

        var _this=this;
     this.setState({ userLoaded: false });
    if(this.state.userLoaded===false) {
         axios.get(`/nm/nmsvc/api/user/v1/notification/email/subscription`)
  .then(function(response) {
    
   console.log(response.data);
   _this.setState({userDetails:response.data});


  })
  .catch(function (error) {
    console.log(error);
  });

    }

    setTimeout(function() {
          this.setState({ userLoaded: true });
        }.bind(this), 1500);

  }  

   handleLoadingNotification() {

   
    console.log("onClick overlay");

      $('.DropDown-style').on('click', function (event) {
    $('.super-colors').show();
});
   
$('body').on('click', function (e) {
    if ($('.DropDown-style').has(e.target).length === 0 ) {
        $('.super-colors').hide();
        
    }
    console.log($('.DropDown-style').has(e.target).length === 0 );
});

    
    var _this=this;
    if(this.state.pageLoaded===false) {
         axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
  .then(function(response) {
    
    var p=response.data.notifications;
    var pageKey=response.data.nextPageKey;
    console.log(pageKey);
    p.map(t=>{_this.props.dispatch(addTodo(t))});


  })
  .catch(function (error) {
    console.log(error);
  });


    }
   
    setTimeout(function() {
          this.setState({ pageLoaded: true });
        }.bind(this), 1500);

    if(this.state.pageLoaded===true && this.state.disableButton==true) {
         this.setState({ disableButton: false });
         axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
  .then(function(response) {
    
    var p=response.data.notifications;
    var pageKey=response.data.nextPageKey;
    console.log(pageKey);
     _this.props.dispatch(newUpdate());
    p.map(t=>{_this.props.dispatch(addTodo(t))});


  })
  .catch(function (error) {
    console.log(error);
  });


    }


    var _this=this;
    
//      setInterval(function() {
//   // method to be executed;
    
//   axios.get(`/nm/nmsvc/api/user/v1/notification/getUnreadNotificationCount`)
//   .then(function(response) {
    
  
//      if(response.data.notificationCount!=COUNT)
//     { COUNT=response.data.notificationCount;
//          console.log(COUNT);
//          console.log("change");
//           axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
//         .then(function(response) {
    
//     var p=response.data.notifications;
//     var pageKey=response.data.nextPageKey;
//     console.log(pageKey);
//     _this.props.dispatch(newUpdate());
//     p.map(t=>{_this.props.dispatch(addTodo(t))});


//   })
//   .catch(function (error) {
//     console.log(error);
//   }); 

//   setTimeout(function() {
   
//          _this.setState({thingIsVisible: true});
//      }.bind(this), 2500);
//      setTimeout(function() {
   
//          _this.setState({thingIsVisible: false});
//      }.bind(this), 5000);

//     }


     
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
//     setTimeout(function() {

           
//           _this.setState({ countLoaded: true });
//         }.bind(this), 0);
   
//  // axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
//  //        .then(function(response) {
    
//  //    var p=response.data.notifications;
//  //    console.log(p);
//  //    _this.props.dispatch(newUpdate());
//  //    p.map(t=>{_this.props.dispatch(addTodo(t))});


//  //  })
//  //  .catch(function (error) {
//  //    console.log(error);
//  //  }); 
//   console.log("every 60000 seconds");


// }, 60000);

    
   } 
   

    
  handleMoreNotification(){

   
   var _this=this;
    this.setState({ loaded: false });
    this.setState({data:"     "});
    axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:pageKey, viewDismissed:false})
  .then(function(response) {
    
    var p=response.data.notifications;
    pageKey=response.data.nextPageKey;
    console.log(pageKey);
    p.map(t=>{_this.props.dispatch(addTodo(t))});


  })
  
    setTimeout(function() {
   
        this.onSuccess('Show More!');
     }.bind(this), 2500);
  
  
     
    
  }
  onSuccess(data) {
        this.setState({ loaded: true, data: data });
        
        var height = $(".Scroll-style-content")[0].scrollHeight;
        console.log(height, "=====", $(".Scroll-style-content"));
        $(".Scroll-style-content")[0].scrollTop = height;
         console.log(this.props.nmList.length);
         if(pageKey==0)
         {
            this.setState({disableButton:true});
         }
  console.log("scroll down");
  }

    

    handleClosePopup() {
   
   $('.super-colors').hide();
     
  }

  handleDetails(e,t) {
    this.setState ({
      popoverOpen:!this.state.popoverOpen
    });
    
    MESSAGEBODY=t;
    console.log(MESSAGEBODY);
    if(MESSAGEBODY.notificationState=="UNREAD")
      COUNT--;
    var i=MESSAGEBODY.id;
    var x=MESSAGEBODY.notificationId;
    console.log(x);
    this.props.dispatch(readNotification(i));
      axios.put(`/nm/nmsvc/api/user/v1/notification/readnotification/`+x)
  .then(function(response) {

  });


  }

  handleClick(e,t) {
     
    var id=t.id;
    console.log(id);
    
    this.props.dispatch(valueUpdate(id));
   
    console.log("done change");
  }

  handleBackToNotification() {
     if(this.state.settingOpen==true)
     {
      this.setState({settingOpen:!this.state.settingOpen});

     }
     else
     {
        this.setState ({
      popoverOpen:!this.state.popoverOpen
    });
     }
  }

  handleStatusClick(){


      if(this.state.userDetails.status==false){

       axios.post(`/nm/nmsvc/api/user/v1/notification/email/unsubscribe`)
  .then(function(response) {
    
    

  })
  .catch(function (error) {
    console.log(error);
  });
   console.log("unsubscribe");

 }

 else
 {
      axios.post(`/nm/nmsvc/api/user/v1/notification/email/subscribe`)
  .then(function(response) {
    
    

  })
  .catch(function (error) {
    console.log(error);
  });
   console.log("subscribe");
 }
   this.setState({userDetails:{status:!this.state.userDetails.status , emailAddress:this.state.userDetails.emailAddress}});

  }


  renderSettingPage(){

    var x;
    console.log("render setting");

     console.log(this.state.userDetails);
    if(this.state.userLoaded==true)
    {
      console.log(this.state.userDetails);
      x=( <Row style={{'alignItems':'center'}}>
           <Col xs={1} style={{'width':'9%','height':'9%',padding:'0px','marginLeft':'10px'}}>
               <span onClick={this.handleStatusClick}>
            <CheckboxType name='Reserve Guarantee' value={this.state.userDetails.status} load={this.state.userDetails==false?'hidden':'visible'}/>
             </span> 
            </Col>
            
           <Col xs={6} className={"Col-Xs6-Style-show"  }>
                
               <div>Do not email notification to <strong>{this.state.userDetails.emailAddress}</strong></div>
             
           </Col>
           </Row>);

    }
    
   return(<div>
           <ListGroupItem bsClass="List-Group-Detail-Item" style={{'borderBottomColor':'transparent','paddingLeft':'6px'}}>
            {x}
            </ListGroupItem>  

          </div>);

  }

  renderDate(t){
    var date=new Date(t);
    var d=date;
    date=date.toDateString();
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
  var h = hh;
  if (h >= 12) {
    h = hh - 12;
    dd = "PM";
  }
  if (h == 0) {
    h = 12;
  }
  m = m < 10 ? "0" + m : m;

  s = s < 10 ? "0" + s : s;
  date=date+" "+h+":"+m+":"+s+" "+dd;
  return(<div>{date}</div>);
  }

  renderData(){
    
    return (
      
      <div>
       <ListGroup >
       <ListGroupItem bsClass="List-Group-Detail-Item">
            <div style={{'fontSize':'13px'}} dangerouslySetInnerHTML={{ __html: MESSAGEBODY.messageSubject  }} />
            <div className="Date-detail-style">{this.renderDate(MESSAGEBODY.notificationId)}</div>
        </ListGroupItem>  
        </ListGroup>  
            <ScrollArea
                       speed={0.8}
                       className="area"
                       contentClassName="Scroll-Detail-style-content"
                       className="Scroll-Detail-style"
                       horizontal={false}
                       
             >
       
           <div className="Detail-div-style" dangerouslySetInnerHTML={{ __html: MESSAGEBODY.webNotificationBody  }} />
        
       </ScrollArea> 
       </div>
 
        
      
      );
  } 

  handleReadNotification() {
   
    var z=this.props.nmList;
    var y=this.props;
    var input=[];
    var j=0;
    for(var i in z) {
      if(z[i].markValue===true) {
        input[j]=z[i].notificationId;
        y.dispatch(dismissOnlyOne(z[i].id));
        if(z[i].notificationState=="UNREAD")
          COUNT--;
        j++;
      }
    }
    console.log(input);
     axios.post(`/nm/nmsvc/api/user/v1/notification/dismissnotifications`, { notificationIds:input })
  .then(function(response) {
    
      console.log("posted dismiss");

  });

  
  }

  handleThisNotification(){
    var id=MESSAGEBODY.notificationId;
    var input=[];
    input[0]=id;
    this.props.dispatch(dismissOnlyOne(MESSAGEBODY.id));
     
     axios.post(`/nm/nmsvc/api/user/v1/notification/dismissnotifications`, { notificationIds:input })
  .then(function(response) {
    
      console.log("posted dismiss only this");

  });

   
    this.handleBackToNotification();


  }

  

   render() {

//     var _this=this;
//     setInterval(function() {
//   // method to be executed;
    
//   axios.get(`/nm/nmsvc/api/user/v1/notification/getUnreadNotificationCount`)
//   .then(function(response) {
    
//      if(COUNT==0)
//      {
//         COUNT=response.data.notificationCount;
//      }
//      else if(response.data.notificationCount!=COUNT )
//     { COUNT=response.data.notificationCount;
//          console.log(COUNT);
//          console.log("change");
//           axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
//         .then(function(response) {
    
//     var p=response.data.notifications;
//     var pageKey=response.data.nextPageKey;
//     console.log(pageKey);
//     _this.props.dispatch(newUpdate());
//     p.map(t=>{_this.props.dispatch(addTodo(t))});


//   })
//   .catch(function (error) {
//     console.log(error);
//   }); 

 
//   setTimeout(function() {
     
//            _this.setState({thingIsVisible: true});
//        }.bind(this), 2500);
//        setTimeout(function() {
     
//            _this.setState({thingIsVisible: false});
//        }.bind(this), 5000);
  
//       }
//     })
//   .catch(function (error) {
//     console.log(error);
//   });
    

           
//           _this.setState({ countLoaded: true });
       
//    console.log("loading");
    
// }, 70000);
   

    var y=this.props.nmList;
    var timeStamp = new Date(Date.now());
    

    var k;
    var notificationTime=[];

    for(var i in y)
    {
       var k=y[i].notificationId;
      var delta = Math.abs(timeStamp - k) / 1000;

       var days = Math.floor(delta / 86400);
       delta -= days * 86400;

       var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      var seconds = Math.floor(delta % 60);  // in theory the modulus is not required
       
     
      if(days>0)
      notificationTime[i]=days+"d ago";
    else if(days==0 && hours<24 && hours>0)
       notificationTime[i]=hours+"h ago";
    else if(days==0 && hours==0 && minutes>0 && minutes<60)
      notificationTime[i]=(minutes)+"m ago";
    else if(days==0 && hours==0 && minutes==0)
      notificationTime[i]=(seconds)+"s ago";
    }
    
    var flag=0;
    for(var i in y){
      if(y[i].markValue==true)
      {
        flag=1; break;
      }
    }


    var x;
      var that=this;
     if(this.state.popoverOpen==true)
     {
       x= (
       <div>
       
        <Grid style={{'marginTop':'5px','paddingRight':'3px'}}>
        
   <Row >
      
       <Col xs={5} style={{'width':'92px','left':'200px','paddingRight':'0px','paddingLeft':'27px'}}> 
      <span onClick={this.handleReadNotification}>
         <div className={"Mdone-div-style"+(flag==1 ? '-show':'-hidden')} style={{'marginTop':'4px','marginLeft':'6px'}}>Dimiss All
           </div>
      </span> 
      </Col>    
       
      <Col xs={4} style={{'width':'20px','padding':'0px','marginLeft':'190px','marginRight':'-27px'}}>  
      <div className="Msetting-div-style">
         <span onClick={this.handleSetting}><Msetting className="Mdone-style"/></span>

      </div>
      </Col>

      <Col xs={3} style={{'width':'20px','padding':'0px','marginLeft':'43px'}}> 
      <div className="Mclose-div-style" style={{'marginTop':'1.5px','marginLeft':'2px'}}>
          <span onClick={this.handleClosePopup}><Mclose className="Mdone-style"/></span>
      </div>
      </Col>

    </Row>
    </Grid>
         <div style={this.state.pageLoaded==false?{'visibility':'hidden'}:{'visibility':'visible'}}  >
         <div >
         <ListGroup style={{'marginBottom':'9px'}} >
    <ScrollArea
            speed={0.8}
            className="area"
            contentClassName="Scroll-style-content"
            className="Scroll-style"
            ref="ListViewScroll"
            horizontal={false}
            >
    
    {this.props.nmList.map(t=>
      <ListGroupItem 
               
              bsClass="List-Group-Item" 
              ref={t.id}
              
                       >
                      
            <Row style={{'alignItems':'center','display':'flex'}}>
           <Col xs={1} style={{'width':'9%','height':'9%',padding:'0px','marginLeft':'10px'}}>
               <span onClick={(e)=>this.handleClick(e,t)}>
            <CheckboxType name='Reserve Guarantee' value={t.markValue} load={this.state.pageLoaded==false?'hidden':'visible'}/>
             </span> 
            </Col>
            
           <Col xs={6} className={"Col-Xs6-Style"+(t.notificationState==="READ" ? '-hidden':'-show')}>
                <span onClick={(e)=>this.handleDetails(e,t)}>
               <div dangerouslySetInnerHTML={{ __html: t.messageSubject  }} />
               </span>
           </Col>
           <Col xs={1} style={t.important==true ? {'font-size':'12px','paddingRight':'0px','paddingLeft':'0px','color':'red', 'width': '1px'}:{'font-size':'12px','paddingRight':'0px','paddingLeft':'0px','color':'transparent', 'width': '1px'}}>
              <strong>{"!"}</strong>
           </Col>
           <Col xs={2} style={{'font-size':'12px','width':'16%','left':'-1px','paddingRight':'0px','paddingLeft':'0px','color':'#90979e','textAlign':'center'}}>
              {t.notificationSent!=' ' ? t.notificationSent:notificationTime[t.id]}
           </Col>
           <Col xs={1} style={{'width':'5%','padding':'0px','margin':'0px','left':'1%'}}>
               <Mright style={{ 'color':'#545454' ,'font-size':'25px'}}/>
           </Col>
           
           </Row>
           
    </ListGroupItem>
      
    )}
  </ScrollArea> 
  
  </ListGroup>
  </div>
      <div style={this.state.disableButton==false ? {'visibility':'visible'}:{'visibility':'hidden'}}>
      <Button 
          style={this.state.loaded===true?{'backgroundColor':'#1E8AE7','color':'white','width': '348px' ,'marginTop':'-11px','backgroundImage':'none','textShadow':'none','border':'0','borderRadius':'0 0 2px 2px'}:{'backgroundColor':'#1E8AE7','color':'transparent','width': '348px' ,'marginTop':'-11px','backgroundImage':'none','textShadow':'none','border':'0','borderRadius':'0 0 2px 2px'}}
          onClick={this.handleMoreNotification}
      >
         <Loader loaded={this.state.loaded} top="95.5%" radius={2} lines={10} width={2} color="#fff" style={{'position':'relative'}}>
              
            </Loader>
          <div >Show More</div>  
      </Button>
      </div>
     </div>
      <Loader loaded={this.state.pageLoaded}>
      </Loader>
  </div>

        );
     }
     else if(this.state.popoverOpen==false && this.state.settingOpen==false)
     {
         x=(

           <div style={{'alignItems':'center'}}>
            <Grid style={{'marginTop':'5px','paddingRight':'3px'}}>
    
     <Row style={{'paddingLeft':'10px','width':'350px'}}>
     <Col xs={6} style={{'padding':'0px','left':'-5px','marginTop':'0.5px'}}>
      <div className="Mback-div-style" >
         <span onClick={this.handleBackToNotification} >
             <FaDoubleLeft className="Mdone-style"/>Back Notifications</span>
      </div>
      </Col>

      <Col xs={3} style={{'padding':'0px','width':'45px','marginLeft':'90px'}}>
      <span onClick={this.handleThisNotification}>
         <div className="MdetailDone-div-style" style={{'marginTop':'4px'}}>Dismiss
           
          </div>
      </span>
      </Col>

         <Col xs={3} style={{'padding':'0px','width':'20px','marginLeft':'-5px'}}>
          <div className="MdetailClose-div-style">
          <span onClick={this.handleClosePopup}><Mclose className="MdetailClose-style"/></span>
      </div>
      </Col>

    </Row>
    </Grid>{this.renderData(  )}
    </div>
     );}

     if(this.state.settingOpen==true)
     {
         x=(   <div style={{'alignItems':'center'}}>
            <Grid style={{'marginTop':'5px','paddingRight':'3px'}}>
    
     <Row style={{'paddingLeft':'10px','width':'350px'}}>

    <Col xs={9} style={{'padding':'0px','marginLeft':'-7px'}}>
      <div className="Mback-div-style" >
         <span onClick={this.handleBackToNotification} >
             <FaDoubleLeft className="Mdone-style"/>Back Notifications</span>
      </div>

      </Col>
          
        <Col xs={3} style={{'width':'20px','padding':'0px','marginLeft':'50px'}}>  
          <div className="MdetailClose-div-style" style={{'marginLeft':'2px'}}>
          <span onClick={this.handleClosePopup}><Mclose className="MdetailClose-style"/></span>
      </div>
      </Col>

    </Row>
    </Grid>
       

          <ListGroup style={{'marginBottom':'4px'}} >
       <ListGroupItem bsClass="List-Group-Detail-Item">
            <div style={{'fontSize':'13px'}}>Manage Settings</div>
           
        </ListGroupItem>  
        </ListGroup>  
          <div className="Scroll-Detail-style" style={{'height':'332px'}}>
              
            {this.renderSettingPage()}
            <Loader loaded={this.state.userLoaded}>
            </Loader>
           </div>
   </div>

          );
     }
    


    var messageCount=0;
    var a=this.props.nmList;
    for(var i in a) {
      if(a[i].notificationState==="UNREAD")
        {  
          messageCount=messageCount+1;
          
        }
       
          

    }
      
      return (
        
         <div style={{'width':'30px','height':'24px'}}>
     <Dropdown id="dropdown-custom-1" bsClass="DropDown-style" bsSize="Btn" onClick={this.handleLoadingNotification}>
      <Dropdown.Toggle>
        {"  "}
        <div 
             className={"Chat-bubble"+((this.state.countLoaded==true && COUNT!=0)  ? '-show':'-hidden')}>
            {COUNT>0 ? COUNT>=100 ? "99+":COUNT:' '}
        </div>
      </Dropdown.Toggle>

      <Dropdown.Menu className="super-colors">
        <Popover id="popover-positioned-right"  placement="bottom" arrowOffsetLeft="300" positionLeft="-279" bsClass="Popover-Box">
         {x}
       </Popover>
      </Dropdown.Menu>
    </Dropdown>
    <div>

          
          <TheThing visible={this.state.thingIsVisible} newNotification={this.props.nmList}/>
        </div>
        
         </div>
      );
   }
}

class TheThing extends React.Component {

  constructor(props)
  {
    super(props);
  }

  render() {
        
        var component;
        var x=this.props.newNotification[0];
       // console.log(this.props.newNotification[0]);
      if (typeof x !== 'undefined' && this.props.visible) {
       
          component = (
               <Popover id="popover-positioned-right" arrowOffsetLeft="220" positionLeft="-200" placement="bottom" style={{'marginTop':'28px','width':'350px'}}>
               
                      
            <Row style={{'alignItems':'center','display':'flex'}}>
           <Col xs={2} style={{'width':'9%','height':'9%',padding:'0px','marginLeft':'10px'}}>
               
            <CheckboxType name='Reserve Guarantee' value={true} load={'visible'}/>
             
            </Col>
            
           <Col xs={10} style={{'fontSize':'13.5px','wordBreak':'break-word'}}>
                
               <div dangerouslySetInnerHTML={{ __html: x.messageSubject  }} />
               
           </Col>
           
           
           </Row>
           
   
               </Popover>
            );
        }
       
        
        return (
          <ReactCSSTransitionGroup transitionName="thing" >
            {component}
            </ReactCSSTransitionGroup>
        );

    }
}


export default (PopupTable);