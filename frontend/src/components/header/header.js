import React, { useState, useEffect } from 'react';
import "../../assets/css/header.css"
import logoImg from "../../assets/images/home/logo.png"
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaUser, FaLock, FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../redux/category/categoryThunks';
import { verifyToken } from '../../redux/auth/authThunks';

const Header = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);
  return (
    <header>
      <div className="header-top bg-light py-2">
        <Container>
          <div className="d-flex justify-content-between align-items-center">
          <Nav>
              {token ? (
              <>
                <Nav.Item>
                  <Nav.Link href="/logout/"><FaLock /> خروج</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/cart/"><FaShoppingCart /> سبد خرید</Nav.Link>
                </Nav.Item>
              </>
            ) : (
              <Nav.Item>
                <Nav.Link href="/login/"><FaUser /> ورود</Nav.Link>
              </Nav.Item>
            )}
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

              <NavDropdown title="دسته‌بندی‌ها" id="category-dropdown" className="category-dropdown">
                {categories.map((category) => (
                  <div key={category.id} className="category-parent-dropdown">
                    <NavDropdown.Item href={`/category/${category.slug}`} className="parent-category-item">
                      {category.name}
                    </NavDropdown.Item>
                    {category.children.length > 0 && (
                      <div className="dropdown-subcategories">
                        {category.children.map((subCategory) => (
                          <NavDropdown.Item key={subCategory.id} href={`/category/${subCategory.slug}`} className="dropdown-sub-item">
                            {subCategory.name}
                          </NavDropdown.Item>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </NavDropdown>
              
              <Nav.Link href="/about-us">درباره ما</Nav.Link>
              <Nav.Link href="/contact-us">تماس با ما</Nav.Link>
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