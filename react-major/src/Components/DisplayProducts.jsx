import React from 'react'
import s from '../Pages/BuyCategories/Cars/Main.module.css'
import Card from './Card';
import { useSelector } from 'react-redux';

const DisplayProducts = ({Category, wishlist}) => {
    const start = useSelector((state) => state.Pagination.start)
    const end = useSelector((state) => state.Pagination.end)
    // const isActive = useSelector((state) => state.Pagination.isActive)
	return (
        <>
            <div className={s.products}>
                {Category.length == 0 ? (
                    <div className={s.warn}>
                        No products listed as per your search
                    </div>
                ) : (
                    Category.slice(start,end).map((ele) => (
                            <div key={ele._id} className={s.wishlistCard}>
                                <Card
                                    Title={ele.title}
                                    Price={ele.sellingPrice}
                                    city={ele.location}
                                    Img={ele.imgUrl}
                                    id={ele._id}
                                    Category={ele.category}
                                    createdBy={ele.createdBy}
                                    createdAt={ele.createdAt}
                                    Wishlist={wishlist}
                                />
                            </div>
                    ))
                )}
            </div>
        </>
    );
}

export default DisplayProducts