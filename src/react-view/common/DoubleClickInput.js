import React, {Component} from 'react'
import jq from 'jquery'

class DoubleClickInput extends Component{

  constructor(props){
    super(props)
    this.state = {
      editing : false,
      value : '',
      loading : false
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      value : nextProps.children
    })
  }

  disableEditModeOnKeyUp(e)
  {
    if(e.keyCode == 13){
      this.setState({editing : false })
      jq.ajax({
        url : this.props.urlUpdate,
        type : "PUT",
        data : {
          fieldName : this.props.fieldName,
          value : this.state.value
        },
        success : function(response){
          this.setState({
            editing : false,
            errorView : <p></p>
          })
        }.bind(this),
        error : function(err)
        {
          this.setState({
            errorView : <p style={{color: 'red'}}>Error Occured..</p>
          })
        }.bind(this)
      })
    }
  }
  render()
  {
    return this.state.editing ? (
      <input type="text"  onKeyUp={this.disableEditModeOnKeyUp.bind(this)}
      style={{display : 'block', padding : 5, width : '100%'}} onBlur={() => this.setState({editing : false})} onChange={(component) => this.setState({value : component.target.value})} value={this.state.value}/>
      ) : (
        <div>
        <p style={{padding : this.state.value ? 0 : 10}} onDoubleClick={() => this.setState({editing : true})}>{this.state.value}</p>
          {this.state.loading ? <i className="fa fa-spinner fa-spin fa-fw"></i> : ''}
          {this.state.errorView}
        </div>
      )
  }

}

DoubleClickInput.propTypes = {
  //children : React.PropTypes.string.isRequired,
  data : React.PropTypes.object,
  urlUpdate : React.PropTypes.string.isRequired,
  fieldName : React.PropTypes.string.isRequired,
}

export default DoubleClickInput
