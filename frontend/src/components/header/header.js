import React from 'react';
import "../../assets/css/header.css"
import logoImg from "../../assets/images/home/logo.png"
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import { FaUser, FaLock, FaSearch } from 'react-icons/fa';


const Header = () => {
  return (
    <header>
      {/* هدر بالایی */}
      <div className="header-top bg-light py-2">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
          <Nav>
              <Nav.Item>
                <Nav.Link href="#"><FaUser /> ورود</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="#"><FaLock /> خروج</Nav.Link>
              </Nav.Item>
            </Nav>
            {/* لوگو */}
            <a href="#" className="mr-3">
              <img src={logoImg} alt="Logo" style={{ maxHeight: '50px' }} />
            </a>
            {/* ورود/خروج */}
            
          </div>
        </Container>
      </div>

       {/* نوار پایین */}
       <Navbar bg="light" expand="lg" className="rtl-navbar">
        <Container>
          {/* لینک‌های ناوبری در ردیف اول */}
          <div className="navbar-nav-wrapper">
            <Nav className="mr-auto">
              <Nav.Link href="#">خانه</Nav.Link>
              <Nav.Link href="#">محصولات</Nav.Link>
              <Nav.Link href="#">مقالات</Nav.Link>
              <Nav.Link href="About.html">درباره ما</Nav.Link>
              <Nav.Link href="contact-us.html">تماس با ما</Nav.Link>
            </Nav>
          </div>
          {/* نوار جستجو در ردیف دوم */}
          <div className="d-flex justify-content-end align-items-center mt-2">
            <Form inline className="d-flex align-items-center">
              <FormControl type="text" placeholder="جستجو" className="mr-sm-2" />
              <Button variant="outline-success">
                <FaSearch />
              </Button>
            </Form>
          </div>
        </Container>
      </Navbar>

      {/* خط نازک نارنجی زیر هدر */}
      <div className="header-bottom-yellow-line"></div>
    </header>
  );
};

export default Header;