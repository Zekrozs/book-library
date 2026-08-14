"use strict";

let DOM = {
  dialogBox: document.getElementById("dialog-box"),
  form: document.getElementById("selection-form"),
  genreField: document.getElementById("selection")
};


function clearForm(){
  DOM.form.reset();
  DOM.genreField.textContent = ''
}

function resetForm(){
    DOM.dialogBox.close();
}

function openDialog(){
  DOM.dialogBox.showModal();
}


DOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
});

document.addEventListener("click", (e) => {
  const target = e.target;

  const dialogBtn = target.closest('[data-button="open-dialog"]');

  if (dialogBtn) {
    openDialog()
  }

  const closeDialog = target.closest('[data-button="cancel"]');
  if (closeDialog) {
    clearForm()
    resetForm()
  }

  const selectedGenre = target.closest('[data-genre]')
  if(selectedGenre){
    DOM.genreField.textContent = selectedGenre.textContent
  }
});
