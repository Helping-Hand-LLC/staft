import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Link,
  Switch,
  Route,
  useRouteMatch,
  useParams,
  Redirect
} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 256; // 64 on tailwindcss scale

// function DirectMessages(props) {
//   return (
//     <>
//       <DashboardHeader title='Messages' handleClick={props.handleClick} />
//       <div>DMs</div>
//     </>
//   );
// }

// function Schedule(props) {
//   return (
//     <>
//       <DashboardHeader title='Schedule' handleClick={props.handleClick} />
//       {/* tabs */}
//       <ul className='flex bg-newlightergrey rounded w-11/12 mx-auto p-1'>
//         <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
//         <li className='flex-1 mr-2'>{/* TODO: implement me */}</li>
//       </ul>
//       {/* events */}
//     </>
//   );
// }

// function DashboardHeader(props) {
//   return (
//     <div className='p-4 flex'>
//       <button className='inline-block' onClick={props.handleClick}>
//         {/* <FontAwesomeIcon icon={faBars} /> */}
//       </button>
//       <h4 className='flex-1 text-center'>{props.title}</h4>
//     </div>
//   );
// }

// function DashboardSidebar(props) {
//   return (
//     <section
//       className={`relative h-screen w-64 ${
//         props.isOpen ? 'ml-0' : '-ml-64'
//       } bg-newlightergrey flex flex-col justify-between duration-500 transition-marginLeft`}
//     >
//       <ul className='p-4'>
//         <li className='sidebar-link'>
//           {/* <FontAwesomeIcon icon={faCalendarAlt} /> */}
//           &nbsp;
//           <Link to={`${props.url}/schedule`}>Schedule</Link>
//         </li>
//         <li className='sidebar-link'>
//           {/* <FontAwesomeIcon icon={faCommentDots} /> */}
//           &nbsp;
//           <Link to={`${props.url}/messages`}>Direct Messages</Link>
//         </li>
//       </ul>
//       <div className='bg-primary text-newwhite flex py-2 px-3'>
//         <img
//           className='rounded-full mr-3'
//           src='https://via.placeholder.com/50.png/FFFFFF'
//           alt='Worker Profile'
//         />
//         <div className='flex-1'>
//           <h6>Last, First</h6>
//           <small className='text-newlightgrey'>Team Member</small>
//         </div>
//         <small className='inline-block'>
//           <Link to='/logout'>Logout</Link>
//         </small>
//       </div>
//     </section>
//   );
// }

// function DashboardMenuItem(props) {
//   let { menuItem } = useParams();

//   switch (menuItem) {
//     case 'schedule':
//       return <Schedule handleClick={props.handleClick} />;
//     case 'messages':
//       return <DirectMessages handleClick={props.handleClick} />;
//   }
// }

function Dashboard() {
  // path - allows us to build <Route> paths relative to parent path
  // url - allows us to build relative links
  let { path, url } = useRouteMatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    isOpen ? setIsOpen(false) : setIsOpen(true);
  };

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

DirectMessages.propTypes = {
  handleClick: PropTypes.func.isRequired
};

Schedule.propTypes = {
  handleClick: PropTypes.func.isRequired
};

DashboardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

DashboardSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired
};

DashboardMenuItem.propTypes = {
  handleClick: PropTypes.func.isRequired
};
