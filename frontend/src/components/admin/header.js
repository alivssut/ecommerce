import React from 'react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="header">
      {/* Left Section */}
      <div className="header-left">
        {/* Hamburger Button */}
        <button className="hamburger-btn" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="جستجو..." className='serach-input'/>
          <button>
            <i className="icon">🔍</i>
          </button>
        </div>
      </div>

      {/* Right Section (User Info) */}
      <div className="user-info">
        <div className="profile-dropdown">
          {/* Profile Picture */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/330px-Image_created_with_a_mobile_phone.png"
            alt="پروفایل"
            className="profile-pic"
          />

          {/* Dropdown Icon */}
          <i className="icon dropdown-icon">▼</i>

          {/* Dropdown Menu */}
          <div className="dropdown-menu">
            <a href="#">پروفایل</a>
            <a href="#">تنظیمات</a>
            <a href="#">خروج</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;