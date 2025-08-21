import React from 'react'
import styles from './Header.module.css'


const Header = () => {
	return (
		<>
			<div className={styles.wrapper}>
				<div className={styles.box}>
					<div className={styles.heading}>MNQ Online Marketplace For Classified Ads</div>
					<div className={styles.para}>If you want to sell/Purchase items such as Cars, Properties, Furniture, Bikes, Mobiles, Appliances, Services or any Product then MNQ is for you.</div>
				</div>
			</div>
		</>
	)
}

export default Header