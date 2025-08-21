import React from 'react'
import s from './Benefits.module.css'
import {MdMoneyOff} from 'react-icons/md'
import service from '../../assets/Service.jpg'

const Benefits = () => {
	return (
		<>
				<div className={s.wrapper}>
					<div className={s.heading}>
						Why Choose <span style={{color: 'rgb(43,226,150)'}}>Us</span>?
					</div>
					<div className={s['parent-card']}>
						<div className={s.card}>
							<div className={s.img}>
							<MdMoneyOff size={70}/>
							</div>
							<div className={s.para}>
								<h2 className={s.h2}>Free Of Cost</h2>
								<p className={s.p}>you can post any AD free of cost and list your various items on web and find a genuine customer</p>
							</div>
						</div>
						<div className={s.card}>
							<div className={s.img}>
							<MdMoneyOff size={70}/>
							</div>
							<div className={s.para}>
								<h2 className={s.h2}>Free Of Cost</h2>
								<p className={s.p}>you can post any AD free of cost and list your various items on web and find a genuine customer</p>
							</div>
						</div>
						<div className={s.card}>
							<div className={s.img}>
							<MdMoneyOff size={70}/>
							</div>
							<div className={s.para}>
								<h2 className={s.h2}>Free Of Cost</h2>
								<p className={s.p}>you can post any AD free of cost and list your various items on web and find a genuine customer</p>
							</div>
						</div>
						<div className={s.card}>
							<div className={s.img}>
							<MdMoneyOff size={70}/>
							</div>
							<div className={s.para}>
								<h2 className={s.h2}>Free Of Cost</h2>
								<p className={s.p}>you can post any AD free of cost and list your various items on web and find a genuine customer</p>
							</div>
						</div>
						
						

					</div>
				</div>
		</>
	)
}

export default Benefits