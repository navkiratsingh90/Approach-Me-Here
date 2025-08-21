
import React, { useEffect, useState } from 'react';
import s from './UserDetails.module.css';
import user from '../assets/user.png';
import { MdVerified } from "react-icons/md";
import AdLocationMap from './AdLoacationMap';

const UserDetails = ({ Phone, Username, Email, isVerified, productId,Latitude, Longitude }) => {
  const [showForm, setShowForm] = useState(false);
  // const [currLatitude,setCurrLatitude] = useState(null)
  // const [currLongitude,setCurrLongitude] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:7000/api/auth/send-interest-email", {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          sellerEmail: Email,
          buyerName: formData.name,
          buyerLocation: formData.location,
          message: formData.message
        })
      });

      const data = await res.json();
      alert(data.success ? "Interest sent to seller!" : "Failed to send interest");
      setShowForm(false);
      setFormData({ name: "", location: "", message: "" });
    } catch (error) {
      console.error(error);
    }
  };
  // navigator.geolocation.getCurrentPosition(
  //   (pos) => {
  //     const latitude = pos.coords.latitude;
  //     const longitude = pos.coords.longitude;
  //     console.log(latitude, longitude);
  //     setCurrLatitude(latitude)
  //     setCurrLongitude(longitude)
  //     // Send to backend with ad details
  //   },
  //   (err) => console.error(err),
  //   { enableHighAccuracy: true }
  // );
  return (
    <div className={s.contact}>
      <span className={s.head}>User Details:</span>
      <div className={s['contact-card']}>
        <div className={s.avatarContainer}>
          <img src={user} alt="Profile" className={s.avatar} />
        </div>
        <div className={s.info}>
          <h2 className={s.name}>
            {Username} {isVerified ? <MdVerified size={22} fill='cyan' /> : ""}
          </h2>
         {isVerified ?  <p>Verified Seller</p> : ""}

          <button
            onClick={() => setShowForm(!showForm)}
            style={{ marginTop: "10px", background: "#3498db", color: "white", padding: "8px 16px", border: "none", borderRadius: "6px", cursor: "pointer", width: "100px" }}
          >
           {!showForm ? "Interested" : "Hide"}
          </button>

          {showForm && (
            <form onSubmit={handleSubmit} style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <input
                type="text"
                name="name"
                className={s.inputField}
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="location"
                className={s.inputField}
                placeholder="Your Location"
                value={formData.location}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                className={s.textarea}
                placeholder="Write your message to the seller..."
                value={formData.message}
                onChange={handleChange}
                required
              />
              <button type="submit" style={{ background: "rgb(17 72 49)", color: "white", padding: "8px", border: "none", borderRadius: "6px" }}>
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
      <AdLocationMap lat={Latitude} lng={Longitude} radius={1000} />

    </div>
  );
};

export default UserDetails;

