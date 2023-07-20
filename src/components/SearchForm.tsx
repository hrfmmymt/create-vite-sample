import { FC, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default SearchForm;
