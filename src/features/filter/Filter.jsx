import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, toggleFilter } from './filter-slice';
import style from '../../index.module.scss';

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div>
      <button className={style.button} onClick={() => dispatch(toggleFilter())}>
        {filter ? 'показать все фото' : 'Показать понравившиеся фото'}
      </button>
    </div>
  );
}
