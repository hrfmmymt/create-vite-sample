import { FC, useEffect, useMemo, useRef, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from 'react-router-dom';

const TopPage: FC = () => {
  return (
    <>
      <SearchForm />
      <h1>top</h1>
    </>
  );
};

const SearchForm: FC = () => {
  const navigate = useNavigate();
  const inputElement = useRef<HTMLInputElement>(null);

  const onClickSearchButton = () => {
    if (inputElement != null) {
      const inputKeyword = inputElement.current;
      navigate(`/result/?q=${String(inputKeyword?.value)}`);
    }
  };

  return (
    <div>
      <input type="text" ref={inputElement} />
      <button type="button" onClick={onClickSearchButton}>
        search
      </button>
    </div>
  );
};

type Response = {
  results: Photo[];
  total: number;
  total_pages: number;
};

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

const Page404: FC = () => {
  return <h1>404</h1>;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/result/" element={<Result />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
