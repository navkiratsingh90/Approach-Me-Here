import React from 'react';
import s from './PostCard.module.css';
import { Link } from 'react-router-dom';

const PostCard = () => {
  return (
    <div className={s.card}>
      <h2 className={s.heading}>Want to Post an AD?</h2>
      <Link to={'/sell'}><button className={s.button}>Post Now</button></Link>
    </div>
  );
};

export default PostCard;
