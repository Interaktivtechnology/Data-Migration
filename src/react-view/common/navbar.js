"use strict";

import {Navbar, Nav, NavItem, MenuItem, NavDropdown} from 'react-bootstrap'
import React, {Component} from 'react'
import {Link} from 'react-router'
import Home from '../home'
import ReactCSSTransitionGroup from  'react-addons-css-transition-group'



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
      <div>
        <Navbar fixedTop={false}>
          <Navbar.Header>
            <Navbar.Brand style={{margin: 10}}>
              <Link to={"/"}><img className="main-logo" src={'http://interaktiv.sg/wp-content/uploads/2014/10/Logo-web2014-edit21.png'}/> {'Migration Tools'}</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown eventKey={3} title="Migration" id="basic-nav-dropdown">
                <li>
                  <Link to={"/migration"}><i className={'fa fa-th-list'}></i> Migrate Now!</Link>
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
              <NavDropdown title={this.state.user} id="basic-nav-dropdown">
              <li>
                <Link to={"/setting/"}><i className={'fa fa-cogs'}></i> Settings</Link>
              </li>
              <MenuItem eventKey={3.1} href="/logout"><i className={'fa fa-sign-out'}></i> Logout</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
      </Navbar>
       <div id="content" className="container">
       <ul  className="breadcrumb">
        {this.props.routes.map((item, index) =>
          <li key={index}>
            <Link
              onlyActiveOnIndex={true}
              activeClassName="breadcrumb-active"
              to={item.path || ''}>
              {item.title != undefined ? item.title : ''}
            </Link>
          </li>
        )}
      </ul>
       <ReactCSSTransitionGroup
         component="div" transitionName="swap"
         transitionEnterTimeout={500} transitionLeaveTimeout={500}
       >
          {React.cloneElement(this.props.children || <Home />, { key: key })}
       </ReactCSSTransitionGroup>

      </div>

      </div>
    )
  }
}

export default NavbarInstance;
