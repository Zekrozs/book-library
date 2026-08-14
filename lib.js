    'use strict'

let DOM = {
    openDialog: document.getElementById('open-dialog'),
    window: document.getElementById('main-page'),
    dialogBox: document.getElementById('dialog-box')
}








  
  
    DOM.window.addEventListener('click', e => {
        const target = e.target

        const dialogBtn = target.closest('[data-button="open-dialog"]')

        if (dialogBtn){
            DOM.dialogBox.showModal()
        }
        
   
    })