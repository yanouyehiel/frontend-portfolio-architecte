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
            divTrash.style.cursor = 'pointer'
            divTrash.addEventListener('click', function() { 
                const confirmDelete = confirm("Voulez-vous vraiment supprimer ce travail ?")
                if (confirmDelete) {
                    deleteWork(work.id)
                }
            })
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
            option.value = category.id
            option.textContent = category.name
            selectCategories.appendChild(option)
        }
    } catch (error) {
        console.log('Une erreur est survenue lors de la recuperation des categories')
    }
}


displayCategories()

async function deleteWork(id) {
    try {
        const response = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            }
        })
        if (response.ok) {
            console.log("Travail supprimé avec succès", response.json())
            window.location.reload()
        }
    } catch (error) {
        console.log("Une erreur est survenue lors de la suppression du travail : ", error)
    }
}