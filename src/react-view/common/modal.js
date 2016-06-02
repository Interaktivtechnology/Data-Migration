import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
//import $ from 'jquery'

class ModalLoading extends Component {

  constructor(props){
    super(props)
    this.state = {
      type : 'Salesforce'
    }
    this._hide = this._hide.bind(this)
  }

  componentDidMount(){
    var id = ReactDOM.findDOMNode(this).id

    $('#' + id).modal('show');
    $('#' + id).on('hidden.bs.modal', this.props.handleHideModal);
  }

  _onChange(value){
    this.setState({
      type : value
    })
  }

  _hide () {
    var id = ReactDOM.findDOMNode(this).id
    $('#' + id).modal('hide');
  }
  render(){
    return (
      <div  id="mdlLoading" className="modal fade" ref="modal" data-backdrop={"static"}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">

              <h4 className="modal-title">Loading</h4>
            </div>
            <div className="modal-body">
              <p className="text-center">
                <i className="fa fa-spinner fa-spin fa-5x fa-fw"></i>
                <br />
                <span style={{marginTop: 20}}>{this.props.content || "Loading..."}</span>

              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export {ModalLoading}
