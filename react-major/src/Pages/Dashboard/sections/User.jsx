import React, { useEffect, useState } from 'react';
import s from './User.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleAllUsers } from '../../../Features/AdminSlice';

const User = ({ darkMode }) => {
  const token = useSelector((state) => state.Auth.token)
  const dispatch = useDispatch();
  const users = useSelector((state) => state.Admin.Users);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const FetchDetails = async () => {
    try {
      const res = await fetch("http://localhost:7000/api/admin/users/get", {
        method: "GET",
        // headers: {
        //   "Authorization" : `Bearer ${token}`
        // }
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log("Fetch successful", data);
        dispatch(handleAllUsers(data.msg));
      } else {
        console.error("Fetch failed", data.msg);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
	const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:7000/api/auth/users/delete/${id}`, {
        method: "DELETE",
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log("Fetch successful");
				FetchDetails()
      } else {
        console.error("Fetch failed", data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchDetails();
  }, []);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.username?.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  );

  // Function to generate avatar initials
  const getAvatarInitials = (username) => {
    if (!username) return 'US';
    
    const nameParts = username.split(' ');
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toLocaleUpperCase();
    } else if (username.length >= 2) {
      return username.substring(0, 2).toLocaleUpperCase();
    }
    return username[0].toLocaleUpperCase() + 'X';
  };

  return (
    <div className={s.userManagement}>
      <div className={s.header}>
        <h1>User Management</h1>
        <div className={s.controls}>
          <div className={s.searchContainer}>
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={darkMode ? s.darkInput : ''}
            />
            <button className={s.searchButton}>🔍</button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={s.loadingContainer}>
          <div className={s.loader}></div>
          <p>Loading users...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className={s.noResults}>
          <p>No users found matching your search</p>
        </div>
      ) : (
        <div className={`${s.tableContainer} ${darkMode ? s.dark : ''}`}>
          <table className={s.userTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Ads Posted</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user,_) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>
                    <div className={s.userInfo}>
                      <div className={s.avatar}>
                        {getAvatarInitials(user.username)}
                      </div>
                      <span>{user.username || 'No username'}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className={s.status}>
                      {user.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td>
                    <span className={`${s.status} ${s.active}`}>
                      {user.adsPosted.length}
                    </span>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(user._id)} className={`${s.actionButton} ${s.delete}`}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default User;