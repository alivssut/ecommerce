import React from 'react';
import '../../assets/css/admin/sidebar.css';
import '../../assets/css/admin/hamburger.css';
const Sidebar = ({ collapsed, open, toggleSidebar }) => {
  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''} ${open ? 'open' : ''}`}
      onClick={(e) => e.stopPropagation()} // Prevent clicks inside sidebar from closing it
    >
      <div className="logo">
        <span>لوگو</span>
      </div>
      <ul className="menu">
        <li>
          <a href="#">
            <i className="icon">🏠</i>
            <span>داشبورد</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="icon">📊</i>
            <span>آمار</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="icon">📦</i>
            <span>محصولات</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="icon">👥</i>
            <span>کاربران</span>
          </a>
        </li>
        <li>
          <a href="#">
            <i className="icon">⚙️</i>
            <span>تنظیمات</span>
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;