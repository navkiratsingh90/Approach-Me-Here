import React from 'react'
import {PiQuotesFill } from 'react-icons/pi'
import { FaUser } from 'react-icons/fa'
import s from './Testimonials.module.css'

const Testimonials = () => {
	return (
        <>
            <div className={s.wrapper}>
                <div className={s.heading}>Testimonials</div>
                <div className={s["parent-card"]}>
                    <div className={s.card}>
											<div className={s.up}>
                        <div className={s.quote}>
                            <PiQuotesFill size={60}/>
                        </div>
                        <div className={s.review}>
												Sold off my phone very easily and got the payment on the spot. Best experience so far.
                        </div>
												</div>
                        <div className={s.user}>
                            <div className={s.img}>
														<FaUser size={20} color='pink'/>
														</div>
                            <div className={s.nameCity}>
                                <div className={s.name}>Virat Kohli</div>
                                <div className={s.city}>Karachi</div>
                            </div>
                        </div>
                    </div>
										<div className={s.card}>
											<div className={s.up}>
                        <div className={s.quote}>
                            <PiQuotesFill size={60}/>
                        </div>
                        <div className={s.review}>
												Sold off my phone very easily and got the payment on the spot. Best experience so far.
                        </div>
												</div>
                        <div className={s.user}>
                            <div className={s.img}>
														<FaUser size={20} color='pink'/>
														</div>
                            <div className={s.nameCity}>
                                <div className={s.name}>Virat Kohli</div>
                                <div className={s.city}>Karachi</div>
                            </div>
                        </div>
                    </div>
										<div className={s.card}>
											<div className={s.up}>
                        <div className={s.quote}>
                            <PiQuotesFill size={60}/>
                        </div>
                        <div className={s.review}>
												Sold off my phone very easily and got the payment on the spot. Best experience so far.
                        </div>
												</div>
                        <div className={s.user}>
                            <div className={s.img}>
														<FaUser size={20} color='pink'/>
														</div>
                            <div className={s.nameCity}>
                                <div className={s.name}>Virat Kohli</div>
                                <div className={s.city}>Karachi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Testimonials