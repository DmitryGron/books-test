import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from './store/reducers/search';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Retrieve the last search term from localStorage
    const lastSearchTerm = localStorage.getItem('lastSearchTerm');
    if (lastSearchTerm) {
      // Dispatch an action to set the last search term in Redux
      dispatch(setSearchTerm(lastSearchTerm));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book/:bookId" element={<BookDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
