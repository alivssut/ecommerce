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
            <a href="#" className="mr-3">
              <img src={logoImg} alt="Logo" style={{ maxHeight: '50px' }} />
            </a>
            
          </div>
        </Container>
      </div>

       <Navbar bg="light" expand="lg" className="rtl-navbar">
        <Container>
          <div className="navbar-nav-wrapper">
            <Nav className="mr-auto">
              <Nav.Link href="/">خانه</Nav.Link>
              <Nav.Link href="/products/">محصولات</Nav.Link>
              <Nav.Link href="#">مقالات</Nav.Link>
              <Nav.Link href="About.html">درباره ما</Nav.Link>
              <Nav.Link href="contact-us.html">تماس با ما</Nav.Link>
            </Nav>
          </div>
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

      <div className="header-bottom-yellow-line"></div>
    </header>
  );
};

export default Header;