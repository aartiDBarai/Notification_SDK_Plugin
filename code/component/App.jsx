import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import ReactDOM from 'react-dom';
import FaBeer from 'react-icons/lib/fa/envelope.js';

import { Container } from 'reactstrap';
import {Button,ButtonToolbar , OverlayTrigger, Popover ,Grid,Row, Col, ListGroupItem,ListGroup ,ButtonGroup ,MenuItem , DropdownButton , Dropdown} from 'react-bootstrap'
import TiMessage from 'react-icons/lib/md/mode-comment'
import FaComment from 'react-icons/lib/md/mode-comment'
import FaCheck from 'react-icons/lib/fa/check-circle'
import Mright from 'react-icons/lib/md/chevron-right'
import Msetting from 'react-icons/lib/md/settings'
import Mclose from 'react-icons/lib/fa/close'
import Mdone from 'react-icons/lib/md/done'
import ScrollArea from 'react-scrollbar'
import PopupTable from '../container/PopupTable.js'
import { connect } from 'react-redux'
import { addTodo } from '../action/action.js'
import styles from '../styles/styleapp.jsx'
import AppStyle from '../styles/app.css'
import classNames from "classnames";
import FaDoubleLeft from 'react-icons/lib/fa/angle-double-left'
import Loader from 'react-loader'
import bootstrapUtils from 'react-bootstrap/lib/utils/bootstrapUtils.js'
import { readNotification } from '../action/action.js'
import {dismissAll} from '../action/action.js'
import {dismissOnlyOne} from '../action/action.js'
import Check from 'react-icons/lib/fa/check';
import CheckboxType from './CheckboxType.jsx'
import {valueUpdate} from '../action/action.js'



   



const URL_CONSTANTS= {
        _NOTIFICATION_COUNT_ENDPOINT: '/nm/nmsvc/api/user/v1/notification/getUnreadNotificationCount',
        _NOTIFICATION_ENDPOINT: '/nm/nmsvc/api/user/v1/notification/showNotifications',
        _READ_NOTIFICATION_ENDPOINT: '/nm/nmsvc/api/user/v1/notification/readnotification/:notificationID',
        _DISMISS_NOTIFICATION_ENDPOINT: '/nm/nmsvc/api/user/v1/notification/dismissnotifications',
        _SUBSCRIPTION_STATUS_ENDPOINT: '/nm/nmsvc/api/user/v1/notification/email/subscription',
        _USER_DETAILS_ENDPOINT: "/dhap-amp/api/v1/user/userDetails",
        _SUBSCRIPTION_UPDATE_ENDPOINT :"/nm/nmsvc/api/user/v1/notification/email/"
    }

    
 //_NOTIFICATION_COUNT_ENDPOINT - Just returns unread notification count   
//_NOTIFICATION_ENDPOINT - Returns complete list of Notifications
//_READ_NOTIFICATION_ENDPOINT - Sets notification as Read
//_DISMISS_NOTIFICATION_ENDPOINT - Dismisses the notification. So remove it from the display list view

var MESSAGEBODY;
var COUNT=0;
  var notificationTime=[];



class App extends React.Component {
   
