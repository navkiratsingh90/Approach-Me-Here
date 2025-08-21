import React from 'react'
import s from './Features.module.css'
import Resale from '../../assets/Resale.jpg'

const Features = () => {
	return (
		<>
			<div className={s.wrapper}>
  <div className={s.parent}>
    <h1 className={s.h1head}>How to Sell?</h1>
    
    {/* Feature Section - Responsive by default */}
    <div className={s['feature-section']}> {/* Use bracket notation for kebab-case */}
      <div className={s['feature-img']}>
        <img src={Resale} alt="Resale process" />
      </div>
      
      <div className={s.features}>
        <h1 className={s.h1}>How you can resale your Goods?</h1>
        <p className={s.p}>Here is the Process...</p>
        <ul className={s.ul}>
          <li className={s['list-item']}>Select the Category in which your product belongs</li>
          <li className={s['list-item']}>Fill all product details in the form</li>
          <li className={s['list-item']}>Click submit to list your product for sale</li>
        </ul>
      </div>
    </div>
  </div>
</div>
		</>
	)
}

export default Features