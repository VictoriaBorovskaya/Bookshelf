'use strict'

let books = [
    {
      id: 1,
      title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
      authors: 'Erich Gamma, John Vlissides, Ralph Johnson, Richard Helm',
      genre: 'Образование',
      year: '1994',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81gtKoapHFL.jpg'
    },
    {
      id: 2,
      title: 'JavaScript: The Good Parts',
      authors: 'Douglas Crockford',
      genre: 'Образование',
      year: '2008',
      image: 'https://images-na.ssl-images-amazon.com/images/I/81kqrwS1nNL.jpg'
    },
    {
      id: 3,
      title: 'JavaScript Patterns: Build Better Applications with Coding and Design Patterns',
      authors: 'Stoyan Stefanov',
      genre: 'Образование',
      year: '2008',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51%2BSiphz7AL._SX377_BO1,204,203,200_.jpg'
    },
    {
      id: 4,
      title: 'JavaScript: The Definitive Guide: Activate Your Web Pages (Definitive Guides)',
      authors: 'David Flanagan',
      genre: 'Образование',
      year: '2011',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51WD-F3GobL._SX379_BO1,204,203,200_.jpg'
    }
]

// динамическое добавление контейнеров (отрисовываем книги)
const bookshelf = document.getElementById("bookshelf")

function renderBook(arr) {
  bookshelf.innerHTML = ""
  arr.forEach((book) => {
    bookshelf.innerHTML += `
      <div class="bookshelf-container flex-container space-between" id="bookshelf-container">
        <div class="content-container flex-container">
            <img src="${book.image}" class="book-image" alt="Изображение отсутствует (неверно введена ссылка)" />
            <div class="title-container flex-container space-between">
              <h3 class="book-title" id="book-title">${book.title}</h3>
              <p class="book-yar">${book.year}</p>
            </div>
          </div>
          <div class="book-authors-container">
            <p class="book-authors" id="book-author">${book.authors}</p>
          </div>
          <div class="flex width-100">
              <button class="button update-button cursor width-100" id="update-button-${book.id}">Изменить</button>
              <button class="button cursor width-100" id="button-delete-${book.id}">Удалить</button> 
          </div>
      </div>
    `
  })
  forEachUpdateButton(arr) 
  forEachDeleteButton(arr) 
}

// Кнопки "Добавить книгу" и кнопка "Сoхранить" (применительно к модальному окну) 
const addButton = document.getElementById('add-button')
const addModal = document.getElementById('add-modal')
const saveButton = document.getElementById('save-button')

// открытие и закрытие модального окна
const closeModal = () => addModal.style.display = 'none'
const openModal = () => addModal.style.display = 'flex'

// закрытие модального окна при клике на серый фон
const closeModalClick = (event) => {
  if (event.target === addModal)
    return addModal.style.display = 'none'
}

// для LocalStorage
function saveToLocalStorage() {
  const bookJson = JSON.stringify(books) 
  localStorage.setItem('books', bookJson) 
}

// служебные классы для кнопки "Добавить книгу в список"
// очищение полей ввода
function clearForm() {
  document.getElementById("name").value = ""
  document.getElementById("author").value = ""
  document.getElementById("genre").value = "Не выбран"
  document.getElementById("year").value = ""
  document.getElementById("imageLink").value = ""
}

// функция сохранения для кнопки "Добавить книгу в список"
function saveBook() {
  let nameValue = document.getElementById("name").value
  let authorValue = document.getElementById("author").value
  let genreValue = document.getElementById("genre").value
  let yearValue = document.getElementById("year").value
  let imageValue = document.getElementById("imageLink").value
  
  const format1 = ".jpeg"
  const format2 = ".jpg"
  const format3 = ".png"
  if (imageValue.slice(-format1.length) === format1 || imageValue.slice(-format2.length) === format2 || imageValue.slice(-format3.length) === format3) {
    imageValue = document.getElementById("imageLink").value
  } else {
    imageValue = "https://static.vecteezy.com/system/resources/previews/012/921/741/large_2x/round-button-for-gallery-image-landscape-nature-photo-line-icon-turquoise-background-free-vector.jpg"
  }

  if (nameValue.length > 0) {
    let maxId = books.reduce((max, book) => book.id > max ? book.id : max, 0) 
    let bookId = maxId + 1
    
    const bookshelfElement = {
      id: bookId,
      title: nameValue,
      authors: authorValue,
      genre: genreValue,
      year: yearValue,
      image: imageValue
    }

    books.push(bookshelfElement)
    renderBook(books)
    document.body.scrollIntoView({block: 'end'})
    closeModal()
    clearForm()
    saveToLocalStorage()
  } else if (nameValue.length === 0) {
    document.getElementById('name').focus()
  }
}

// служебные функции для кнопки "Изменить"
// открытие модального окна
const addModalUpdate = document.getElementById('add-modal-update')
const openModalUpdate = () => addModalUpdate.style.display = 'flex'
// для нажатия на серый фон
const closeModalUpdateClick = (event) => {
  if (event.target === addModalUpdate) {  
    return addModalUpdate.style.display = 'none' 
  } 
}

// для поиска кнопки в каждом элементе массива
function forEachUpdateButton(arr) { 
  arr.forEach((book) => {
    document
    .getElementById(`update-button-${book.id}`)
    .addEventListener('click', () => {
      updateBook(book.id)
    })
  }) 
} 

