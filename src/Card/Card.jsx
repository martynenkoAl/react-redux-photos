import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addSaved,
  deleteSaved,
  selectSaved,
} from '../features/saved/saved-slice';
import style from '../index.module.scss';
import { GoHeartFill } from 'react-icons/go';
import { GoHeart } from 'react-icons/go';

export default function Card({ image, title, id }) {
  const dispatch = useDispatch();
  const saved = useSelector(selectSaved);

  const toggleSaved = (id) => {
    if (saved.includes(id)) {
      dispatch(deleteSaved(id));
    } else {
      dispatch(addSaved(id));
    }
  };

  return (
    <div className={style.cardContainer}>
      <img className={style.photo} src={image} alt={title} />
      <div className={style.photoBottom}>
        <p>
          Photo by <b>{title}</b>
        </p>
        <span onClick={() => toggleSaved(id)}>
          {saved.includes(id) ? <GoHeartFill color='#f6554d' /> : <GoHeart />}
        </span>
      </div>
    </div>
  );
}
