import React, { useEffect, useState } from 'react';
import s from './Main.module.css';

const Main = ({ darkMode }) => {
  const [totalproducts,settotalproducts] = useState(0)
  const [totalusers,settotalusers] = useState(0)
  const [totalsoldOuts,settotalsoldOuts] = useState(0)
  const stats = [
    { title: 'Total Users', value: totalusers,  icon: '👥' },
    { title: 'Total Products', value: totalproducts, icon: '📦' },
    { title: 'Total sold Outs', value: totalsoldOuts,  icon: '💰' },
    // { title: 'New Orders', value: '128',  icon: '🛒' },
  ];
  const FetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/admin/info/get", {
        method: "GET",
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log("Fetch successful", data);
        // console.log(data);
        settotalusers(data.users)
        const totalProducts = Object.values(data.stats).reduce((sum, cat) => sum + cat.total, 0)
        const totalSold =  Object.values(data.stats).reduce((sum, cat) => sum + cat.sold, 0)
        settotalsoldOuts(totalSold)
        settotalproducts(totalProducts)
      } else {
        console.error("Fetch failed", data.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    FetchDetails()
  },[])
  return (
    <div className={s.dashboard}>
      <h1 className={s.title}>Dashboard Overview</h1>
      
      <div className={s.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`${s.statCard} ${darkMode ? s.dark : ''}`}>
            <div className={s.statIcon}>{stat.icon}</div>
            <div className={s.statContent}>
              <h3>{stat.title}</h3>
              <p className={s.statValue}>{stat.value}</p>
              <p className={s.statChange}>{stat.change}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={s.chartsContainer}>
        <div className={`${s.chartCard} ${darkMode ? s.dark : ''}`}>
          <h3>Monthly Revenue</h3>
          <div className={s.chartPlaceholder}>
            <div className={s.chartBar} style={{ height: '40%' }}></div>
            <div className={s.chartBar} style={{ height: '70%' }}></div>
            <div className={s.chartBar} style={{ height: '90%' }}></div>
            <div className={s.chartBar} style={{ height: '60%' }}></div>
            <div className={s.chartBar} style={{ height: '85%' }}></div>
            <div className={s.chartBar} style={{ height: '75%' }}></div>
            <div className={s.chartBar} style={{ height: '95%' }}></div>
          </div>
        </div>
        
        <div className={`${s.chartCard} ${darkMode ? s.dark : ''}`}>
          <h3>User Distribution</h3>
          <div className={s.pieChart}>
            <div className={s.pieSlice} style={{ '--percentage': 45, '--color': 'rgba(43, 226, 150, 0.7)' }}></div>
            <div className={s.pieSlice} style={{ '--percentage': 25, '--color': 'rgba(0, 168, 255, 0.7)' }}></div>
            <div className={s.pieSlice} style={{ '--percentage': 15, '--color': 'rgba(255, 99, 132, 0.7)' }}></div>
            <div className={s.pieSlice} style={{ '--percentage': 15, '--color': 'rgba(255, 206, 86, 0.7)' }}></div>
            <div className={s.pieCenter}></div>
          </div>
          <div className={s.legend}>
            <div><span className={s.legendColor} style={{ backgroundColor: 'rgba(43, 226, 150, 0.7)' }}></span>Active</div>
            <div><span className={s.legendColor} style={{ backgroundColor: 'rgba(0, 168, 255, 0.7)' }}></span>New</div>
            <div><span className={s.legendColor} style={{ backgroundColor: 'rgba(255, 99, 132, 0.7)' }}></span>Inactive</div>
            <div><span className={s.legendColor} style={{ backgroundColor: 'rgba(255, 206, 86, 0.7)' }}></span>Pending</div>
          </div>
        </div>
      </div>
      
      {/* <div className={`${s.activityCard} ${darkMode ? s.dark : ''}`}>
        <h3>Recent Activity</h3>
        <ul className={s.activityList}>
          <li>
            <div className={s.activityIcon}>📦</div>
            <div className={s.activityContent}>
              <p><strong>John Doe</strong> added a new product</p>
              <small>2 hours ago</small>
            </div>
          </li>
          <li>
            <div className={s.activityIcon}>💰</div>
            <div className={s.activityContent}>
              <p>New order <strong>#ORD-1284</strong> received</p>
              <small>4 hours ago</small>
            </div>
          </li>
          <li>
            <div className={s.activityIcon}>👤</div>
            <div className={s.activityContent}>
              <p><strong>Sarah Johnson</strong> updated profile information</p>
              <small>6 hours ago</small>
            </div>
          </li>
          <li>
            <div className={s.activityIcon}>📊</div>
            <div className={s.activityContent}>
              <p>Monthly sales report generated</p>
              <small>Yesterday</small>
            </div>
          </li>
        </ul>
      </div> */}
    </div>
  );
};

export default Main;