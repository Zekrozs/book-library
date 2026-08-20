"use strict";

let DOM = {
  dialogBox: document.getElementById("dialog-box"),
  form: document.getElementById("selection-form"),
  bookGrid: document.getElementById("books"),
};

let formFields = {
  titleField: document.getElementById("book-title"),
  authorField: document.getElementById("author"),
  pagesField: document.getElementById("pages"),
  genreField: document.getElementById("selection"),
};

const bookCollection = [];

function validation(fields) {
  let isValid = true;
  const regex = /^[\p{L}\p{N}\s\-',.:!?&]+$/u;
  for (let key in fields) {
    const input = fields[key];
    let textInput = input.dataset.input;
    const parentElement = input.closest(".inputWrapper");
    const errorMessage = parentElement.querySelector(".empty");
    if (input.value.trim() === "") {
      errorMessage.textContent = "this feild is required";
      errorMessage.classList.remove("hidden");
      input.classList.add("empty-field-border");
      isValid = false;
    } else if (textInput === "text" && !regex.test(input.value.trim())) {
      errorMessage.textContent = "please enter a valid text";
      errorMessage.classList.remove("hidden");
      input.classList.add("empty-field-border");
      isValid = false;
    } else {
      errorMessage.classList.add("hidden");
      input.classList.remove("empty-field-border");
    }
  }
  return isValid;
}

function RemoveBookUi(removeBtn) {
  const bookCover = removeBtn.closest(".book-container");
  bookCover.remove();
}

function removeBookData(removeBtn) {
  const bookContainer = removeBtn.closest(".book-container");
  const bookId = bookContainer.id
  const bookData = bookCollection.find((book) => book.id === bookId);
  const dataIndex = bookCollection.indexOf(bookData);
  bookCollection.splice(dataIndex, 1);
}

function confirmDeletion() {
  return confirm("are you sure ?");
}

function bookState(statusBtn) {
  if(statusBtn.dataset.status === 'unread'){
    statusBtn.dataset.status = 'read'
  } else if(statusBtn.dataset.status === 'read'){
      statusBtn.dataset.status = 'unread'
  }
}

function toggleStateUi(statusBtn){
  let state = statusBtn.dataset.status
  if(state === 'unread'){
  statusBtn.classList.remove('read')
  statusBtn.textContent = 'unread'
} else  if(state === 'read'){
  statusBtn.classList.add('read')
  statusBtn.textContent = 'read'
}}

function clearForm() {
  DOM.form.reset();
  for (let key in formFields) {
    const input = formFields[key];
    const parentElement = input.closest(".inputWrapper");
    const errorMessage = parentElement.querySelector(".empty");
    input.classList.remove("empty-field-border");
    errorMessage.classList.add("hidden");
  }
}

function closeDialogBox() {
  DOM.dialogBox.close();
}

function openDialog() {
  DOM.dialogBox.showModal();
}

class book {
  constructor(title, author, pages, genre,id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.genre = genre;
    this.id = id
  }
}
function createBook(title, author, pages, genre, id) {
  const newBook = new book(title, author, pages, genre,id);
  bookCollection.push(newBook);
  return newBook;
}

function handleFormSubmit() {
  const newBookData = createBook(
    formFields.titleField.value.trim(),
    formFields.authorField.value.trim(),
    formFields.pagesField.value.trim(),
    formFields.genreField.value.trim(),
    crypto.randomUUID()
  );
  paintCover(newBookData);
}

class dynamicCoverElems {
  constructor() {
    this.bookCover = document.createElement("div");
    this.bookInfo = document.createElement("div");
    this.title = document.createElement("h3");
    this.author = document.createElement("p");
    this.pages = document.createElement("p");
    this.genre = document.createElement("p");
    this.readBtn = document.createElement("button");
    this.deleteBtn = document.createElement("button");
  }

  style(freshBookData) {
    this.bookCover.classList.add("book-container");
    this.bookCover.id = freshBookData.id
    this.bookInfo.classList.add("book");
    this.title.classList.add("book-title");
    this.author.classList.add("info");
    this.pages.classList.add("info");
    this.genre.classList.add("info");
    this.readBtn.classList.add("btn", "status");
    this.readBtn.dataset.status = "unread";
    this.deleteBtn.classList.add("btn", "remove-book-button");
    this.deleteBtn.dataset.button = "delete";
  }

  appending() {
    this.bookInfo.append(this.title, this.author, this.pages, this.genre);
    this.bookCover.append(this.bookInfo, this.deleteBtn, this.readBtn);
    DOM.bookGrid.appendChild(this.bookCover);
  }

  updateText(freshBookData) {
    for (let key in freshBookData) {
      if(key === 'id'){
        continue;
      }
      if (key === "pages") {
        this[key].textContent = `Pages: ${freshBookData[key]}`;
      } else if (key === "author") {
        this[key].textContent = `By: ${freshBookData[key]}`;
      } else {
        this[key].textContent = freshBookData[key];
      }
    }

    this.readBtn.textContent = `Unread`;
    this.deleteBtn.textContent = `X`;
  }
}

function paintCover(freshBookData) {
  let newCover = new dynamicCoverElems();
  newCover.style(freshBookData);
  newCover.appending();
  newCover.updateText(freshBookData);
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
    const validated = validation(formFields);
    if (!validated) return;
    handleFormSubmit();
    closeDialogBox();
    clearForm();
  }

  const selectedGenre = target.closest("[data-genre]");
  if (selectedGenre) {
    formFields.genreField.value = selectedGenre.textContent;
  }

  const removeBookBtn = target.closest('[data-button = "delete"]');

  if (removeBookBtn) {
    const confirmation = confirmDeletion();
    if (!confirmation) return;
    RemoveBookUi(removeBookBtn);
    removeBookData(removeBookBtn);
  }

  const status = target.closest('[data-status]');

  if (status) {
    bookState(status);
    toggleStateUi(status)
  }
});

document.addEventListener("input", (e) => {
  const target = e.target;

  let inputField = target.closest("[data-input]");
  if (inputField) {
    validation(formFields);
  }
})