     constructor(props) {
    super(props);

     this.state = {
      popoverOpen: true,
       loaded: true,
      data: 'Show More',
      pageLoaded:false,
      countLoaded:false,
      dropDownOpen:false,
      settingOpen:false,
      userLoaded:false,
      userDetails:{},
      settingLoaded:false,
      closeDropDown:false,

    }

   // this.setState({pageLoaded:false});

    this.handleClosePopup=this.handleClosePopup.bind(this); 
    
    this.handleBackToNotification=this.handleBackToNotification.bind(this);
    this.handleReadNotification=this.handleReadNotification.bind(this);
    this.handleThisNotification=this.handleThisNotification.bind(this);
    this.handleMoreNotification=this.handleMoreNotification.bind(this);
    this.handleLoadingNotification=this.handleLoadingNotification.bind(this);
    this.handleSetting=this.handleSetting.bind(this);
    this.handleStatusClick=this.handleStatusClick.bind(this);
    
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
    
    var _this=this;


    $('.DropDown-style').on('click', function (event) {
     
      
    $('.super-colors').show();
 
    
});
   
$('body').on('click', function (e) {
    if ($('.DropDown-style').has(e.target).length === 0 ) {
        $('.super-colors').hide();
        
    }
   // console.log($('.DropDown-style').has(e.target).length === 0 );
});


     
   
      
    

    
   

 
     
   
   

    if(this.state.pageLoaded===false) {
         axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed: false })
  .then(function(response) {
    
    var p=response.data.notifications;
    p.map(t=>{_this.props.dispatch(addTodo(t))});


  })
  .catch(function (error) {
    console.log(error);
  });


    }
   
    setTimeout(function() {
          this.setState({ pageLoaded: true });
        }.bind(this), 1500);

    var _this=this;
    
     setInterval(function() {
  // method to be executed;
    
  axios.get(`/nm/nmsvc/api/user/v1/notification/getUnreadNotificationCount`)
  .then(function(response) {
    
  
   console.log(response.data.notificationCount);
     COUNT=response.data.notificationCount;
     
  })
  .catch(function (error) {
    console.log(error);
  });
    setTimeout(function() {
          _this.setState({ countLoaded: true });
        }.bind(this), 1500);
   
    console.log(_this.state.countLoaded);
  console.log("every 60000 seconds");
}, 60000);

   } 
   

    
  handleMoreNotification(){

   var _this=this;
    this.setState({ loaded: false });
    this.setState({data:"     "});
    axios.post(`/nm/nmsvc/api/user/v1/notification/showNotifications`, { nextPageKey:0, viewDismissed:false})
  .then(function(response) {
    
    var p=response.data.notifications;
    p.map(t=>{_this.props.dispatch(addTodo(t))});


  })
  
    setTimeout(function() {
   
        this.onSuccess('Show More!');
     }.bind(this), 1500);
  
  

    
  }
  onSuccess(data) {
        this.setState({ loaded: true, data: data });
        
        // this.refs[5].scrollIntoView({block: 'end', behavior: 'smooth'});
         // const scrollarea = this.context.scrollArea;//ReactDOM.findDOMNode(this.refs.ListViewScroll);
         // scrollarea.scrollBottom();
         //console.log(ScrollArea.scrollBottom());
        var height = $(".Scroll-style-content")[0].scrollHeight;
        console.log(height, "=====", $(".Scroll-style-content"));
        $(".Scroll-style-content")[0].scrollTop = height;

  console.log("scroll down");
  }

    

    handleClosePopup() {


    const dropDownNM = ReactDOM.findDOMNode(this.refs.nmDropDown);
    
     $('.super-colors').hide();
    
    console.log(dropDownNM);
   
     
  }
  onToggle(){
     this.setState({ closeDropDown: !this.state.closeDropDown });
  }

  handleDetails(e,t) {
    this.setState ({
      popoverOpen:!this.state.popoverOpen
    });
    
    MESSAGEBODY=t;
    console.log(MESSAGEBODY);
    var i=MESSAGEBODY.id;
    var x=MESSAGEBODY.notificationId;
    console.log(x);
    this.props.dispatch(readNotification(i));
      axios.put(`/nm/nmsvc/api/user/v1/notification/readnotification/`+x)
  .then(function(response) {

  })

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
       <ListGroupItem bsClass="List-Group-Detail-Item" >
            <div style={{'fontSize':'13px'}} dangerouslySetInnerHTML={{ __html: MESSAGEBODY.messageSubject  }} />
            <div className="Date-detail-style">{this.renderDate(MESSAGEBODY.notificationId)}</div>
        </ListGroupItem>  
        </ListGroup>  
            <ScrollArea
                       
                       speed={0.8}
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
        j++;
      }
    }
    console.log(input);
     axios.post(`/nm/nmsvc/api/user/v1/notification/dismissnotifications`, { notificationIds:input })
  .then(function(response) {
    
      console.log("posted dismiss");

  })
     //this.props.dispatch(dismissAll());
  }

  handleThisNotification(){
    var id=MESSAGEBODY.notificationId;
    var input=[];
    input[0]=id;
    this.props.dispatch(dismissOnlyOne(MESSAGEBODY.id));
     
     axios.post(`/nm/nmsvc/api/user/v1/notification/dismissnotifications`, { notificationIds:input })
  .then(function(response) {
    
      console.log("posted dismiss only this");

  })
    this.handleBackToNotification();


  }

  

   render() {


    var y=this.props.nmList;
    var timeStamp = new Date(Date.now());

 
    
    
    var k;
    var notificationTime=[];
    for(var i in y)
    {
       var k=new Date(y[i].notificationId);
      
     
     var timeDiff = Math.abs(timeStamp.getTime() - k.getTime());
     var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    
      
      
      // get total seconds between the times
var delta = Math.abs(timeStamp - k) / 1000;

// calculate (and subtract) whole days
var days = Math.floor(delta / 86400);
delta -= days * 86400;

// calculate (and subtract) whole hours
var hours = Math.floor(delta / 3600) % 24;
delta -= hours * 3600;

// calculate (and subtract) whole minutes
var minutes = Math.floor(delta / 60) % 60;
delta -= minutes * 60;

// what's left is seconds
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
            id="ListViewScroll"
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
           <Col xs={2} style={{'font-size':'12px','width':'16%','left':'2%','paddingRight':'0px','paddingLeft':'0px','color':'#90979e'}}>
              {notificationTime[t.id]}
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
      <Button 
          style={this.state.loaded===true?{'backgroundColor':'#1E8AE7','color':'white','width': '350px' ,'marginTop':'-11px'}:{'backgroundColor':'#1E8AE7','color':'transparent','width': '350px' ,'marginTop':'-11px'}}
          onClick={this.handleMoreNotification}
      >
         <Loader loaded={this.state.loaded} top="95.5%" radius={2} lines={10} width={2} color="#fff" style={{'position':'relative'}}>
              
            </Loader>
          <div >Show More</div>  
      </Button>
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
    </Grid>
       

          
             {this.renderData(  )}
           
            </div>




          );

     }
    
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
            <div className="Date-detail-style">{this.renderDate(Date.now())}</div>
        </ListGroupItem>  
        </ListGroup>  
          <div className="Scroll-Detail-style">
              
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
        
         
         
  
        
     
     <Dropdown 
          id="dropdown-custom-1" 
          bsClass="DropDown-style" 
          bsSize="Btn" onClick={this.handleLoadingNotification} 
          style={{'float':'right' , 'left':'-130px','top':'-346px'}}
          rootCloseEvent="click"
          
          
          >
      <Dropdown.Toggle>
        {"  "}
        <div 
             className={"Chat-bubble"+((this.state.countLoaded==true && COUNT!=0)  ? '-show':'-hidden')}>
            {COUNT>=100 ?"99+":COUNT}
        </div>
      </Dropdown.Toggle>
     
      <Dropdown.Menu className="super-colors" ref="nmDropDown">
       
        <Popover id="popover-positioned-right"  placement="bottom" arrowOffsetLeft="300" positionLeft="-280" bsClass="Popover-Box" >
         {x}
       </Popover>
        
      </Dropdown.Menu>
    </Dropdown>
         
      );
   }
}

class Content extends React.Component {
    render(){
        return (
            <div onClick={this.handleSomeAction.bind(this)}> 
              
                
    
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    valueUpdatekxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
                    kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsjv kxslkldsdsjdjsj kxslkldsdsjdjsjvvv kxslkldsdsjdjsj kxslkldsdsjdjsj kxslkldsdsjdjsj
   
            </div>
        );
    }
 
    handleSomeAction(){

      console.log("hey scroll");
      console.log(this.context.scrollArea);
        this.context.scrollArea.scrollBottom();
    }
}
 
Content.contextTypes = {
    scrollArea: React.PropTypes.object
}
 
App.contextTypes = {
    scrollArea: React.PropTypes.object
};


export default (App)


