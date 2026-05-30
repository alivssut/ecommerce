import React, { useState, useEffect } from 'react';
import '../../assets/css/admin/general.css';
import '../../assets/css/admin/dashboard.css';
import '../../assets/css/admin/sidebar.css';
import '../../assets/css/admin/hamburger.css';
import '../../assets/css/admin/header.css';
import '../../assets/css/admin/main-section.css';

import Sidebar from '../../components/admin/sidebar';
import Header from '../../components/admin/header';
import Content from '../../components/admin/content';
// Rest of the component code...
import { Outlet } from 'react-router-dom'; // Import Outlet

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false); // For large screens
  const [open, setOpen] = useState(false); // For small screens

  const toggleSidebar = () => {
    if (window.innerWidth <= 768) {
      // On small screens, toggle open state
      setOpen(!open);
    } else {
      // On larger screens, toggle collapsed state
      setCollapsed(!collapsed);
    }
  };

  // Close sidebar on outside click (small mode)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        window.innerWidth <= 768 &&
        open &&
        !event.target.closest('.sidebar') && // Check if click is outside the sidebar
        !event.target.closest('.hamburger-btn') // Check if click is not on the hamburger button
      ) {
        setOpen(false); // Close the sidebar
      }
    };

    // Add event listener for outside clicks
    document.addEventListener('click', handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [open]); // Re-run effect when `open` changes

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} open={open} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <Content>
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Render Child Routes */}
        <section className="main-section">
          <Outlet /> {/* Placeholder for nested routes */}
        </section>
      </Content>
    </div>
  );
};

export default AdminLayout;