const books = [
    {
      id: 1,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
      year: '1994',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
    },
    {
      id: 2,
      title: 'JavaScript: The Good Parts',
      authors: 'Douglas Crockford',
      year: '2008',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
    },
    {
      id: 3,
      title:
      'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
      authors: 'Stoyan Stefanov',
      year: 2008,
      image: 'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
    },
    {
      id: 4,
      title:
      'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
      authors: 'David Flanagan',
      year: 2011,
      image: 'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
    }
]

// динамическое добавление контейнеров

const bookshelf = document.getElementById('bookshelf')

function renderBook() {
  bookshelf.innerHTML = ""
  books.forEach((book) => {
    bookshelf.innerHTML += `
      <div class="bookshelf-container flex-container" id="bookshelf-container">
        <div class="content-container flex-container">
            <img src="${book.image}" class="book-image" />
            <div class="title-container flex-container">
              <h3 class="book-title">${book.title}</h3>
              <p class="book-yar">${book.year}</p>
            </div>
          </div>
          <div class="book-authors-container">
            <p class="book-authors">${book.authors}</p>
          </div>
          <div class="button-container">
              <button class="button">Изменить</button>
              <button class="button" id="button-delete" onclick='deleteBook(${book.id})'>Удалить</button>
          </div>
      </div>
    `
  })
}

// сделаем кнопку "Удалить" активной

function deleteBook(id) {
  const book = books.find((bookId) => {
    return bookId.id === id
  }) // нашли книгу

  const bookIndex = books.indexOf(book) // нашли индекс книги

  books.splice(bookIndex, 1) // удалили элемент из массива

  renderBook() // перерисовываем массив 
}

renderBook()










