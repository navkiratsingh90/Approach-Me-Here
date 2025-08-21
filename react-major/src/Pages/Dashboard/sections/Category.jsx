import React, { useEffect, useState } from 'react';
import s from './Category.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleLoading } from '../../../Features/Auth/AuthSlice';
import Loader from '../../../Components/Loader';
import { organizeMonths } from '../../../Features/AdminSlice';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(ArcElement);

const Category = ({ darkMode }) => {
  const dispatch = useDispatch()
  const months = useSelector((state) => state.Admin.months)
  const isLoading = useSelector((state) => state.Auth.isLoading)
  const [soldOuts,setsoldOuts] = useState(null)
  const [time,setTime] = useState([])
  const [cars,setCars] = useState(null)
  const [bikes,setBikes] = useState(null)
  const [electronics,setElectronics] = useState(null)
  const [furnitures,setFurnitures] = useState(null)
  const [others,setOthers] = useState(null)
  const [mobiles,setMobiles] = useState(null)
  const categories = [
    { name: 'Mobiles', count: mobiles, icon: '📱', color: '#4CAF50' },
    { name: 'Furniture', count: furnitures, icon: '🪑', color: '#A1887F' },
    { name: 'Cars', count: cars, icon: '🚗', color: '#E91E63' },
    { name: 'Bikes', count: bikes, icon: '🏍️', color: '#FF9800' },
    { name: 'Electronics', count: electronics, icon: '💻', color: '#9C27B0' },
    { name: 'Others', count: others, icon: '📦', color: '#607D8B' },
    // { name: 'SoldOuts', count: soldOuts, icon: '📦', color: '#A1887F' }
  ]
  

  const salesData = [
    { month: 'Jan', sales: months[1] },
    { month: 'Feb', sales: months[2] },
    { month: 'Mar', sales: months[3] },
    { month: 'Apr', sales: months[4] },
    { month: 'May', sales: months[5] },
    { month: 'Jun', sales: months[6] },
    { month: 'Jul', sales: months[7] },
    { month: 'Aug', sales: months[8] },
    { month: 'Sep', sales: months[9] },
    { month: 'Oct', sales: months[10] },
    { month: 'Nov', sales: months[11] },
    { month: 'Dec', sales: months[12] },
  ];
  // const organizeMonths = () => {
  //   console.log(time);
  // }
  const chartData = {
    labels: salesData.map(item => item.month),
    datasets: [
      {
        label: 'Monthly Postings',
        data: salesData.map(item => item.sales/2),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        borderRadius: 5,
      }
    ]
  };

  const chartoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Postings Report',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `Total ADs : ${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Posting'
        },
        ticks: {
          callback: (value) =>  value
        }
      },
      x: {
        title: {
          display: true,
          text: 'Months'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };

  const FetchDetails = async () => {
    try {
      dispatch(handleLoading(true))
      const res = await fetch("http://localhost:7000/api/admin/ads/quantities/get", {
        method: "GET",
        credentials:'include'
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log("Fetch successful");
        console.log(data);
        // setsoldOuts(data.msg.length)
        setCars(data.cars.length)
        setMobiles(data.mobiles.length)
        setElectronics(data.electronics.length)
        setOthers(data.others.length)
        setBikes(data.bikes.length)
        setFurnitures(data.furnitures.length)
        setTime(data.msg.map(ele => ele.createdAt));
        dispatch(handleLoading(false))
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
  // Filter out categories with zero count
  const filteredCategories = categories.filter(cat => cat.count > 0);
  
  const data = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        data: categories.map(cat => cat.count),
        backgroundColor: categories.map(cat => cat.color),
        borderWidth: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };
  useEffect(() => {
    dispatch(organizeMonths({time}))
  },[time])
  if (isLoading) return <Loader/>
  console.log(salesData);
  return (
    <div className={s.categoriesManagement}>
      <h1>Categories Management</h1>
      
      <div className={s.statsGrid}>
        {categories.map((category, index) => (
          <div 
            key={index} 
            className={`${s.categoryCard} ${darkMode ? s.dark : ''}`}
            style={{ borderLeft: `4px solid ${category.color}` }}
          >
            <div className={s.categoryIcon} style={{ backgroundColor: `${category.color}20` }}>
              <span style={{ color: category.color }}>{category.icon}</span>
            </div>
            <div className={s.categoryInfo}>
              <h3>{category.name}</h3>
              <p className={s.categoryCount}>{category.count} ads</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={s.chartsRow}>
        <div className={`${s.chartCard} ${darkMode ? s.dark : ''}`}>
          <h3>Sales by Category</h3>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
     
      <Pie data={data} options={options} />
    </div>
          <div className={s.legend}>
            {/* {categories.map((category, i) => (
              <div key={i}>
                <span className={s.legendColor} style={{ backgroundColor: category.color }}></span>
                {category.name}
              </div>
            ))} */}
          </div>
        </div>
        
        <div className={`${s.chartCard} ${darkMode ? s.dark : ''}`}>
          <h3>Monthly Postings</h3>
          <div className={s.barChartContainer}>
          <Bar data={chartData} options={chartoptions} />
             {/*  {salesData.map((month, index) => (
              <div key={index} className={s.barChartItem}>
                <div className={s.barLabel}>{month.month}</div>
                <div className={s.barTrack}>
                  <div 
                    className={s.barFill} 
                    style={{ 
                      height: `${month.sales}%`,
                      background: `linear-gradient(to top, rgb(43, 226, 150), #2bd9a8)`
                    }} 
                  </div>
                </div>
                <div className={s.barValue}>{month.sales}</div>
              </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category