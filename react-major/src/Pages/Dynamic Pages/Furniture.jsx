// 
import React, { useEffect, useState } from 'react'
import s from './Main.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiSpeedUpFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import {  FaCar,  FaMapPin , FaCalendarAlt, FaRupeeSign, FaMobile, FaWarehouse} from 'react-icons/fa';
import user from '../../assets/user.png'
import sofa from '../../assets/Furniture/sofa.png'
import UserDetails from '../../Components/UserDetails';
import FurnitureUpdateModal from '../../UpdateForms/Furniture';
import { toast } from 'react-toastify';

const Furniture = () => {
	const ID = useParams()
  const user = useSelector((state) => state.Auth.user);
    const [userData,setUserData] = useState(null)
	const [newData, setnewData] = useState(null)
	const Furniture = useSelector((state) => state.Furniture.Furnitures)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFurnitures, setSelectedFurnitures] = useState(null);
    const openModal = (newData) => {
      setSelectedFurnitures(newData);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedFurnitures(null);
    };
    const handleUpdate = async (updatedData) => {
      // onUpdateCar(selectedCar._id, updatedData);
      try {
        const res = await fetch(`http://localhost:7000/api/furniture/update/${ID.id}`, {
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
          // Optionally call getAllFurnitures() here to refresh UI
          // getAllFurnitures(); // <- refetch updated list
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
            `http://localhost:7000/api/furniture/get/${ID.id}`,
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

  if (!newData) return <div>Loading...</div>;
	return (
    <>
       {isModalOpen && selectedFurnitures && (
        <FurnitureUpdateModal
          data={selectedFurnitures}
          onClose={closeModal}
          onSubmit={handleUpdate}
        />
      )}
           <div className={s.wrapper} key={newData._id}>
  <div className={s.cardContainer}>
    {/* Car Image Section */}
    <div className={s.imageBox}>
      <img src={newData.imgUrl} className={s.carImage} />
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
         ({newData.modelYear})
        {newData.soldOut && <div className={s.soldBadge}>Sold Out!</div>}
      </h2>
      <h1 className={s.title}>{newData.title}</h1>
      <h3 className={s.price}>₹ {newData.sellingPrice?.toLocaleString()}</h3>

      {/* Car Highlights */}
      <div className={s.tags}>
        {/* <span><FaWarehouse /> {newData.brandName}</span> */}
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

export default Furniture