var React = require('react')
var {DefaultRoute, NotFoundRoute, Route} = require('react-router')


import NavbarInstance from '../common/Navbar'
import DsConfig from '../component/DsConfig'
import GlobalMergeSetting from '../component/GlobalMergeSetting'

import MigrationList from '../component/MigrationList'
import MigrationRow from '../component/MigrationRow'
import MigrationRowDetail from '../component/MigrationRowDetail'
import OpportunityDetail from '../component/migration-opp-detail'
import AccountDetail from '../component/migration-account-detail'

//import $ from 'jquery'

if( typeof require.ensure !== "function") {
    require.ensure = function(deps, callback) {
        callback(require);
    }
}

const rootRoute = <Route path='/' component={NavbarInstance} title={'Home'}>
  <Route path='/ds-config' title="Data Source Configuration" component={DsConfig}></Route>
  <Route path='/migration' title="Migration List" component={MigrationList}>
    <Route path='/merge/new' title="New Migration" component={GlobalMergeSetting}></Route>
    <Route path='/merge/edit/:id' title="Edit Migration" component={GlobalMergeSetting}></Route>
    <Route path='/migration/view/:id' title="Migration Detail" component={MigrationRow} />
    <Route path='/migration/fix-conflict/:id' title="Fix Conflict" component={MigrationRow}>
      <Route path='/migration/fix-conflict/:id/merge' title="Row Merging" component={MigrationRowDetail} />
    </Route>
    <Route path='/migration/success/account/:id' title="Account Detail" component={AccountDetail} />
    <Route path='/migration/success/opportunity/:id' title="Opportunity Detail" component={OpportunityDetail} />
  </Route>

</Route>
export default rootRoute
