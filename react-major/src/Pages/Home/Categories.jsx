import React, { useState } from 'react'
import s from './Categories.module.css'
import car from '../../assets/Categories/car.png'
import phone from '../../assets/Categories/phone.png'
import sofa2 from '../../assets/Categories/sofa.png'
import app from '../../assets/Categories/app.png'
import {Link} from 'react-router-dom'

const Categories = () => {
	const [items,setitems] = useState([{
		name : 'Cars',
		img : car,
	},{
		name : 'Furniture',
		img : sofa2,
	},{
		name : 'Electronics',
		img : app,
	}, {
		name : 'Mobiles',
		img : phone
	}])
	return (
		<>
			<div  className={s.wrapper}>
				<div className={s.heading}>Categories</div>
				<div className={s.parent}>
					{
						items.map((ele,idx) => <Link to={`/buy/${ele.name}`} key={idx} className={s.card}>
							<div className={s.head}>{ele.name}</div>
						<div className={s.img}>
							<img src={ele.img} alt="" />
						</div>
						</Link>)
					}
					{/* <div className={s.card}>
						<div className={s.head}>Cars</div>
						<div className={s.img}>
							<img src={car} alt="" />
						</div>
					</div> */}
				</div>
			</div>
		</>
	)
}

export default Categories