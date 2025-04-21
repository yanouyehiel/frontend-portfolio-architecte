const buttonSubmit = document.querySelector('input#add-picture')
const titleForm = document.querySelector('input#title-form')
const formAddPicture = document.querySelector('form.form-add-picture')
const customDiv = document.querySelector('div.card-import');
const fileInput = document.getElementById('fileInput');
const previewCard = document.querySelector('div.preview-card');

customDiv.addEventListener('click', () => {
    fileInput.click();
});

// Gérer la sélection de fichier
fileInput.addEventListener('change', function() {
    if (!this.files || !this.files[0]) return;

    const file = this.files[0];
    const reader = new FileReader();

    // Vérification du type MIME
    if (!file.type.match('image.*')) {
        alert('Veuillez sélectionner une image valide');
        return;
    }

    reader.onload = function(e) {
        customDiv.style.backgroundImage = `url(${e.target.result})`;
        previewCard.style.display = 'none';
        customDiv.style.transition = 'background-image 0.3s ease';
    };

    reader.readAsDataURL(file);
});

// Réinitialiser si aucun fichier
customDiv.addEventListener('dragover', e => e.preventDefault());
customDiv.addEventListener('drop', e => {
    e.preventDefault();
    fileInput.files = e.dataTransfer.files;
    fileInput.dispatchEvent(new Event('change'));
});


formAddPicture.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    if(!fileInput.files[0]) {
        alert('Veuillez sélectionner une image');
        return;
    }

    const reader = new FileReader();
    reader.readAsBinaryString(fileInput.files[0]);
    
    reader.onload = async () => {
        const base64Image = btoa(reader.result);
        await submitNewWork(
            base64Image, 
            titleForm.value, 
            parseInt(selectCategories.value)
        );
    };
});

async function submitNewWork(imageBase64, title, category) {
    try {
        const payload = {
            image: imageBase64,
            title,
            category: Number.isInteger(category) ? category : parseInt(category)
        };
        console.log('Payload:', payload);
        const response = await fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(token)}`
            },
            body: JSON.stringify(payload)
        });

        if(!response.ok) throw new Error(await response.text());
        
        const data = await response.json();
        console.log('Réponse du serveur:', data);
        contentModal2.classList.add('visible');
        window.location.reload();
        
    } catch (error) {
        console.error('Erreur:', error.message?.error);
        alert('Échec de l\'envoi : ' + error.message);
    }
}
