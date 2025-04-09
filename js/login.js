const form = document.querySelector('form')
const email = document.querySelector('input#email')
const password = document.querySelector('input#password')

form.addEventListener('submit', async function(e) {
    e.preventDefault()
    const payload = {
        email: email.value,
        password: password.value
    }

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        })
        
        const data = await response.json()
        if (response.status === 404) { //not found
            alert("L'utilisateur n'existe pas")
        } else if (response.status === 401) { //unauthorized
            alert("Mot de passe incorrect")
        } else if (response.status === 200) { //ok
            localStorage.setItem('token', data?.token)
            window.location.replace('index.html')
        }
    } catch (error) {
        console.log('une erreur est survenue lors de la connexion : ', error)
    }
})