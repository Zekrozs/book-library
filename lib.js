"use strict";

let DOM = {
  dialogBox: document.getElementById("dialog-box"),
  form: document.getElementById("selection-form"),
  genreField: document.getElementById("selection"),
  titleField: document.getElementById("book-title"),
  authorField: document.getElementById("author"),
  pagesField: document.getElementById("pages"),
  bookGrid: document.getElementById("books"),
};

const bookCollection = []

function clearForm() {
  DOM.form.reset();
  DOM.genreField.textContent = "";
}

function closeDialogBox() {
  DOM.dialogBox.close();
}

function openDialog() {
  DOM.dialogBox.showModal();
}

class book {
  constructor(title, author, pages, genre) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
  }
}
function createBook() { 
    const newBook = new book(
    DOM.titleField.value,
    DOM.authorField.value,
    DOM.pagesField.value,
    DOM.genreField.textContent,
  )
    bookCollection.push(newBook) 
    console.log(name)
    
}

function createCover() {
  const book = document.createElement("div");
  book.classList.add("book-container");

  const bookInfo = document.createElement("div");
  bookInfo.classList.add("book");

  const coverTitle = document.createElement("h3");
  coverTitle.classList.add("book-title");
  coverTitle.textContent = name.title;

  const coverAuthor = document.createElement("p");
  coverAuthor.classList.add("info");
  coverAuthor.textContent = ` By: ${name.author}`;

  const coverPages = document.createElement("p");
  coverAuthor.classList.add("info");
  coverPages.textContent = `pages: ${name.pages}`;

  const coverGenre = document.createElement("p");
  coverGenre.classList.add("info");
  coverGenre.textContent = name.genre;

  const readBtn = document.createElement("button");
  readBtn.classList.add("btn", "status");
  readBtn.id = "read";
  readBtn.textContent = "unread";

  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("btn", "remove-book-button");
  readBtn.id = "remove-book-button";
  cancelBtn.textContent = "X";

  bookInfo.append(coverTitle, coverAuthor, coverPages, coverGenre);
  book.append(bookInfo, cancelBtn, readBtn);
  DOM.bookGrid.appendChild(book);
}

DOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.addEventListener("click", (e) => {
  const target = e.target;

  const dialogBtn = target.closest('[data-button="open-dialog"]');

  if (dialogBtn) {
    openDialog();
  }

  const closeDialog = target.closest('[data-button="cancel"]');
  if (closeDialog) {
    clearForm();
    closeDialogBox();
  }

  const confirmBook = target.closest('[data-button="submit-book"]');

  if (confirmBook) {
    createBook()
    createCover();
    closeDialogBox();
    clearForm();
  }

  const selectedGenre = target.closest("[data-genre]");
  if (selectedGenre) {
    DOM.genreField.textContent = selectedGenre.textContent;
  }
});
