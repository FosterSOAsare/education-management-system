import React, { useState } from 'react';
import 'boxicons/css/boxicons.min.css';


function Sidebar({ isSidebarClosed, toggleSidebar, toggleSubMenu }) {

  return (
    <div className={`sidebar ${isSidebarClosed ? 'close' : ''}`}>
      <div className="logo-details">
        <i className='bx bx-user'></i>
        <span className="logo_name">EMS</span>
      </div>
      <ul className="nav-links">
        <li>
          <a href="#">
            <i className='bx bx-home'></i>
            <span className="link_name">Dashboard</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Dashboard</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className='bx bxs-book' ></i>
            <span className="link_name">Courses</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Courses</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-bar-chart'></i>
            <span className="link_name">Assignment</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Assignment</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-compass'></i>
            <span className="link_name">To-do</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">To-do</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className='bx bx-support'></i>
            <span className="link_name">Help & Support</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Help & Support</a></li>
          </ul>
        </li>
        <li>
          <div className="profile-details">
            <div className="profile-content">
              <img src="https://github.com/Sacsam005/dropdown-menu/blob/master/image/profile.png?raw=true" alt="profileImg" />
            </div>
            <div className="name-job">
              <div className="profile_name">Ibn-Sa'eed</div>
            </div>
            <i className='bx bx-log-out'></i>
          </div>
        </li>
      </ul>
    </div>
  );
}

function Dashboard() {
  const [isSidebarClosed, setIsSidebarClosed] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarClosed(prevState => !prevState);
  };

  const toggleSubMenu = (e) => {
    const arrowParent = e.target.parentElement.parentElement;
    arrowParent.classList.toggle("showMenu");
  };

  return (
    <div>
      <Sidebar
        isSidebarClosed={isSidebarClosed}
        toggleSidebar={toggleSidebar}
        toggleSubMenu={toggleSubMenu}
      />
      <section className="home-section">
        <div className="home-content">
          <i className='bx bx-menu' onClick={toggleSidebar}></i>
          <span className="text">Education Management System</span>
        </div>
      </section>
    </div>
  );
}


export default Dashboard;