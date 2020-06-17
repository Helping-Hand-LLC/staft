import React, { useState } from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import DSidebar from '../components/dashboard/Sidebar';
import DMenuItem from '../components/dashboard/MenuItem';

export default function Dashboard() {
  // path - allows us to build <Route> paths relative to parent path
  // url - allows us to build relative links
  let { path, url } = useRouteMatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(!isOpen);

  return (
    <div className='h-screen flex flex-no-wrap overflow-x-hidden'>
      <DSidebar isOpen={isOpen} url={url} />

      <section
        className={`h-screen w-full bg-white ${
          isOpen ? '-mr-64' : 'mr-0'
        } duration-500 transition-marginRight`}
      >
        <Switch>
          <Route path={`${path}/:menuItem`}>
            <DMenuItem handleClick={handleClick} />
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
