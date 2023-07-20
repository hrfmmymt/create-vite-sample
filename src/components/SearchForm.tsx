import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  query?: string;
};

const SearchForm: FC<Props> = ({ query }) => {
  const navigate = useNavigate();
  const inputElement = useRef<HTMLInputElement>(null);

  const onClickSearchButton = () => {
    if (inputElement != null) {
      const inputKeyword = inputElement.current;
      navigate(`/result/?q=${String(inputKeyword?.value)}`);
    }
  };

  useEffect(() => {
    if (query != null && inputElement != null) {
      const inputKeyword = inputElement.current;
      if (inputKeyword !== null) {
        inputKeyword.value = query;
      }
    }
  }, [query]);

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
