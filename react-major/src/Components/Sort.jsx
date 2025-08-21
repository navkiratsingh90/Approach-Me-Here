import React, { useState } from 'react'
import s from './Sort.module.css'
import { useDispatch } from 'react-redux';

const Sort = ({name, FuncLow, FuncHigh}) => {
    const [selectedSort, setSelectedSort] = useState('relevance');
  
  const handleSort = (sortType, action) => {
    setSelectedSort(sortType);
    if (action) action();
  };
	const dispatch = useDispatch()
	return (
        <>
    <div className={s.sort}>
      <div className={s.name}>{name}</div>
      <div className={s.btns}>
        <button 
          className={`${s.sortBtn} ${selectedSort === 'relevance' ? s.selected : ''}`}
          onClick={() => handleSort('relevance')}
        >
          Relevance
        </button>
        <button
          onClick={() => handleSort('high', FuncHigh)}
          className={`${s.sortBtn} ${selectedSort === 'high' ? s.selected : ''}`}
        >
          High to low
        </button>
        <button
          onClick={() => handleSort('low', FuncLow)}
          className={`${s.sortBtn} ${selectedSort === 'low' ? s.selected : ''}`}
        >
          Low to high
        </button>
        <button 
          className={`${s.sortBtn} ${selectedSort === 'date' ? s.selected : ''}`}
          onClick={() => handleSort('date')}
        >
          Date published
        </button>
      </div>
    </div>
        </>
    );
}

export default Sort