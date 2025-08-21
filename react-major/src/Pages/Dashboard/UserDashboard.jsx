
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  FaArrowAltCircleRight, 
  FaArrowRight,
  FaHome, 
  FaHeart, 
  FaListAlt, 
  FaChartLine, 
  FaCog,
  FaUser,
  FaBars,
  FaTimes
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import userpic from '../../assets/user.png';
import Card from '../../Components/Card';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import s from './UserDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleAds, handleCredentials, handleEmail, handleLoading, handleWishlist } from '../../Features/Auth/AuthSlice';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';
import { MdVerified } from 'react-icons/md';
import { IoExitOutline } from 'react-icons/io5';

// Register necessary components from Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const isLoading = useSelector((state) => state.Auth.isLoading);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const token = useSelector((state) => state.Auth.token);
  const adsPosted = useSelector((state) => state.Auth.adsPosted);
  const wishlist = useSelector((state) => state.Auth.wishlist);
  const user = useSelector((state) => state.Auth.user);
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHome />, path: '/userdashboard' },
    { id: 'wishlist', label: 'Wishlist', icon: <FaHeart />, path: '/userdashboard/wishlist' },
    { id: 'ads', label: 'Ads Posted', icon: <FaListAlt />, path: '/userdashboard/ads' },
    { id: 'exit', label: 'Exit', icon: <IoExitOutline  />, path: '/' },
  ];

  // const data = {
  //   labels: ['January', 'February', 'March', 'April'],
  //   datasets: [
  //     {
  //       label: 'Ads Posted',
  //       data: [12, 19, 3, 5],
  //       borderColor: 'rgb(75, 192, 192)',
  //       fill: false,
  //       tension: 0.1,
  //       pointRadius: 5,
  //     },
  //   ],
  // };
  const data = {
        labels: ['January', 'February', 'March', 'April'],
        datasets: [
          {
            label: 'Ads Posted',
            data: [12, 19, 3, 5],  // Example data points
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
            tension: 0.1,  // Slight curve to the line
            pointRadius: 5,  // Larger points for visibility
          },
        ],
      };
      const FetchDetails = async () => {
        try { 
            dispatch(handleLoading(true))
          const res = await fetch("http://localhost:7000/api/auth/get", {
            method: "GET",
            credentials: 'include'
          });
          const data = await res.json();
        
          if (res.ok) {

            dispatch(handleAds(data.msg))
            dispatch(handleEmail(data.user.email))
            dispatch(handleCredentials(data.user))
            
          } else {
            console.error("Fetch failed", data.message);
          }
        } catch (error) {
          console.error("error", error);
        } finally {
          dispatch(handleLoading(false))
        }
      };

  const FetchWishlist = async () => {
    try { 
      dispatch(handleLoading(true))
      const res = await fetch("http://localhost:7000/api/auth/wishlist/get", {
        method: "GET",
        credentials:'include'
      });
      const data = await res.json();
    
      if (res.ok) {
        dispatch(handleWishlist(data.msg));
        
      } else {
        console.error("Fetch failed", data.message);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      dispatch(handleLoading(false))
    }
  };
  const verifyUser = async (e) => {
    e.preventDefault(); // Prevent page reload
    try {
      const res = await fetch("http://localhost:7000/api/auth/verify", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({user}) // ✅ send directly, not wrapped in {LoginFields}
      });
  
      const data = await res.json();
      
      if (res.ok) {
         toast.success('Otp sent at your email!');
            navigate('/otp-verify')
       
      } else {
        toast.error(data.msg || 'Login failed!');
        console.error("Login failed", data.msg);
      }
    } catch (error) {
      toast.error("Network error");
      console.error("Network error", error);
    }
  };
  const handleUpdate = async (updatedData) => {
    try {
      dispatch(handleLoading(true))
      const res = await fetch(`http://localhost:7000/api/auth/update`, {
        method: 'PUT',
        credentials:'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        console.log("Updated successfully:", data);
      } else {
        console.error("Update failed:", data.message);
      }
    } catch (error) {
      console.error("Error updating:", error.message);
    }
    finally{
      dispatch(handleLoading(false))
    }
  };

  const [isModalOpen, setModalOpen] = useState(false);
  const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	// const user  = useSelector((state) => state.Auth.user)
	// console.log(user);
  useEffect(() => {
    FetchDetails();
        FetchWishlist();
  },[])
	useEffect(() => {
		console.log(isLoggedin);
			if (isLoggedin == 'false'){
        toast.error("login first please!")
				navigate('/')
			}
	},[])

  if (isLoading || !user) return <Loader />;

  return (
    <div className={s.dashboardContainer}>
      {/* Mobile menu button */}
      <button 
        className={s.mobileMenuButton} 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`${s.sidebar} ${mobileMenuOpen ? s.open : ''}`}>
        <div className={s.userCard}>
          <div className={s.userIcon}>
            <img src={userpic} alt="user" />
          </div>
          <div className={s.userDetails}>
            <h2 className={s.name}>{user.username} {user.isVerified? <MdVerified fill='cyan' size={22}/> : ''}</h2>
            <p>{user.email}</p>
            {
              !user.isVerified ? <button className={s.btn} onClick={verifyUser}>Verify now!</button> : ""
            }
          </div>
        </div>

        <nav className={s.nav}>
          {navItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`${s.navItem} ${location.pathname === item.path ? s.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className={s.navIcon}>{item.icon}</span>
              <span className={s.navLabel}>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={s.mainContent}>
        {/* Dashboard Content */}
        {location.pathname === '/userdashboard' && (
          <>
            <div className={s.welcomeSection}>
              <h1>Welcome back, {user.username}!</h1>
              <p>Here's your dashboard overview</p>
            </div>

            <div className={s.statsCards}>
              <div className={s.statCard}>
                <div className={s.statIcon}>
                  <FaListAlt size={24} />
                </div>
                <div className={s.statContent}>
                  <h3>Ads Posted</h3>
                  <p className={s.statValue}>{adsPosted.length}</p>
                </div>
              </div>
              
              <div className={s.statCard}>
                <div className={s.statIcon}>
                  <FaHeart size={24} />
                </div>
                <div className={s.statContent}>
                  <h3>Wishlist Items</h3>
                  <p className={s.statValue}>{wishlist.length}</p>
                </div>
              </div>
            </div>

            <div className={s.wishlistAdsSection}>
              <div className={s.section}>
                <div className={s.sectionHeader}>
                  <h3>Your Wishlist</h3>
                  <Link to="/dashboard/wishlist" className={s.viewAll}>
                    View All <FaArrowRight />
                  </Link>
                </div>
                <div className={s.cardGrid}>
                  {wishlist.slice(0, 2).map((ele,idx) => (
                    <Card
                      key={idx}
                      id={ele.product._id} 
                      Img={ele.product.imgUrl}
                      Category={ele.product.category}
                      Title={ele.product.title} 
                      Price={ele.product.sellingPrice} 
                      city={ele.product.location} 
                      createdAt={ele.product.createdAt}
                      createdBy={ele.product.createdBy._id}
                      Wishlist={wishlist}
                    />
                  ))}
                </div>
              </div>

              <div className={s.section}>
                <div className={s.sectionHeader}>
                  <h3>Your Ads</h3>
                  <Link to="/userdashboard/ads" className={s.viewAll}>
                    View All <FaArrowRight />
                  </Link>
                </div>
                <div className={s.cardGrid}>
                  {adsPosted.slice(0, 2).map((ele, index) => (
                    <Card
                      key={index}
                      id={ele.product._id} 
                      Img={ele.product.imgUrl}
                      Category={ele.product.category}
                      Title={ele.product.title} 
                      Price={ele.product.sellingPrice} 
                      city={ele.product.location} 
                      createdAt={ele.product.createdAt}
                      createdBy={ele.product.createdBy._id}
                      Wishlist={wishlist}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className={s.chartContainer}>
        <h4>Ads Posted Trend</h4>
         <div className={s.chartWrapper}>
           <Line data={data} />
         </div>
       </div>
          </>
        )}

        {/* Nested routes content */}
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
