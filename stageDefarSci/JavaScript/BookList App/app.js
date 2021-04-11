class Livre {
    constructor (titre, autheur, isbn) {
        this.titre = titre
        this.autheur = autheur
        this.isbn = isbn
    }
}

class UI {
    static afficherLivres () {
        const livres = Enregistrer.recupererLivres()
        livres.forEach((livre) => UI.ajouterLivre(livre))
    }

    static ajouterLivre (livre) {
        const liste = document.querySelector('#book-list')
        const ligne = document.createElement('tr')
        ligne.innerHTML = ` <td>${livre.titre}</td>
                            <td>${livre.autheur}</td>
                            <td>${livre.isbn}</td>
                            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

        `
        liste.appendChild(ligne)
    }

    static supprimerLivre (element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove()
        }
    }

    static alerter (message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        container.insertBefore(div, form)

        setTimeout(() => document.querySelector('.alert').remove(), 2000)
    }

    static effacerChamps() {
        document.querySelector('#titre').value = ''
        document.querySelector('#autheur').value = ''
        document.querySelector('#isbn').value = ''
    }
}

class Enregistrer {
    static recupererLivres () {
        let livres
        if (localStorage.getItem('livres')===null) {
            livres = []
        } else {
            livres = JSON.parse(localStorage.getItem('livres'))
        }
        return livres
    }

    static ajouterLivre (livre) {
        const livres = Enregistrer.recupererLivres()
        livres.push(livre)
        localStorage.setItem('livres', JSON.stringify(livres))
    }

    static supprimerLivre (isbn) {
        const livres = Enregistrer.recupererLivres()
        livres.forEach((livre, index) => {
            if (livre.isbn === isbn) {
                livres.splice(index, 1)
            }
        })
        localStorage.setItem('livres', JSON.stringify(livres))
    }
}

document.addEventListener('DOMContentLoaded', UI.afficherLivres)

const formulaire = document.querySelector('#book-form')
formulaire.addEventListener('submit', (e) => {
    e.preventDefault()

    const titre = document.querySelector('#titre').value
    const autheur = document.querySelector('#autheur').value
    const isbn = document.querySelector('#isbn').value

    if (titre ==='' || autheur === '' || isbn === '') {
        UI.alerter ('Veuillez remplir tous les champs !', 'danger')
    } else {
        const livre = new Livre (titre, autheur, isbn)
        UI.ajouterLivre(livre)
        UI.alerter('Livre ajouté !', 'success')
        UI.effacerChamps()
        Enregistrer.ajouterLivre(livre)
    }

})

const liste = document.querySelector('#book-list')
liste.addEventListener('click', (e) => {
    UI.supprimerLivre(e.target)
    UI.alerter('Livre supprimé !', 'success')
    const isbn = e.target.parentElement.previousElementSibling.textContent
    console.log(isbn)
    Enregistrer.supprimerLivre(isbn)
})