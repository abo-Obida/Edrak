import React from 'react'
import './Loader.css'
const Loader = () => {
    const books = [
        { color: '#3498db', title: 'كيمياء', delay: 0 },
        { color: '#e74c3c', title: 'فيزياء', delay: 0.2 },
        { color: '#2ecc71', title: 'أحياء', delay: 0.4 },
        { color: '#f39c12', title: 'رياضيات', delay: 0.6 }
      ];
  return (
    <div className="books-loader">
    <div className="bookshelf"></div>
    {books.map((book, index) => (
      <div 
        key={index}
        className="book"
        style={{
          backgroundColor: book.color,
          animationDelay: `${book.delay}s`
        }}
      >
        <span>{book.title}</span>
      </div>
    ))}
    <div className="loading-text">جاري تحميل البيانات...</div>
  </div>
  )
}

export default Loader
