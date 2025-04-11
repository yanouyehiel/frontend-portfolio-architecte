const contentModal2 = document.querySelector('.modal2')
const buttonAddPicture = document.querySelector('button#addPicture')
const buttonFermerModal2 = document.querySelector('.fermer-2')
buttonAddPicture.addEventListener('click', function() {
    contentModal2.classList.add('visible')
})
buttonFermerModal2.addEventListener('click', () => {
    contentModal2.classList.remove('visible')
})