// кнопка "Изменить"
function updateBook(id) {
  const book = books.find((booksId) => {
    return booksId.id === id 
  })
  const index = books.indexOf(book) 

  document.getElementById("name-update").value = books[index].title
  document.getElementById("author-update").value = books[index].authors
  document.getElementById("genre-update").value = books[index].genre
  document.getElementById("year-update").value = books[index].year
  document.getElementById("imageLink-update").value = books[index].image

  openModalUpdate()  
  clearInput() 
  const makeEditBook = () => editBook(book.id, makeEditBook)
  document.getElementById('edit-button').addEventListener('click', makeEditBook)
}

// для кнопки "Отмена"
const cancelButton = document.getElementById('cancel-button')
const closeModalUpdate = () => addModalUpdate.style.display = 'none'

// служебные классы для кнопки "Обновить"
// иконка корзины (очистить поле)
function clearInput() {
  const iconDeleteName = document.getElementById('icon-delete-name')
  const iconDeleteNameFunction = () => document.getElementById('name-update').value = ""
  iconDeleteName.addEventListener('click', iconDeleteNameFunction)

  const iconDeleteYear = document.getElementById('icon-delete-year')
  const iconDeleteYearFunction = () => document.getElementById('year-update').value = ""
  iconDeleteYear.addEventListener('click', iconDeleteYearFunction)

  const iconDeleteAuthor = document.getElementById('icon-delete-author')
  const iconDeleteAuthorFunction = () => document.getElementById('author-update').value = ""
  iconDeleteAuthor.addEventListener('click', iconDeleteAuthorFunction)

  const iconDeleteImage = document.getElementById('icon-delete-image')
  const iconDeleteImageFunction = () => document.getElementById('imageLink-update').value = ""
  iconDeleteImage.addEventListener('click', iconDeleteImageFunction)
}

// кнопка "Oбновить"
function editBook(id, makeEditBook) {
  const book = books.find((bookId) => {
    return bookId.id === id
  })  

  const index = books.indexOf(book) 

  let nameValueUpdate = document.getElementById("name-update").value
  let authorValueUpdate = document.getElementById("author-update").value
  let genreValueUpdate = document.getElementById("genre-update").value
  let yearValueUpdate = document.getElementById("year-update").value
  let imageValueUpdate = document.getElementById("imageLink-update").value 

  // для проверки формата изображения
  const format1 = ".jpeg"
  const format2 = ".jpg"
  const format3 = ".png"
  if (imageValueUpdate.slice(-format1.length) === format1 || imageValueUpdate.slice(-format2.length) === format2 || imageValueUpdate.slice(-format3.length) === format3) {
    imageValueUpdate = document.getElementById("imageLink-update").value
  } else {
    imageValueUpdate = "https://static.vecteezy.com/system/resources/previews/012/921/741/large_2x/round-button-for-gallery-image-landscape-nature-photo-line-icon-turquoise-background-free-vector.jpg"
  }

  const newBook = {  
    id: id, 
    title: nameValueUpdate,
    authors: authorValueUpdate,
    genre: genreValueUpdate,
    year: yearValueUpdate,
    image: imageValueUpdate
  } 
  
  if (nameValueUpdate.length === 0) {
    document.getElementById('name-update').focus()
    document.getElementById('name-update').setAttribute('placeholder', 'Это поле обязательно для заполнения')
  } else if (nameValueUpdate.length > 0) {
    books.splice(index, 1, newBook) // заменили книгу 
    document.getElementById('edit-button').removeEventListener('click', makeEditBook) // снимаем обработчик с кнопки, чтобы книги корректно обновлялись
    renderBook(books) 
    closeModalUpdate()  
    saveToLocalStorage() 
  }
} 

// кнопка "Удалить"
function forEachDeleteButton(arr) { 
  arr.forEach((book) => {
    document
      .getElementById(`button-delete-${book.id}`) 
      .addEventListener("click", () => {
        deleteBook(book.id)
    })
  })
}  

// функция удаления
function deleteBook(id) {
  const book = books.find((bookId) => {
    return bookId.id === id
  }) 
  const bookIndex = books.indexOf(book) 
  books.splice(bookIndex, 1) 
  renderBook(books) 
  saveToLocalStorage()
}

// для поиска книг 
const iconDeleteFunction = () => {
  document.getElementById('input-search').value = ""
  renderBook(books)  
}

// функция для поиска
let inputSearch = document.getElementById('input-search') 
function searchBook() {
  let value = this.value.trim() 
  let valueSearch = value.toLowerCase() 

  let collection = document.getElementsByClassName('bookshelf-container')
  let arraySearch = Array.from(collection) 

  if(valueSearch) { 
    arraySearch.forEach(element => { 
      let elem = element.innerText.toLowerCase() 
      if(elem.search(valueSearch) == -1) {  
        element.style.display = 'none'
      } else {
        element.style.display = 'flex' 
      }
    })
  } else {
    arraySearch.forEach(element => { 
      element.style.display = 'flex'  
    })
  }
}

// фильтрация книг по жанрам
const listGenre = document.getElementById('genre-menu')
function sortBook () {
  let bookFilter = books.filter((book) => book.genre == listGenre.value, 0)
  renderBook(bookFilter)
  if(listGenre.value === 'Все книги') {
    renderBook(books)
  }
}

function initApp() {
  addButton.addEventListener('click', openModal)
  addModal.addEventListener('click', closeModalClick)
  saveButton.addEventListener('click', saveBook)
  addModalUpdate.addEventListener('click', closeModalUpdateClick) 
  cancelButton.addEventListener('click', closeModalUpdate)
  document.getElementById('icon-delete').addEventListener('click', iconDeleteFunction)
  inputSearch.addEventListener('input', searchBook)
  listGenre.addEventListener("change", sortBook)

  const bookJson = localStorage.getItem('books') 
  if(bookJson) {
    books = JSON.parse(bookJson)
  } 

  renderBook(books) 
}

initApp()