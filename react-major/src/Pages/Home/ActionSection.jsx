import React from 'react'
import s from './ActionSection.module.css'
import deal from '../../assets/Deal.jpg'
import Button from '../../Components/Button'

const ActionSection = () => {
	return (
        <>
            <div className={s.wrapper}>
							<div className={s.heading}>
							Our <span style={{color: 'rgb(43,226,150)'}}>Services</span>?
						</div>
                <div className={s.box}>
                    <div className={s.text}>
                        <h2 className={s.h2}>
                            you can enjoy various services like buying and
                            listing your products on sale and get good prices
                            around your region
                        </h2>
                        <div className={s.btns}>
                            <Button value={"Buy"} />
                            <Button value={"Sell"} />
                        </div>
                    </div>
                    <div className={s.img}>
                        <img src={deal} alt="" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ActionSection