let libraryBooksList = [];

function Book(title, author, pages, read, id) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

const bookOne = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false, 1);
const bookTwo = new Book('Hard to Be a God', 'Arkady and Boris Strugatsky', 300, true, 2);
libraryBooksList.push(bookOne);
libraryBooksList.push(bookTwo);

console.log(libraryBooksList);

const READ_BUTTON_TEXT = {
  read: 'already read',
  notRead: 'not read yet',
};

const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = renderTable();

function renderTable() {
  return `
  <header class="header">
      <h1 class="title">Library</h1>
      <div class="add-button">
        <button class="button" id="add">&plus;</button>
        <span>Add book</span>
      </div>
  </header>
  <main class="main">
    <div class="books"></div>
  </main>
  <footer class="footer">&copy; Developed by <a class="link" href="https://github.com/Elena-MyOne" target="_blank" rel=”noopener noreferrer”>MyOne</a></footer>
  `;
}

function renderBooks() {
  books.innerHTML = libraryBooksList
    .map(
      (book) =>
        `<div class="item">
          <div class="delete-book-btn" data-id="${book.id}">&times;</div>
          <div>
          <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
          </div>
          <button class="book-read" data-id="${book.id}">${
          book.read ? READ_BUTTON_TEXT.read : READ_BUTTON_TEXT.notRead
        }</button>
          <p class="book-pages">${book.pages} pages</p>
        </div>`
    )
    .join('');
}

const books = document.querySelector('.books');
const button = document.getElementById('add');

if (books) {
  renderBooks();
}

if (books && button) {
  button.addEventListener('click', addBookToLibrary);
  books.addEventListener('click', handleBookEvents);
}

function addBookToLibrary() {
  books.insertAdjacentHTML('afterbegin', `<div class="item">Hello</div>`);
}

function handleBookEvents(event) {
  deleteBook(event);
  toggleReadStatus(event);
}

function deleteBook(event) {
  const deleteButton = event.target.closest('.delete-book-btn');
  if (deleteButton) {
    const bookId = parseInt(deleteButton.dataset.id);
    libraryBooksList = libraryBooksList.filter((book) => book.id !== bookId);
    console.log(libraryBooksList);
    renderBooks();
  }
}

function toggleReadStatus(event) {
  const readStatusButton = event.target.closest('.book-read');
  const bookId = parseInt(readStatusButton.dataset.id);
  const book = libraryBooksList.find((book) => book.id === bookId);
  if (book) {
    if (book.read) {
      book.read = false;
      readStatusButton.innerText = READ_BUTTON_TEXT.notRead;
    } else {
      book.read = true;
      readStatusButton.innerText = READ_BUTTON_TEXT.read;
    }
  }
}
