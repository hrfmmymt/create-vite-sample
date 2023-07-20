import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchForm from './SearchForm';

type Photo = {
  id: number;
  urls: { large: string; regular: string; raw: string; small: string };
  links: {
    self: string;
    html: string;
    download: string;
  };
  alt_description: string;
};

type Response = {
  results: Photo[];
  total: number;
  total_pages: number;
};

const Result: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = location.search;
  const query = useMemo(() => new URLSearchParams(search), [search]);
  const [photoList, setPhotoList] = useState<Photo[]>([]);
  const UNSPLASH_CLIENT_ID = import.meta.env.VITE_UNSPLASH_API_KEY as string;

  useEffect(() => {
    fetch(
      `https://api.unsplash.com/search/photos?query=${String(
        query,
      )}&client_id=${UNSPLASH_CLIENT_ID}`,
    )
      .then((response) => response.json())
      .then((data: Response) => setPhotoList(data.results))
      .catch((err) => {
        console.error(err);
        alert('Error!');
      });
  }, [query, UNSPLASH_CLIENT_ID]);

  return (
    <>
      <SearchForm />
      <div className="result">
        <h1>search result, query: {query.get('q')}</h1>
        <div className="photo-list">
          {photoList.map((photo: Photo) => (
            <a href={photo.links.html} key={photo.id}>
              <img src={photo.urls.regular} alt={photo.alt_description} />
            </a>
          ))}
        </div>
        <button onClick={() => navigate('/')}>top</button>
      </div>
    </>
  );
};

export default Result;
