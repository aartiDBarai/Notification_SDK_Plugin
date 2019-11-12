import React from 'react';
import Check from 'react-icons/lib/fa/check';

class CheckboxType extends React.Component {
  getDefaultprops() {
     return {
        
        name: '',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#c3c4c6',
        borderRadius: '4px',
        checkColor: '#60cd18',
        height: '1px',
        width: '',
        namePaddingLeft: '10px',
        namePaddingRight: '',
        fontSize:'11px'
   
        };
  }

  render() {
     var style = {
            boxStyle: {
            borderWidth: this.props.borderWidth,
            borderStyle: this.props.borderStyle,
            borderColor: this.props.borderColor,
            paddingLeft: this.props.width,
                    paddingRight: this.props.width,
            paddingTop: this.props.height,
            paddingBottom: this.props.height,
            fontSize:this.props.fontSize,
            borderRadius:'50%',
            display:'inline-block',
            position:'relative',
            cursor:'pointer',
            visibility:this.props.load,

          },
          show: {
            
            color: 'grey',
            border:'1px solid grey'
          },
          hidden: {
            
            color: '#fff',
            backgroundColor:'#87ca5a'
          },
          name: {
            paddingLeft: this.props.namePaddingLeft,
            paddingRight: this.props.namePaddingRight
          }
        };
        return (
        <div>
            <span style={style.boxStyle}>
                    <Check className="Check-style" style={(this.props.value===true) ?  style.hidden : style.show}></Check>
                    </span>
           
        </div>
        );
  }
}

export default CheckboxType;