import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Book, RootState } from '../types/types';
import './BookDetailPage.css'; // Import the CSS file

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams(); // Get the bookId from the URL parameters

  const paginatedResults = useSelector((state: RootState) => state.search.results) as Book[][];

  const results: Book[] = paginatedResults.flat();

  const book: Book | undefined = results.find((result: Book) => result.id === bookId);

  if (!book) {
    return <div>Book not found.</div>;
  }

  return (
    <div className="container">
      <h2>{book.volumeInfo.title}</h2>
      <p>Author: {book.volumeInfo.authors}</p>
      <p>Published Date: {book.volumeInfo.publishedDate}</p>
      <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
      { book.volumeInfo.description ? (<p>Description: {book.volumeInfo.description}</p>) : null }
    </div>
  );
};

export default BookDetailPage;
