import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadPhotos, selectPhotos, selectPhotosInfo } from './photos-slice';
import Card from '../../Card/Card';
import { selectSaved } from '../saved/saved-slice';
import { selectFilter } from '../filter/filter-slice';
import style from '../../index.module.scss';

export default function PhotosList() {
  const dispatch = useDispatch();
  const photos = useSelector(selectPhotos);
  const saved = useSelector(selectSaved);
  const filter = useSelector(selectFilter);
  const { status, error, qty } = useSelector(selectPhotosInfo);

  useEffect(() => {
    if (!qty) {
      dispatch(loadPhotos());
    }
  }, [qty, dispatch]);

  const filterPhotos = () => {
    if (filter) {
      return saved.map((el) => photos.find((photo) => photo.id === el));
    }
    return photos;
  };

  console.log(photos);

  const filteredArr = filterPhotos();

  return (
    <>
      {error && <h2>Ошибка при получении данных</h2>}
      {status === 'loading' && <h2>Loading...</h2>}
      {filteredArr.length ? (
        <div className={style.galery}>
          {filteredArr.map((el) => (
            <Card
              key={el.id}
              image={el.urls.small}
              title={el.user.name}
              {...el}
            />
          ))}
        </div>
      ) : (
        <h2>Нет сохраненных фото</h2>
      )}
    </>
  );
}