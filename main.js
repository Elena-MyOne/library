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
    <dialog class="dialog">
      <h3 class="form-title">Add a new book</h3>
      <p class="error-message"></p>
      <form method="dialog" class="form">
        <div class="form-item">
          <label for="title">Book title</label>
          <input type="text" id="title" name="title" />
        </div>
        <div class="form-item">
          <label for="author">Book author</label>
          <input type="text" id="author" name="author" />
        </div>
        <div class="form-item">
          <label for="pages">Book pages</label>
          <input type="number" id="pages" name="pages" min="0"/>
        </div>
        <div class="form-item">
          <label for="pages">Is book read?</label>
          <select name="select">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button class="form-button">Add book</button>
      </form>
    </dialog>
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
const addBookButton = document.getElementById('add');
const closeButton = document.querySelector('dialog button');
const dialog = document.querySelector('dialog');

if (books) {
  renderBooks();
}

if (books && addBookButton) {
  addBookButton.addEventListener('click', openForm);
  books.addEventListener('click', handleBookEvents);
}

function openForm() {
  dialog.showModal();
}

function closeForm(event) {
  event.preventDefault();
  const form = document.querySelector('.form');
  const errorMessage = document.querySelector('.error-message');
  const { title, author, pages, select } = form.elements;

  if (title.value && author.value && pages.value) {
    errorMessage.innerText = '';
    const readStatus = select.value === 'true';
    const newBook = new Book(
      title.value,
      author.value,
      pages.value,
      readStatus,
      libraryBooksList.length + 1
    );
    libraryBooksList.push(newBook);
    renderBooks();
    dialog.close();
  } else {
    errorMessage.innerText = 'Please fill up all the form fields';
  }
}

if (closeButton) {
  closeButton.addEventListener('click', closeForm);
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
  if (readStatusButton) {
    const bookId = parseInt(readStatusButton.dataset.id);
    const book = libraryBooksList.find((book) => book.id === bookId);
    if (book.read) {
      book.read = false;
      readStatusButton.innerText = READ_BUTTON_TEXT.notRead;
    } else {
      book.read = true;
      readStatusButton.innerText = READ_BUTTON_TEXT.read;
    }
  }
}
