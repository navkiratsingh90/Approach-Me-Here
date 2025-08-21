import React from 'react'
import s from './sell.module.css'
import Property from '../../assets/Property.png'

const Image = () => {
	return (
		<>
			<div className={s.wrapper}>
    <div className={s.parent}>
        <div className={s.imgContainer}>
            <img src={Property} alt="Property" />
            <div className={s.nameOverlay}>
                <div className={s.sub}>MNQ</div>
            </div>
        </div>
    </div>
</div>

		</>

	)
}

export default Image