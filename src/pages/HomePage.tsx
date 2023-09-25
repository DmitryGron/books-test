import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setSearchTerm,
  startLoading,
  searchSuccess,
  searchError,
  setCurrentPage,
  setTotalItems,
} from '../store/reducers/search';
import axios from 'axios';
import './HomePage.css';
import { SearchState } from '../types/types';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchTerm, results, currentPage, resultsPerPage, totalItems } = useSelector(
    (state: { search: SearchState }) => state.search
  );

  const handleSearch = useCallback(async () => {
    dispatch(startLoading());
    try {
      const startIndex = (currentPage - 1) * resultsPerPage;
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${resultsPerPage}`
      );
      dispatch(setTotalItems(response.data.totalItems));
      dispatch(searchSuccess(response.data.items));
    } catch (error) {
      dispatch(searchError((error as Error).message));
    }
  }, [dispatch, searchTerm, currentPage, resultsPerPage]);

  useEffect(() => {
    if (searchTerm) {
      const debounceTimer = setTimeout(handleSearch, 500);
      return () => clearTimeout(debounceTimer);
    }
  }, [searchTerm, currentPage, resultsPerPage, dispatch, handleSearch]);

  const handleBookClick = (bookId: string) => {
    navigate(`/book/${bookId}`);
  };

  // Calculate the total number of pages based on total results and results per page
  const totalPages = Math.ceil(totalItems / resultsPerPage);

  return (
    <div className="homepage-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search for books"
        value={searchTerm}
        onChange={(e) => dispatch(setSearchTerm(e.target.value))}
      />
      {results[currentPage - 1]?.map((book: any) => (
        <div
          key={book.id}
          className="book-result"
          onClick={() => handleBookClick(book.id)}
        >
          {/* Use the Link component to navigate to the book detail page */}
          <Link to={`/book/${book.id}`}>
            <h3>{book.volumeInfo.title}</h3>
            <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
