import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


class ModalLoading extends Component {

  constructor(props){
    super(props)
    this.state = {
      type : 'Salesforce'
    }
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

  render(){


    return (
      <div  id="mdlLoading" className="modal fade" ref="modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Loading</h4>
            </div>
            <div className="modal-body">
              <i className="fa fa-spinner fa-spin fa-5x fa-fw"></i>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export {ModalLoading}
