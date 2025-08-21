import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { CgMenuLeftAlt } from "react-icons/cg";
import styles from "./Navbar.module.css";
import Button from "./Button";
import { Link } from "react-router-dom";
import { HandleMenubar } from "../Features/NavbarSlice";
import { handleCredentials, HandleLogoutInfo } from "../Features/Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import user from '../assets/user.png'
import { handleisAdmin } from "../Features/AdminSlice";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "./Loader";

const Navbar = () => {
    const navigate = useNavigate()
    const [isLoading, setisLoading] = useState(true);
    const user = useSelector((state) => state.Auth.user)
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const isAdmin = useSelector((state) => state.Admin.isAdmin)
    const isLoggedin = useSelector((state) => state.Auth.isLoggedin)
    const dispatch = useDispatch();
    const MenuBar = useSelector((state) => state.Navbar.MenuBar);
    const HandleLogout = async () => {
        try {
          const res = await fetch("http://localhost:7000/api/auth/logout", {
            method: 'POST',
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            }
          })
            const data = await res.json()
            if (res.ok){
              toast.success("logout successfully!")
              dispatch(HandleLogoutInfo())
              // FetchData()
            }
            else{
              toast.error("an error occured")
            }
        } catch (error) {
            console.error("error", error);
        }
        navigate('/')
    }
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };
    const FetchData = async () => {
         // Prevent page reload
        try {
            setisLoading(true)
          const res = await fetch("http://localhost:7000/api/auth/status", {
            credentials: 'include',
            method: "GET",
          });
      
          const data = await res.json();
          
          if (res.ok) {
            console.log(data);
             dispatch(handleisAdmin(data.isAdmin))
             dispatch(handleCredentials(data.user))
          } else {
            // toast.error(data.msg || 'fetch failed!');
            console.error("fetch failed", data.msg);
          }
        } catch (error) {
          toast.error("Network error");
          console.error("Network error", error);
        }finally{
          setisLoading(false)
        }
      };
      const getAvatarInitials = (username) => {
        if (!username) return 'US';
        
        const nameParts = username.split(' ');
        if (nameParts.length >= 2) {
          return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
        } else if (username.length >= 2) {
          return username.substring(0, 2).toUpperCase();
        }
        return username[0].toUpperCase() + 'X';
      };
      const toggleUserDropdown = () => {
        setUserDropdownOpen(!userDropdownOpen);
      };
      useEffect(() => {
        // console.log(typeof(isLoggedin));
      if (isLoggedin == 'true'){
        FetchData()
      }
      },[])
    // if (!user) return <Loader/>
    console.log(isLoggedin, user);
    return (
        <>
             {/* <ToastContainer /> */}
      <div className={styles.wrapper}>
        <div className={styles.box}>
          <div className={styles.brand}>
            <span className={styles.logo}>M</span>
            <span className={styles.brandName}>MNQ</span>
          </div>
          
          <button className={styles.hamMenu} onClick={toggleMenu}>
            <CgMenuLeftAlt />
          </button>
          
          <div className={`${styles.menu} ${menuOpen ? styles.show : styles.hide}`}>
            <ul className={styles.navList}>
              <li className={styles.listItem}>
                <Link href="/" className={styles.link}>Home</Link>
              </li>
              <li className={styles.listItem}>
                <Link to={'/about'} className={styles.link}>About</Link>
              </li>
              <li className={styles.listItem}>
                <Link to={'/contact'} className={styles.link}>Contact</Link>
              </li>
              
              {user && isLoggedin && (
                <>
                  <li className={styles.listItem}>
                    <Link to={'/buy'} className={styles.link}>Buy</Link>
                  </li>
                  <li className={styles.listItem}>
                    <Link to={'sell'} className={styles.link}>Sell</Link>
                  </li>
                </>
              )}
            </ul>
            
            <div className={styles.authSection}>
              {isLoggedin && user ? (
                <div className={styles.userMenu}>
                  <div 
                    className={styles.userAvatar} 
                    onClick={toggleUserDropdown}
                  >
                    <div className={styles.avatar}>
                        {getAvatarInitials(user.username)}
                      </div>
                  </div>
                  
                  {userDropdownOpen && (
                    <div className={styles.dropdown}>
                      {isAdmin ? (
                        <div className={styles.dashboards}>
                        <Link to="/admin" className={styles.dropdownLink}>Admin Dashboard</Link>
                        <Link to="/userdashboard" className={styles.dropdownLink}>User Dashboard</Link>
                        </div>
                      ) : (
                        <Link to="/userdashboard" className={styles.dropdownLink}>Dashboard</Link>
                      )}
                      <button 
                        className={styles.dropdownLink}
                        onClick={HandleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.authButtons}>
                    <Link to={'/login'} >
                  <button 
                    className={styles.loginButton}
                    
                  >
                    Log in
                  </button>
                  </Link>
                  <Link to={'/register'}>
                  <button 
                    className={styles.signupButton}
                    
                  >
                    Sign up
                  </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
        </>
    );
};

export default Navbar;
