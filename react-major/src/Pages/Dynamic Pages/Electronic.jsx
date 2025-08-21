import React, { useEffect, useState } from 'react'
import s from './Main.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiSpeedUpFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import {  FaCar,  FaMapPin , FaCalendarAlt, FaRupeeSign, FaMobile, FaWarehouse} from 'react-icons/fa';
import user from '../../assets/user.png'
import microwave from '../../assets/Electronics/microwave.png'
import UserDetails from '../../Components/UserDetails';
// import ElectronicUpdateForm from '../../../UpdateForms/Electronic';
import Loader from '../../Components/Loader';
import ElectronicUpdateModal from '../../UpdateForms/Electronic';
import { toast } from 'react-toastify';

const Electronic = () => {
	const ID = useParams()
    // const token = useSelector((state) => state.Auth.token)
    const user = useSelector((state) => state.Auth.user);
    const [userData,setUserData] = useState(null)
	const [newData, setnewData] = useState(null)
	const Electronics = useSelector((state) => state.Electronic.Electronics)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedElectronics, setSelectedElectronics] = useState(null);
    const openModal = (newData) => {
      setSelectedElectronics(newData);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedElectronics(null);
    };
    const handleUpdate = async (updatedData) => {
      // onUpdateCar(selectedCar._id, updatedData);
      try {
        const res = await fetch(`http://localhost:7000/api/electronic/update/${ID.id}`, {
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
          toast.success("Data updated successfully!")
          // Optionally call getAllElectronics() here to refresh UI
          // getAllElectronics(); // <- refetch updated list
          handleFetch()
        } else {
          console.error("Update failed:", data.message);
          toast.error("data not updated!")
        }
      } catch (error) {
        console.error("Error updating:", error.message);
      }
      closeModal();
    };
  const handleFetch = async () => {
    try {
        const res = await fetch(
            `http://localhost:7000/api/electronic/get/${ID.id}`,
            {
                method: "GET",
                credentials:'include'
            }
        );
        const data = await res.json();

        if (res.ok) {
            console.log("fetch successful");
             console.log(data);
            setnewData(data.msg);
            setUserData(data.userData)
        } else {
            toast.error(data.message || "Login failed!");
            console.error("Login failed", data.message);
        }
    } catch (error) {
        console.error("error ", error);
    }
};

const isLoggedin  = useSelector((state) => state.Auth.isLoggedin)
	// const user  = useSelector((state) => state.Auth.user)
	const navigate = useNavigate()
    useEffect(() => {
      console.log(typeof(isLoggedin));
        if (isLoggedin === 'false'){
                  toast.error("Login first please")
          navigate('/')
        }
        else{
          handleFetch();
        }
    },[])



  if (!newData) return <Loader/>;
  console.log(newData);
	return (
    <>
        {isModalOpen && selectedElectronics && (
        <ElectronicUpdateModal
          data={selectedElectronics}
          onClose={closeModal}
          onSubmit={handleUpdate}
        />
      )}
        
           <div className={s.wrapper} key={newData._id}>
  <div className={s.cardContainer}>
    {/* Car Image Section */}
    <div className={s.imageBox}>
      <img src={newData.imgUrl} alt={`${newData.brand} ${newData.modelName}`} className={s.carImage} />
    </div>

    {/* Car Info Section */}
    <div className={s.infoBox}>
      {/* Floating Action Buttons */}
      {
          user._id == userData._id ? <div className={s.actionButtons}>
          <button onClick={() => openModal(newData)}
          className={s.updateBtn}>
         Update
       </button>
       <button onClick={() => HandleDelete(newData._id)} className={s.deleteBtn}>
         Delete
       </button>
       </div>
        : ""
      }

      <h2 className={s.carName}>
        {newData.brand} {newData.prodCatgory} ({newData.modelYear})
        {newData.soldOut && <div className={s.soldBadge}>Sold Out!</div>}
      </h2>
      <h1 className={s.title}>{newData.title}</h1>
      <h3 className={s.price}>₹ {newData.sellingPrice?.toLocaleString()}</h3>

      {/* Car Highlights */}
      <div className={s.tags}>
        <span><FaWarehouse /> {newData.brand}</span>
        {/* <span><RiSpeedUpFill /> {newData.kilometersDriven} km</span> */}
        <span><FaCalendarAlt /> {newData.modelYear}</span>
        <span><FaMapPin /> {newData.location}</span>
        <span><IoIosSettings /> {newData.condition}</span>
      </div>

      {/* Description */}
      <div className={s.section}>
        <h4>Description</h4>
        <p>{newData.description}</p>
      </div>

      {/* Overview */}
      <div className={s.section}>
        <h4>Overview</h4>
        <div className={s.overview}>
          <div>
            <FaCalendarAlt className={s.icon} />
            <p className={s.label}>Posted On</p>
            <p>{newData.createdAt.slice(0, 10)}</p>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <UserDetails
        Phone={newData.phoneNumber}
        Email={newData.createdBy.email}
        Username={newData.createdBy.username}
        isVerified={newData.createdBy.isVerified}
      />
    </div>
  </div>
</div>

        </>
    );
}

export default Electronic