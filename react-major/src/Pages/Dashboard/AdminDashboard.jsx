
import React, { useEffect, useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Product from './sections/Product';
import Category from './sections/Category';
import Main from './sections/Main';
import User from './sections/User';
import s from './AdminDashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleisAdmin } from '../../Features/AdminSlice';
import Loader from '../../Components/Loader';
import { toast } from 'react-toastify';

function AdminDashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAdmin = useSelector((state) => state.Admin.isAdmin)
  const isLoggedin = useSelector((state) => state.Auth.isLoggedin)
  const [isLoading,setisLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(true);

  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Main darkMode={darkMode} />;
      case 'users':
        return <User darkMode={darkMode} />;
      case 'products':
        return <Product darkMode={darkMode} />;
      case 'categories':
        return <Category darkMode={darkMode} />;
        case 'exit':
          return navigate('/')
      default:
        return <Main darkMode={darkMode} />;
    }
  };
  const FetchDetails = async () => {
    try {
      setisLoading(true)
      const res = await fetch("http://localhost:7000/api/auth/status", {
        method: "GET",
        credentials:'include'
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log("Fetch successful", data);
        dispatch(handleisAdmin(data.msg));
       
        setisLoading(false)
      } else {
        console.error("Fetch failed", data.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } 
  };
  useEffect(() => {
    FetchDetails()
  },[])
  useEffect(() => {
    // Only redirect when both conditions are met
    console.log(isAdmin,isLoggedin, isLoading);
    if ((!isAdmin || isLoggedin === 'false') && !isLoading) {
      navigate('/', { replace: true });  // Use replace to prevent back navigation
    }
    
  }, [isAdmin, isLoading]);  // Add missing dependencies
  useEffect(() => {
		console.log(isLoggedin);
			if (!isAdmin){
        toast.error("login first please!")
				navigate('/')
			}
	},[])
  return (
    <div className={`${s.app} ${darkMode ? s.dark : ''}`}>
      <Sidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
      />
      <main className={s.mainContent}>
        {renderSection()}
      </main>
    </div>
  );
}

export default AdminDashboard;