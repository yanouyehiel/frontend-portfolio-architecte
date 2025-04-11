async function fetchModalWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        return response.json();
    } catch (error) {
        console.log("Une erreur est surevenue lors de la récupération des travaux : ", error)
    }
}

const sectionModalWorks = document.getElementById('modal-contenu')
const contentModalWorks = document.querySelector('section .gallery-modal')

async function displayModalWorks(works) {
    try {
        works.map((work, i) => {
            //construction des balises figure et img
            const figure = document.createElement('figure')
            const img = document.createElement('img')

            //chargement de la valeur des attributs src de alt de img
            img.src = work.imageUrl
            img.alt = work.title

            //Creation du contenu de la poubelle
            const divTrash = document.createElement('div')
            divTrash.classList.add('trash')
            const iContent = document.createElement('i')
            iContent.classList.add('fa')
            iContent.classList.add('fa-trash-o')
            divTrash.appendChild(iContent)

            //Chargement de img dans figure
            figure.appendChild(img)
            figure.appendChild(divTrash)

            //Chargement des balises figure dans la div.gallery
            contentModalWorks.appendChild(figure)
        })
    
        //Chargement de la div.gallery dans la section#portfolio
        sectionModalWorks.innerHTML = ''
        sectionModalWorks.appendChild(contentModalWorks)
    } catch (error) {
        console.log("Une erreur est surevenue lors de l'affichae des travaux : ", error)
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const works = await fetchModalWorks()
    displayModalWorks(works)
})

async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories")
        return response.json();
    } catch (error) {
        console.log("Une erreur est surevenue lors de la récupération des categories : ", error)
    }
}

const contentModal2 = document.querySelector('.modal2')
const buttonAddPicture = document.querySelector('button#addPicture')
const buttonFermerModal2 = document.querySelector('.fermer-2')
buttonAddPicture.addEventListener('click', function() {
    contentModal2.classList.add('visible')
})
buttonFermerModal2.addEventListener('click', () => {
    contentModal2.classList.remove('visible')
})

const selectCategories = document.querySelector('select#categories')

async function displayCategories() {
    selectCategories.innerHTML = ''
    const option = document.createElement('option')
    option.textContent = 'Selectionner une categorie'
    selectCategories.appendChild(option)
    try {
        const categories = await fetchCategories()
        for (let i = 0; i < categories.length; i++) {
            const category = categories[i];
            const option = document.createElement('option')
            option.value = category.name
            option.textContent = category.name
            selectCategories.appendChild(option)
        }
    } catch (error) {
        console.log('Une erreur est survenue lors de la recuperation des categories')
    }
}


displayCategories()

const buttonSubmit = document.querySelector('input#add-picture')
const titleForm = document.querySelector('input#title-form')
const formAddPicture = document.querySelector('form.form-add-picture')

formAddPicture.addEventListener('submit', async function(e) {
    e.preventDefault()
    const title = titleForm.value
    const selectedValue = selectCategories.value
    await submitNewWork('', title, selectedValue)
})

async function submitNewWork(image, title, category) {
    try {
        const payload = {image, title, category}
        const response = fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        const data = await response.json()
        if (data) {
            contentModal2.classList.add('visible')
            window.location.reload()
        }
    } catch (error) {
        
    }
}