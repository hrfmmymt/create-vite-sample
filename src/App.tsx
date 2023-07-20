import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import TopPage from './components/TopPage';
import Result from './components/Result';
import Page404 from './components/Page404';

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
