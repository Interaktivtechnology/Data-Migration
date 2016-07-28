"use strict";

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap'
import React, {Component} from 'react'
import {Link} from 'react-router'
import Home from '../home'
import ReactCSSTransitionGroup from  'react-addons-css-transition-group'

const CURRENT_USER = CURRENT_USER ? CURRENT_USER : {}

class NavbarInstance extends Component{
  constructor(props){
    super(props)
    this.state = {
      user: 'Eko Purnomo'
    }

  }
  render(){

    const { pathname } = this.props.location
    const depth = this.props.routes.length
    const key = pathname.split('/')[1] || 'root'
    return (
      <div className="container-fluid">
        <Navbar fixedTop={false} fluid={true} inverse={true}>
          <Navbar.Header>
            <Navbar.Brand style={{margin: 10}}>
              <Link to={"/"}><img className="main-logo" src={'//interaktiv.sg/wp-content/uploads/2014/10/Logo-web2014-edit21.png'}/> {'Migration Tools'}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Migration" id="basic-nav-dropdown">
                <li>
                  <Link to={"/migration/"}><i className={'fa fa-th-list'}></i> Migration List</Link>
                </li>
                <li>
                  <Link to={"/ds-config"}><i className={'fa fa-database'}></i> Data Source Config</Link>
                </li>
                <li className="divider"></li>
                <li>
                  <Link to={"/DataSource"}><i className={'fa fa-medkit'}></i> System Health</Link>
                </li>
              </NavDropdown>

            </Nav>

            <Nav pullRight>
              <NavDropdown title={CURRENT_USER ? CURRENT_USER.fullName : ''} id="basic-nav-dropdown">
              <li>
                <Link to={"/setting"}><i className={'fa fa-cogs'}></i> Settings</Link>
              </li>
              <MenuItem eventKey={3.1} href="/auth/logout"><i className={'fa fa-sign-out'}></i> Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
       <div id="content" className="container-fluid">
       <ul  className="breadcrumb">
        {this.props.routes.map((item, index) =>{
          var params = item.component.contextType ? item.component.contextType.params : {}
          var matches = item.path.match(/:[a-zA-Z]{1,30}[\/]/ig)
          //console.log(item)
          if(typeof params == 'object'){
            Object.keys(params).forEach((row, i) => {
              console.log(row)
            })
          }

          if(this.props.routes.length != (index + 1)){
            
            return <li key={index}>
              <Link
                onlyActiveOnIndex={true}
                activeClassName="breadcrumb-active"
                to={item.path.replace(/:[a-zA-Z0-9]{1,100}/ig,'') || ''}>
                {item.title != undefined ? item.title : '1'}
              </Link>
            </li>
          }
          else
            return <li key={index}>
              {item.title != undefined ? item.title : ''}
            </li>
        }
        )}
      </ul>
       <ReactCSSTransitionGroup
         component="div"
          transitionName="carousel" transitionEnterTimeout={500} transitionLeaveTimeout={500}
       >
          {React.cloneElement(this.props.children || <Home />, { key: key })}
       </ReactCSSTransitionGroup>

      </div>

      </div>
    )
  }
}

export default NavbarInstance;
