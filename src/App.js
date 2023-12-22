import Filter from './features/filter/Filter';
import PhotosList from './features/photos/PhotosList';
import style from './index.module.scss';

function App() {
  return (
    <div className={style.container}>
      <h1 className={style.title}>Photos</h1>
      <Filter />
      <PhotosList />
    </div>
  );
}

export default App;
