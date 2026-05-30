import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/css/Header.module.css";
import logoImg from "../../assets/images/home/logo.png";
import { FaUser, FaLock, FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/category/categoryThunks";
import { verifyToken } from "../../redux/auth/authThunks";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <header className={styles.header}>
      <div className={styles.top}>
        <div className={styles.topContent}>
          <nav className={styles.topNav}>
            {token ? (
              <>
                <Link to="/dashboard" className={styles.profileLink}>
                  <FaUserCircle /> حساب کاربری
                </Link>
                <Link to="/cart/">
                  <FaShoppingCart /> سبد خرید
                </Link>
                <Link to="/logout/">
                  <FaLock /> خروج
                </Link>
              </>
            ) : (
              <Link to="/login/">
                <FaUser /> ورود
              </Link>
            )}
          </nav>

          <Link to="/" className={styles.logoWrapper}>
            <img src={logoImg} className={styles.logo} alt="Logo" />
          </Link>
        </div>
      </div>

      <nav className={styles.navbar}>
        <div className={styles.navInner}>
          <div className={styles.navLinks}>
            <Link to="/">خانه</Link>
            <Link to="/products/">محصولات</Link>

            <div className={styles.dropdown}>
              <button className={styles.dropdownBtn}>دسته‌بندی‌ها</button>

              <div className={styles.dropdownMenu}>
                {categories.map((cat) => (
                  <div key={cat.id} className={styles.dropdownItem}>
                    <Link to={`/category/${cat.slug}`} className={styles.parentItem}>
                      {cat.name}
                    </Link>

                    {cat.children.length > 0 && (
                      <div className={styles.submenu}>
                        {cat.children.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`/category/${sub.slug}`}
                            className={styles.subItem}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Link to="/about-us">درباره ما</Link>
            <Link to="/contact-us">تماس با ما</Link>
          </div>

          <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="جستجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit"><FaSearch /></button>
          </form>
        </div>
      </nav>

      <div className={styles.bottomLine}></div>
    </header>
  );
};

export default Header;