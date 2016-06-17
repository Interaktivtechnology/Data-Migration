var React = require('react')
var {DefaultRoute, NotFoundRoute, Route} = require('react-router')


import NavbarInstance from '../common/navbar'
import DsConfig from '../component/ds-config'
import Migration from '../component/migration'
import MigrationSave from '../component/migration-save'
import MigrationList from '../component/migration-list'
import MigrationRow from '../component/migration-row'
import MigrationRowDetail from '../component/migration-row-detail'
//import $ from 'jquery'

if( typeof require.ensure !== "function") {
    require.ensure = function(deps, callback) {
        callback(require);
    }
}

const rootRoute = <Route path='/' component={NavbarInstance} title={'Home'}>
  <Route path='/ds-config' title="Data Source Configuration" component={DsConfig}></Route>
  <Route path='/migration' title="Migration List" component={MigrationList}>
    <Route path='/migration/new' title="New Migration" component={Migration}></Route>
    <Route path='/migration/save' title="Save Migration" component={MigrationSave}></Route>
    <Route path='/migration/edit' title="Edit Migration" component={Migration}></Route>
    <Route path='/migration/view/:id' title="Migration Detail" component={MigrationRow} />
    <Route path='/migration/fix-conflict/:id' title="Fix Conflict" component={MigrationRow}>
      <Route path='/migration/fix-conflict/:id/merge' title="Row Merging" component={MigrationRowDetail} />
    </Route>
  </Route>

</Route>
export default rootRoute
