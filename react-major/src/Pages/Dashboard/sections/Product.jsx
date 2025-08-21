import React, { useEffect, useState } from 'react';
import s from './Product.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { handleAllProducts, handleDate, handlePrice } from '../../../Features/AdminSlice';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Loader from '../../../Components/Loader';
import { FaBold, FaChevronDown, FaChevronUp, FaRupeeSign } from 'react-icons/fa';

const Product = ({ darkMode }) => {
  // const token = useSelector((state) => state.Auth.token)
  const [isLoading,setisLoading] = useState(true)
  const [upperActive,setupperActive] = useState(false)
  const [lowerActive,setlowerActive] = useState(false)
  const dispatch  = useDispatch()
  const products = useSelector((state) => state.Admin.Products)
  const [filter, setFilter] = useState('all');

  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category.toLocaleLowerCase() === filter.toLocaleLowerCase());
    const handleSortHigh = () => {
      dispatch(handlePrice('High'))
      setupperActive(true)
      setlowerActive(false)
    };
    const handleSortLow = () => {
      dispatch(handlePrice('Low'))
      setupperActive(false)
      setlowerActive(true)
    };
    const handleDateHigh = () => {
      dispatch(handleDate('desc'))
    }
    const handleDateLow = () => {
      dispatch(handleDate('asc'))
    }
    const FetchDetails = async () => {
      try {
        setisLoading(true)
        const res = await fetch("http://localhost:7000/api/admin/ads/get", {
          method: "GET",
          credentials:'include'
        });
        
        const data = await res.json();
        if (res.ok) {
          console.log("Fetch successful");
          console.log(data.msg);
          dispatch(handleAllProducts(data.msg))
          setisLoading(false)
        } else {
          console.error("Fetch failed", data.msg);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } 
    };
    const handleDelete = async (category, id) => {
        try {
          const res = await fetch(`http://localhost:7000/api/${category}/delete/${id}`, {
            method: "DELETE",
            credentials:'include',
            headers: {
              "Content-Type": "application/json",
            }
          });
    
          const data = await res.json();
          if (res.ok) {
            toast.success(data.msg || "Deleted Successfully")
            FetchDetails()
          } else {
            toast.error(data.msg || "Delete failed!");
            console.error("Delete failed", data.message);
          }
        } catch (error) {
          console.error(`error ${error}`);
        }
      }
    
    useEffect(() => {
      FetchDetails();
    }, []);
    if (isLoading) return <Loader/>
  return (
      <>
          <ToastContainer />
          <div className={s.productManagement}>
              <div className={s.header}>
                  <h1>Product Management</h1>
                  <div className={s.controls}>
                      <div className={s.filterGroup}>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "all" ? s.active : ""
                              }`}
                              onClick={() => setFilter("all")}
                          >
                              All Products
                          </button>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "Car" ? s.active : ""
                              }`}
                              onClick={() => setFilter("Car")}
                          >
                              Car
                          </button>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "Bike" ? s.active : ""
                              }`}
                              onClick={() => setFilter("Bike")}
                          >
                              Bikes
                          </button>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "Electronics" ? s.active : ""
                              }`}
                              onClick={() => setFilter("Electronics")}
                          >
                              Electronics
                          </button>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "Mobile" ? s.active : ""
                              }`}
                              onClick={() => setFilter("Mobile")}
                          >
                              Mobiles
                          </button>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "Furniture" ? s.active : ""
                              }`}
                              onClick={() => setFilter("Furniture")}
                          >
                              Furniture
                          </button>
                          <button
                              className={`${s.filterButton} ${
                                  filter === "Other" ? s.active : ""
                              }`}
                              onClick={() => setFilter("Other")}
                          >
                              Other
                          </button>
                      </div>
                  </div>
              </div>

              <div className={`${s.tableContainer} ${darkMode ? s.dark : ""}`}>
                  <table className={s.productTable}>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>title</th>
                              <th>Description</th>
                              <th>
                                  <div className={s.textBtn}>
                                      <div className={s.text}>Date</div>
                                      <div className={s.btns}>
                                          <button onClick={handleDateHigh}>
                                              <FaChevronUp />
                                          </button>
                                          <button onClick={handleDateLow}>
                                              <FaChevronDown />
                                          </button>
                                      </div>
                                  </div>
                              </th>
                              <th>
                                  <div className={s.textBtn}>
                                      <div className={s.text}>Price</div>
                                      <div className={s.btns}>
                                          <button onClick={handleSortHigh}>
                                              {upperActive ? (
                                                  <FaChevronUp size={17} />
                                              ) : (
                                                  <FaChevronUp />
                                              )}
                                          </button>
                                          <button onClick={handleSortLow}>
                                              {lowerActive ? (
                                                  <FaChevronDown size={17} />
                                              ) : (
                                                  <FaChevronDown />
                                              )}
                                          </button>
                                      </div>
                                  </div>
                              </th>
                              <th>Category</th>
                              <th>Posted By</th>
                              <th>Actions</th>
                          </tr>
                      </thead>
                      <tbody>
                          {filteredProducts.length == 0 ? (
                              <p className={s.para}>no products listed yet!</p>
                          ) : (
                              filteredProducts.map((product) => (
                                  <tr key={product.id}>
                                      <td>
                                          {product._id.toString().slice(0, 10)}
                                          ..
                                      </td>
                                      <td className={s.productTitle}>
                                          {product.title}
                                      </td>
                                      <td className={s.productDesc}>
                                          {product.description.slice(0, 40)}...
                                      </td>
                                      <td>
                                          {product.createdAt
                                              .toString()
                                              .slice(0, 10)}
                                      </td>
                                      <td>{product.sellingPrice}</td>
                                      <td>{product.category}</td>
                                      <td>
                                          <span
                                              className={`${s.status} ${
                                                  s[product.createdBy]
                                              }`}
                                          >
                                              {product.createdBy._id.slice(
                                                  0,
                                                  10
                                              )}
                                              ..
                                          </span>
                                      </td>
                                      <td>
                                          <button
                                              onClick={() =>
                                                  handleDelete(
                                                      product.category,
                                                      product._id
                                                  )
                                              }
                                              className={s.actionButton}
                                          >
                                              Delete
                                          </button>
                                          <button className={s.actionButton}>
                                              <Link
                                                  to={`/buy/${product.category}/${product._id}`}
                                              >
                                                  View
                                              </Link>
                                          </button>
                                      </td>
                                  </tr>
                              ))
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      </>
  );
};

export default Product;