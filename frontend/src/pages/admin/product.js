import React, { useState, useEffect } from "react";
import "../../assets/css/admin/products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const productData = [
      { id: 1, name: "محصول ۱", price: 100, status: "موجود", createdAt: "۱۴۰۳/۰۱/۰۱" },
      { id: 2, name: "محصول ۲", price: 200, status: "ناموجود", createdAt: "۱۴۰۳/۰۱/۰۲" },
      { id: 3, name: "محصول ۳", price: 300, status: "موجود", createdAt: "۱۴۰۳/۰۱/۰۳" },
      { id: 4, name: "محصول ۴", price: 400, status: "موجود", createdAt: "۱۴۰۳/۰۱/۰۴" },
      { id: 5, name: "محصول ۵", price: 500, status: "ناموجود", createdAt: "۱۴۰۳/۰۱/۰۵" },
      { id: 6, name: "محصول ۶", price: 600, status: "موجود", createdAt: "۱۴۰۳/۰۱/۰۶" },
      { id: 7, name: "محصول ۷", price: 700, status: "موجود", createdAt: "۱۴۰۳/۰۱/۰۷" },
      { id: 8, name: "محصول ۸", price: 800, status: "ناموجود", createdAt: "۱۴۰۳/۰۱/۰۸" },
      { id: 9, name: "محصول ۹", price: 900, status: "موجود", createdAt: "۱۴۰۳/۰۱/۰۹" },
      { id: 10, name: "محصول ۱۰", price: 1000, status: "موجود", createdAt: "۱۴۰۳/۰۱/۱۰" },
    ];
    setProducts(productData);
  }, []);

  const handleSelect = (id) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(id) ? prevSelected.filter((p) => p !== id) : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkAction = () => {
    if (bulkAction === "delete") {
      setProducts(products.filter((product) => !selectedProducts.includes(product.id)));
      setSelectedProducts([]);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push("...");
      }
    }
    return pageNumbers;
  };

  return (
    <section className="products-section">
      <div className="header">
        <div className="bulk-actions">
          <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)}>
            <option value="">انتخاب عملیات</option>
            <option value="delete">حذف انتخاب‌شده‌ها</option>
          </select>
          <button onClick={handleBulkAction} disabled={!bulkAction}>انجام</button>
        </div>
        <button className="add-product-btn">افزودن محصول</button>
      </div>

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
              </th>
              <th>نام محصول</th>
              <th>قیمت</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((product) => (
                <tr key={product.id}>
                  <td className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedProducts.includes(product.id)}
                      onChange={() => handleSelect(product.id)}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price} تومان</td>
                  <td>{product.status}</td>
                  <td>{product.createdAt}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">محصولی یافت نشد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          قبلی
        </button>
        {renderPageNumbers().map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? "active" : ""}
            disabled={page === "..." || page === currentPage}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          بعدی
        </button>
      </div>
    </section>
  );
};

export default Products;
