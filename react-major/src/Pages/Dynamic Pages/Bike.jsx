// import React, { useEffect, useState } from 'react'
// import s from './Main.module.css'
// import { useParams } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { RiSpeedUpFill } from "react-icons/ri";
// import { IoIosSettings } from "react-icons/io";
// import {  FaMapPin , FaCalendarAlt} from 'react-icons/fa';
// import {BsFillFuelPumpFill} from 'react-icons/bs'
// import user from '../../assets/user.png'
// import UserDetails from '../../Components/UserDetails';

// const Bike = () => {
// 	const ID = useParams()
// 	console.log(ID);
// 	const [newData, setnewData] = useState(null)
// 	const Bikes = useSelector((state) => state.Bike.Bikes)
// 	useEffect(() => {
//     const Data = Bikes.filter((ele) => ele.id == ID.id);
//     setnewData(Data[0]);
//   }, [Bikes, ID.id]);

//   if (!newData) return <div>Loading...</div>;
// 	return (
//         <>
//             <div className={s.wrapper}>
//                 <div className={s.parent}>
//                     <div className={s.image}>
//                         <img src={newData.Img} alt="" />
//                     </div>
//                     <div className={s.info}>
// 											<span className={s.head}>Bike Details: </span>
//                         <div className={s.first}>
// 												<div className={s.card}>
// 														<div className={s.top}>
// 															<h2 className={s.title}>{newData.Brand} {newData.modelName} ({newData.modelYear})</h2>
// 															<p className={s.subtitle}>{newData.Title}</p>
// 															<div className={s.tags}>
// 																<span className={s.tag}> {newData.Brand}</span>
// 																<span className={s.tag}><RiSpeedUpFill/>{newData.kmDriven}</span>
// 															</div>
// 														</div>

// 														</div>
//                         </div>
//                         <div className={s.overview}>
//                             <div className={s.card}>
//                                 <h2 className={s.title}>Overview</h2>
//                                 <div className={s.details}>
//                                     {/* Owner */}
//                                     <div className={s.item}>
//                                         <span className={s.icon}><BsFillFuelPumpFill/></span>
//                                         <div>
//                                             <p className={s.label}>fuel type</p>
//                                             <p className={s.value}>{newData.Fuel}</p>
//                                         </div>
//                                     </div>

//                                     {/* Location */}
//                                     <div className={s.item}>
//                                         <span className={s.icon}><FaMapPin/></span>
//                                         <div>
//                                             <p className={s.label}>Location</p>
//                                             <p className={s.value}>
//                                                 {newData.city}
//                                             </p>
//                                         </div>
//                                     </div>

//                                     {/* Posting Date */}
//                                     <div className={s.item}>
//                                         <span className={s.icon}><FaCalendarAlt/></span>
//                                         <div>
//                                             <p className={s.label}>
//                                                 Posting date
//                                             </p>
//                                             <p className={s.value}>{newData.Date}</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
// 												<div className={s.desc}>
// 													<div className={s.descTitle}>
// 														Description
// 													</div>
// 													<div className={s.box}>
// 														{newData.Desc}
// 													</div>
// 												</div>
// 											<UserDetails Phone={newData.Phone}/>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Bike

import React, { useEffect, useState } from 'react'
import s from "./Main.module.css";
import Swal from 'sweetalert2'
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RiSpeedUpFill } from "react-icons/ri";
import { FaBicycle, FaMapPin, FaCalendarAlt } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import UserDetails from "../../Components/UserDetails";
import { addCarItems } from "../../Features/Car/CarSlice";
import BikeUpdateModal from '../../UpdateForms/Bike';
import { toast } from 'react-toastify';
import { IoIosSettings } from 'react-icons/io';
const Bike = () => {
    const dispatch = useDispatch();
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
        const res = await fetch(`http://localhost:7000/api/bike/update/${ID.id}`, {
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
                `http://localhost:7000/api/bike/get/${ID.id}`,
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

    useEffect(() => {
        handleFetch();
    }, []);
    const HandleDelete = async (id) => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to undo this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
        });
      
        if (result.isConfirmed) {
          try {
            const res = await fetch(`http://localhost:7000/api/bike/delete/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
              }
            });
      
            const data = await res.json();
            if (res.ok) {
              console.log("fetch successful");
              console.log(data);
              Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
              navigate('/buy/Bikes')
              // Optionally refresh data or remove the item from the local state
            } else {
              toast.error(data.message || "Delete failed!");
              console.error("Delete failed", data.message);
            }
          } catch (error) {
            console.error(`error ${error}`);
          }
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
        {isModalOpen && selectedCar && (
        <BikeUpdateModal
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
        <span><FaBicycle /> {newData.brand}</span>
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
      />
    </div>
  </div>
</div>

        </>
    );
};

export default Bike