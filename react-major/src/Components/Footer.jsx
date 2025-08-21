import React from "react";
import styles from "./Footer.module.css";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Footer = () => {
  const isAdmin = useSelector((state) => state.Admin.isAdmin)
  return (
      <footer className={styles.footer}>
          <div className={styles.container}>
              {/* Logo Section */}
              <div className={styles.logoSection}>
                  <span className={styles.logo}>M</span>
                  <span className={styles.brandName}>MNQ</span>
              </div>

              {/* Navigation Links */}
              <div className={styles.navSection}>
                  <h4 className={styles.heading}>/ NAVIGATION</h4>
                  <ul className={styles.navList}>
                      <li>
                          <Link className={styles.links} to={"/"}>Home</Link>
                      </li>
                      <li>
                          <Link className={styles.links} to={"/about"}>About Us</Link>
                      </li>
                      <li>
                          <Link className={styles.links} to={"/contact"}>Contact Us</Link>
                      </li>
                  </ul>
              </div>

              {/* Social Media Links */}
              <div className={styles.socialSection}>
                  <h4 className={styles.heading}>/ SOCIAL</h4>
                  <div className={styles.socialIcons}>
                      <FaInstagram className={styles.icon} />
                      <FaTwitter className={styles.icon} />
                      <FaFacebook className={styles.icon} />
                  </div>
              </div>
              <div className={styles.navSection}>
                  <h4 className={styles.heading}>/ NAVIGATION</h4>
                  <ul className={styles.navList}>
                      <li>
                          <Link className={styles.links} to={"/buy"}>Buy a Product</Link>
                      </li>
                      <li>
                          <Link className={styles.links} to={"/sell"}>Sell Your Product</Link>
                      </li>
                      <li>
                          {isAdmin ? (
                              <Link  to="/admin" className={styles.links}>
                                  Dashboard
                              </Link>
                          ) : (
                              <Link
                                  to="/userdashboard"
                                  className={styles.links}
                              >
                                  Dashboard
                              </Link>
                          )}
                      </li>
                  </ul>
              </div>

              {/* Contact Info */}
              <div className={styles.contactSection}>
                  <h4 className={styles.heading}>/ CONTACT</h4>
                  <p className={styles.contactEmail}>kiratsingh2181@gmail.com</p>
              </div>
          </div>
      </footer>
  );
};

export default Footer;
