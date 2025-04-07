async function fetchWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        return response.json();
    } catch (error) {
        console.log("Une erreur est surevenue lors de la récupération des travaux : ", error)
    }
}

const sectionWorks = document.getElementById('portfolio')
const contentWorks = document.querySelector('section .gallery')

async function displayWorks(works) {
    try {
        /*works.map((work, i) => {
            //construction des balises figure et img
            const figure = document.createElement('figure')
            const img = document.createElement('img')

            //chargement de la valeur des attributs src de alt de img
            img.src = work.imageUrl
            img.alt = work.title

            //chargement de la valeur de figcaption
            const figcaption = document.createElement('figcaption')
            figcaption.innerHTML = work.title

            //Chargement de img dans figure
            figure.appendChild(img)
            figure.appendChild(figcaption)

            //Chargement des balises figure dans la div.gallery
            contentWorks.appendChild(figure)
        })*/
        
        for (let index = 0; index < works.length; index++) {
            //construction des balises figure et img
            const figure = document.createElement('figure')
            const img = document.createElement('img')

            //chargement de la valeur des attributs src de alt de img
            img.src = works[index].imageUrl
            img.alt = works[index].title

            //chargement de la valeur de figcaption
            const figcaption = document.createElement('figcaption')
            figcaption.innerHTML = works[index].title

            //Chargement de img dans figure
            figure.appendChild(img)
            figure.appendChild(figcaption)

            //Chargement des balises figure dans la div.gallery
            contentWorks.appendChild(figure)
            
        }
        //Chargement de la div.gallery dans la section#portfolio
        sectionWorks.appendChild(contentWorks)
    } catch (error) {
        console.log("Une erreur est surevenue lors de l'affichae des travaux : ", error)
    }
}

async function fetchCategories() {
    try {
        const response = await fetch("http://localhost:5678/api/categories")
        return response.json();
    } catch (error) {
        console.log("Une erreur est surevenue lors de la récupération des categories : ", error)
    }
}

async function displayCategories() {
    const divFilters = document.querySelector('section#portfolio .filters-content')
    
    try {
        const filters = await fetchCategories()

        //Creation du filtre Tous
        const allButton = document.createElement('button')
        allButton.textContent = 'Tous'
        allButton.classList.add('active')
        divFilters.appendChild(allButton)
        allButton.addEventListener('click', function() {
            handleClickFilter(allButton)
        })

        //Creation des autres filtres
        filters.map((filter) => {
            const button = document.createElement('button')
            button.textContent = filter.name
            divFilters.appendChild(button)
            button.addEventListener('click', function() {
                handleClickFilter(button)
            })
        })
    } catch (error) {
        console.log("Une erreur est surevenue lors de l'affichage des categories : ", error)
    }
}

async function handleClickFilter(buttonContent) {
    contentWorks.innerHTML = ''
    document.querySelectorAll('section#portfolio .filters-content button').forEach((button) => {
        button.classList.remove('active')
    })
    buttonContent.classList.add('active')
    const works = await fetchWorks()
    let filteredWorks = []
    if (buttonContent.textContent === 'Tous') {
        filteredWorks = works
    } else {
        filteredWorks = filterWorks(works, buttonContent.textContent)
    }
    displayWorks(filteredWorks)
}

function filterWorks(works, value) {
    const projects = works.filter(w => w.category.name === value)
    return projects
}

document.addEventListener('DOMContentLoaded', async function() {
    const works = await fetchWorks()
    displayCategories()
    displayWorks(works)
})