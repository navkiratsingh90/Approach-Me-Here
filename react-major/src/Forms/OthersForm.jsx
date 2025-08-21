import React, { useEffect, useState } from 'react';
import { indianCities } from '../Utils/IndianCities';
import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleLoading } from '../Features/Auth/AuthSlice';

const OthersForm = () => {
  const isLoading = useSelector(state => state.Auth.isLoading)
  const navigate = useNavigate()
  const dispatch=  useDispatch()
  const [currLatitude,setCurrLatitude] = useState(null)
  const [currLongitude,setCurrLongitude] = useState(null)
  const [form, setform] = useState({
    title: '',
    imgUrl: '',
    description: '',
    location: '',
    sellingPrice : '',
    condition: '',
    latitude: null,
    longitude: null,
    phoneNumber: '',
    modelYear: ''
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setform({
      ...form,
      [name]: type === 'file' ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData();
    formData.append('imgUrl', form.imgUrl);
    Object.entries(form).forEach(([key, value]) => {
      if (key !== 'imgUrl') { // Skip imgUrl to avoid duplication
        formData.append(key, value);
      }
    });
    
    console.log(formData);
  
    try {
      dispatch(handleLoading(true))
      const res = await fetch("http://localhost:7000/api/other/add" ,{
        method: "POST",
        credentials:'include',
        body: formData, 
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // toast.success(data.message || 'register successful!');
        console.log("register successful", data);
        toast.success("AD posted successfully")
        navigate('/buy/Others')
      } else {
        // toast.error(data.message || 'register failed!');
        console.error("register failed", data.msg);
      }
    } catch (error) {
      // toast.error("Network error");
      console.error("Network error", error);
    } finally {
      dispatch(handleLoading(false))
    }
  };
  const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	// console.log(user);
	useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;
        console.log(latitude, longitude);
        setCurrLatitude(latitude);
        setCurrLongitude(longitude);
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  
    if (isLoggedin == 'false') {
      toast.error("login first please!");
      navigate('/');
    }
  }, [isLoggedin]);
  
  // sync coords with form
  useEffect(() => {
    if (currLatitude && currLongitude) {
      setform((prev) => ({
        ...prev,
        latitude: currLatitude,
        longitude: currLongitude,
      }));
    }
  }, [currLatitude, currLongitude]);
  return (
    
    <div className={styles.main}>
    <div className={styles.formContainer}>
      <h2 className={styles.h2}>Others Details Form</h2>
      <form onSubmit={handleSubmit} className={styles.vehicleForm}>
        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <label className={styles.label}>Title:</label>
            <input 
              placeholder="Enter your Product Title..."
              type="text"
              className={styles.inputField}
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formColumn}>
              <label className={styles.label}>Image :</label>
              <input 
                placeholder="Enter your Image here..."
                type="file"
                className={styles.inputField}
                name="imgUrl"
                // value={form.imgUrl}
                onChange={handleChange}
                required
              />
            </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <label className={styles.label}>Description:</label>
            <textarea
              placeholder='Enter your other information'
              className={styles.textarea}
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className={styles.formRow}>
        <div className={styles.formColumn}>
            <label className={styles.label}>Selling Price:</label>
            <input 
              placeholder="Enter your Selling Price"
              className={styles.inputField}
              type="number"
              name="sellingPrice"
              value={form.sellingPrice}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formColumn}>
            <label className={styles.label}>Model Year:</label>
            <input 
              placeholder="Enter your Model Year"
              type="number"
              className={styles.inputField}
              name="modelYear"
              value={form.modelYear}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formRow}>
          <div className={styles.formColumn}>
            <label className={styles.label}>Location:</label>
            <select 
              name="location"
              className={styles.selectField}
              value={form.location}
              onChange={handleChange}
              required
            >
              <option value="">Select City</option>
              {indianCities.map((city, index) => (
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className={styles.formColumn}>
            <label className={styles.label}>Phone Number:</label>
            <input 
              placeholder="Enter your Phone Number"
              type="tel"
              className={styles.inputField}
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className={styles.formRow}>
        <div className={styles.formColumn}>
        <label className={styles.label}>Select Condition:</label>
          <select
        name="condition"
        className={styles.selectField}
        value={form.condition}
        onChange={handleChange}
        required
      >
        <option value="">-- Select Condition --</option>
        <option value="Brand New (Sealed)">Brand New (Sealed)</option>
        <option value="Like New">Like New</option>
        <option value="Gently Used">Gently Used</option>
        <option value="Used (Good Condition)">Used (Good Condition)</option>
        <option value="For Parts / Not Working">For Parts / Not Working</option>
      </select>
      </div>
          </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className={styles.load}>
              <div className={styles.loader}></div>
              <div className={styles.text}>Loading</div></div>
                // Your loader component
            ) : (
              "Submit"
            )}
          </button>
          </div>
      </form>
    </div>
  </div>
  );
};

export default OthersForm;