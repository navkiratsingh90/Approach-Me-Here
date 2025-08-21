import React, { useEffect, useState } from 'react'
import s from "./Main.module.css";
import car from '../../assets/cars/car4.jpg'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiSpeedUpFill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";

import { FaCar, FaMapPin, FaCalendarAlt } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import user from "../../assets/user.png";
import Loader from '../../Components/Loader'
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import UserDetails from "../../Components/UserDetails";
import { addCarItems } from "../../Features/Car/CarSlice";
import { handleLoading } from '../../Features/Auth/AuthSlice';
import CarUpdateModal from '../../UpdateForms/Car';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '../../Components/Card';

const Vehicle = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.Auth.isLoading);
    const user = useSelector((state) => state.Auth.user);
    const ID = useParams();
    const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
    const [newData, setnewData] = useState(null);
    const [userData,setUserData] = useState(null)
    const openModal = (newData) => {
      setSelectedCar(newData);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
      setSelectedCar(null);
    };
    const handleUpdate = async (updatedData) => {
      // onUpdateCar(selectedCar._id, updatedData);
      try {
        const res = await fetch(`http://localhost:7000/api/car/update/${ID.id}`, {
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
            dispatch(handleLoading(true))
            const res = await fetch(
                `http://localhost:7000/api/car/get/${ID.id}`,
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
        } finally{
          dispatch(handleLoading(false))
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
    if (!newData) return <Loader/>
    return (
        <>
        {isModalOpen && selectedCar && (
        <CarUpdateModal
          data={selectedCar}
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
        {newData.brand} {newData.modelName} ({newData.modelYear}) {newData.soldOut && <div className={s.soldBadge}>Sold Out!</div>}
      </h2>
      <p className={s.title}>{newData.title}</p>
      <h3 className={s.price}>₹ {newData.sellingPrice?.toLocaleString()}</h3>

      {/* Car Highlights */}
      <div className={s.tags}>
        <span><FaCar /> {newData.brand}</span>
        <span><RiSpeedUpFill /> {newData.kilometersDriven} km</span>
        <span><BsFillFuelPumpFill /> {newData.fuelType}</span>
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
        Latitude={newData.latitude}
        Longitude={newData.longitude}
      />
    </div>
  </div>
  {/* <div className={s.ads}>
    {
      user.adsPosted.map((ele) => <Card 
      Title={ele.title}
      Price={ele.sellingPrice}
      city={ele.location}
      Img={ele.imgUrl}
      id={ele._id}
      From={'nonwish'}
      Category={ele.category}
      createdBy={ele.createdBy}
      createdAt={ele.createdAt}
      // Wishlist={wishlist}
    />)
    }
  </div> */}
</div>

        </>
    );
};

export default Vehicle