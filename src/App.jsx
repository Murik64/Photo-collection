import './index.scss';
import { Collection } from './Collection'
import { useEffect, useState } from 'react';

const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" },
]

function App() {
  const [categoryId, setCategoryId] = useState(0);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('')
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const category = categoryId ? `category=${categoryId}` : '';
    setIsLoading(true)
    fetch(`https://6852e6b00594059b23cf8e2c.mockapi.io/collection_photos?page=${page}&limit=3&${category}`)
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      }).catch(err => {
        console.warn(err);
        alert('Ошибка при получение данных.');
      }).finally(() => setIsLoading(false))
  }, [categoryId,page])

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {
            cats.map((obj, i) => (
              <li
                onClick={() => setCategoryId(i)}
                className={categoryId === i ? 'active' : ''}
                key={obj.name}>
                {obj.name}
              </li>
            ))
          }
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoading ?
          (<h2>Идет загрузка...</h2>)
          : (collections.filter(obj => {
            return obj.name.toLowerCase().includes(searchValue.toLowerCase())
          })
            .map((obj, index) => (<Collection key={index} name={obj.name} images={obj.photos} />
            )))}
      </div>
      <ul className="pagination">
        {[...Array(5)].map((_, i) => (
          <li
            onClick={() => setPage(i)}
            className={page === i + 1 ? 'active' : ''}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
