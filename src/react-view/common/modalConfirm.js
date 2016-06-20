import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
//import $ from 'jquery'

class ModalConfirm extends Component {

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
    $('.modal-backdrop').remove()
  }


  render(){
    return (
      <div  id="mdlLoading" className="modal fade" ref="modal" data-backdrop={"static"}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">

              <h4 className="modal-title">{this.props.title || 'Confirm'}</h4>
            </div>
            <div className="modal-body">
              {this.props.children || <p>Are you sure?</p>}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">No</button>
              <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.yesCallback}>Yes</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export {ModalConfirm}
export default ModalConfirm
