"use strict";

let DOM = {
  dialogBox: document.getElementById("dialog-box"),
  form: document.getElementById("selection-form"),

};


function clearForm(){
  DOM.form.reset()
}

function cancel(){
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
    cancel()
  }
});
