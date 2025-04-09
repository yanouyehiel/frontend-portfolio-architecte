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