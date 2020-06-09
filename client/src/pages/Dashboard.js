import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faCommentDots,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect
} from 'react-router-dom';

function DHeader(props) {
  return (
    <div className='p-4 flex'>
      <button className='inline-block' onClick={props.handleClick}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <h4 className='flex-1 text-center'>{props.title}</h4>
    </div>
  );
}

function Schedule(props) {
  return (
    <>
      <DHeader title={'Schedule'} handleClick={props.handleClick} />
      {/* tabs */}
      <ul className='flex bg-newlightergrey rounded w-11/12 mx-auto p-1'>
        <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
        <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
      </ul>
      {/* events */}
    </>
  );
}

function DirectMessages(props) {
  return (
    <>
      <DHeader title={'Messages'} handleClick={props.handleClick} />
      <div>DMs</div>
    </>
  );
}

function MenuItem(props) {
  let { menuItem } = useParams();

  switch (menuItem) {
    case 'schedule':
      return <Schedule handleClick={props.handleClick} />;
    case 'messages':
      return <DirectMessages handleClick={props.handleClick} />;
  }
}

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
      {/* sidebar */}
      <section
        className={`relative h-screen w-64 ${
          isOpen ? 'ml-0' : '-ml-64'
        } bg-newlightergrey flex flex-col justify-between duration-500 transition-marginLeft`}
      >
        <ul className='p-4'>
          <li className='sidebar-link'>
            <FontAwesomeIcon icon={faCalendarAlt} />
            &nbsp;
            <Link to={`${url}/schedule`}>Schedule</Link>
          </li>
          <li className='sidebar-link'>
            <FontAwesomeIcon icon={faCommentDots} />
            &nbsp;
            <Link to={`${url}/messages`}>Direct Messages</Link>
          </li>
        </ul>
        <div className='bg-primary text-newwhite flex py-2 px-3'>
          <img
            className='rounded-full mr-3'
            src='https://via.placeholder.com/50.png/FFFFFF'
            alt='Worker Profile'
          />
          <div className='flex-1'>
            <h6>Last, First</h6>
            <small className='text-newlightgrey'>Team Member</small>
          </div>
          <small className='inline-block'>
            <Link to='/logout'>Logout</Link>
          </small>
        </div>
      </section>
      {/* main */}
      <section
        className={`h-screen w-full bg-newwhite ${
          isOpen ? '-mr-64' : 'mr-0'
        } duration-500 transition-marginRight`}
      >
        <Switch>
          <Route path={`${path}/:menuItem`}>
            <MenuItem handleClick={handleClick} />
          </Route>
          <Route exact path={path}>
            {/* redirect to schedule */}
            <Redirect to={`${url}/schedule`} />
          </Route>
        </Switch>
      </section>
    </div>
  );
}

export default Dashboard;
