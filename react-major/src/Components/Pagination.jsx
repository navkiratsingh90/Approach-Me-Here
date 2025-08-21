import React from 'react';
import s from '../Pages/BuyCategories/Cars/Main.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { HandleSlideLeft, HandleSlideRight } from '../Features/PageSlice';

const Pagination = ({ Category }) => {
  const  isPrevDisabled = useSelector((state) => state.Pagination.isPrevDisabled);
  const  isNextDisabled = useSelector((state) => state.Pagination.isNextDisabled);

  const dispatch = useDispatch();

  if (Category.length === 0) return null;

  return (
    <div className={s.Pagebtns}>
      <button
        className={s.pagebtn}
        disabled={isPrevDisabled}
        onClick={() => dispatch(HandleSlideLeft(Category.length))}
      >
        Prev
      </button>
      <button
        className={s.pagebtn}
        disabled={isNextDisabled}
        onClick={() => dispatch(HandleSlideRight(Category.length))}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
