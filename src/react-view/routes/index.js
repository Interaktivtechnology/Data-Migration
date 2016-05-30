var React = require('react')
var {DefaultRoute, NotFoundRoute, Route} = require('react-router')


import NavbarInstance from '../common/navbar'
import DsConfig from '../component/ds-config'
import Migration from '../component/migration'
//import $ from 'jquery'

if( typeof require.ensure !== "function") {
    require.ensure = function(deps, callback) {
        callback(require);
    }
}

const rootRoute = <Route path='/' component={NavbarInstance} title={'Home'}>
  <Route path='/ds-config' title="Data Source Configuration" component={DsConfig}></Route>
  <Route path='/migration' title="Migration" component={Migration}></Route>
</Route>
export default rootRoute
