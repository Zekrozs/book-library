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

const bookCollection = [];

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
  );
  bookCollection.push(newBook);
  console.log(newBook);
}

class dynamicCoverElems {
  constructor() {
    this.bookCover = document.createElement("div");
    this.bookInfo = document.createElement("div");
    this.coverTitle = document.createElement("h3");
    this.coverAuthor = document.createElement("p");
    this.coverPages = document.createElement("p");
    this.coverGenre = document.createElement("p");
    this.readBtn = document.createElement("button");
    this.deleteBtn = document.createElement("button");
  }

  style() {
    this.bookCover.classList.add("book-container");
    this.bookInfo.classList.add("book");
    this.coverTitle.classList.add("book-title");
    this.coverAuthor.classList.add("info");
    this.coverPages.classList.add("info");
    this.coverGenre.classList.add("info");
    this.readBtn.classList.add("btn", "status");
    this.readBtn.dataset.button = "unread";
    this.deleteBtn.classList.add("btn", "remove-book-button");
    this.deleteBtn.dataset.button = "delete";
  }

  appending() {
    this.bookInfo.append(
      this.coverTitle,
      this.coverAuthor,
      this.coverPages,
      this.coverGenre,
    );

    this.bookCover.append(this.bookInfo, this.deleteBtn, this.readBtn);

    DOM.bookGrid.appendChild(this.bookCover);
  }

  updateText(){
    const currentBook = bookCollection.find(book => book.title === DOM.titleField.value)
    this.coverTitle.textContent = currentBook.title
    this.coverAuthor.textContent = ` by: ${currentBook.author}`
    this.coverPages.textContent = `pages: ${currentBook.pages}`
    this.coverGenre.textContent = currentBook.genre
    this.readBtn.textContent = `Unread`
    this.deleteBtn.textContent = `X`

  }
}

function paintCover() {
  let newCover = new dynamicCoverElems

  newCover.style()
  newCover.appending()
  newCover.updateText()
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
    createBook();
    paintCover();
    closeDialogBox();
    clearForm();
  }

  const selectedGenre = target.closest("[data-genre]");
  if (selectedGenre) {
    DOM.genreField.textContent = selectedGenre.textContent;
  }

  const removeBookBtn = target.closest('[data-button = "delete"]');

  if (removeBookBtn) {
    removeBookBtn.parentElement.remove();
  }

  const status = target.closest('[data-button="unread"]');

  if (status) {
    status.classList.toggle("read");
  }
});
