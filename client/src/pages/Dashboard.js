import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import DashboardSidebar from '../components/DashboardSidebar';
import DashboardMenuItem from '../components/DashboardMenuItem';

function Dashboard() {
  // url - parent path
  // path - relative path matching
  let { url, path } = useRouteMatch();

  const [isOpen, setIsOpen] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    isOpen ? setIsOpen(false) : setIsOpen(true);
  }

  return (
    <div className='h-screen flex flex-no-wrap overflow-x-hidden'>
      <DashboardSidebar isOpen={isOpen} url={url} />

      <section
        className={`h-screen w-full bg-newwhite ${
          isOpen ? '-mr-64' : 'mr-0'
        } duration-500 transition-marginRight`}
      >
        <Switch>
          <Route path={`${path}/:menuItem`}>
            <DashboardMenuItem handleClick={handleClick} />
          </Route>
          {/* go to schedule for unknown routes */}
          <Route exact path={path}>
            <Redirect to={`${url}/schedule`} />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default Dashboard;
