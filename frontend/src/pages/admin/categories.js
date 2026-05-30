import React, { useState, useEffect } from "react";
import "../../assets/css/admin/products.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import PaginationComponent from "../../components/pagination/pagination";

const AdminCategories = () => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [bulkAction, setBulkAction] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  // Pagination states
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(-1)
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get("http://localhost/api/v1/admin/category-list?page=" + (params.get('page') == null ? 1 : params.get('page'))).then((response) => {
      if (response.status === 200) {
        setProducts(response.data.results)
        setCount(response.data.count)
      }
    }).catch((error) => console.log(error));
  }, [currentPage]);

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

  const currentItems = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handlePageChange = (page) => {
    navigate("/panel/products?page=" + page);
    setCurrentPage(page);
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
              <th>شناسه محصول</th>
              <th>نام دسته بندی</th>
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
                  <td>{product.id}</td>
                  <td>{product.name}</td>
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

      <PaginationComponent count={count} currentPage={params.get('page') == null ? 1 : params.get('page')} handlePageChange={handlePageChange} contentPerPage={5} />
    </section>
  );
};

export default AdminCategories;
