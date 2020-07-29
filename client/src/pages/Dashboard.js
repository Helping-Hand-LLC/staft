import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import {
  dashboardOrgItemPath,
  dashboardMenuItemPath,
  dashboardSchedulePath
} from '../constants/paths';
// FIXME: import { OrgRoute } from '../components/ProtectedRoute';

import DashboardSidebar from '../components/dashboard/DashboardSidebar';
import DashboardMenuItem from '../components/dashboard/DashboardMenuItem';
import DashboardOrgItem from '../components/dashboard/organization/DashboardOrgItem';

export default function Dashboard() {
  // path - allows us to build <Route> paths relative to parent path
  // url - allows us to build relative links
  let { path, url } = useRouteMatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className='h-screen flex flex-no-wrap overflow-x-hidden'>
      <DashboardSidebar isOpen={isOpen} handleClick={handleClick} />

      <section
        className={`h-screen w-full bg-white ${
          isOpen ? '-mr-64' : 'mr-0'
        } duration-500 transition-marginRight ${
          isOpen ? 'overflow-y-hidden' : ''
        }`}
      >
        <Switch>
          <Route path={dashboardOrgItemPath(path)}>
            <DashboardOrgItem handleClick={handleClick} isOpen={isOpen} />
          </Route>
          <Route path={dashboardMenuItemPath(path)}>
            <DashboardMenuItem handleClick={handleClick} isOpen={isOpen} />
          </Route>
          {/* go to schedule for unknown routes */}
          <Route exact path={path}>
            <Redirect to={dashboardSchedulePath(url)} />
          </Route>
        </Switch>
      </section>
    </div>
  );
}
