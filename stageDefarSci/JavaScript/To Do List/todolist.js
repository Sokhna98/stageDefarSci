const saisir = document.querySelector('.input')
const boutonAjouter = document.querySelector('.bouton-ajouter')
const listeTaches = document.querySelector('.liste-taches')
const filtrerTaches = document.querySelector('.filtrer-taches')

document.addEventListener('DOMContentLoaded', recupererTaches)
boutonAjouter.addEventListener('click',ajouterTache)
listeTaches.addEventListener('click', actionsTaches)
filtrerTaches.addEventListener('click', filtrerTache)

//Ajouter une tache
function ajouterTache(event) {
    //Prevent from submitting
    event.preventDefault()

    //Creer une div
    const creerDiv = document.createElement('div')
    creerDiv.classList.add('todo')

    //Creer une tache li et l'ajouter dans la div
    const nouvelleTache = document.createElement('li')
    nouvelleTache.innerText = saisir.value
    nouvelleTache.classList.add('todo-item')
    creerDiv.appendChild(nouvelleTache)

    //Ajouter la la tache dans le local storage
    enregistrerLocalStorage(saisir.value)

    //Creer un bouton 'tache terminee' li et l'ajouter dans la div
    const tacheComplete = document.createElement('button')
    tacheComplete.innerHTML = '<i class = "fas fa-check" ></i>'
    tacheComplete.classList.add('tache-complete')
    creerDiv.appendChild(tacheComplete)

    //Creer un bouton 'supprimer tache' li et l'ajouter dans la div
    const boutonSupprimer = document.createElement('button')
    boutonSupprimer.innerHTML = '<i class = "fas fa-trash" ></i>'
    boutonSupprimer.classList.add('bouton-supprimer')
    creerDiv.appendChild(boutonSupprimer)

    //Ajouter la div dans la liste
    listeTaches.appendChild(creerDiv)
    
    //Reinitialiser l'input
    saisir.value = ''
}

//Tache terminee et Supprimer une tache
function actionsTaches (event) {
    const item = event.target

    //Supprimer une tache
    if (item.classList[0]==='bouton-supprimer') {
        const todo = item.parentElement
        todo.classList.add('transitionSupprimer')
        effacerLocalStorage(todo)
        todo.addEventListener('transitionend', function(){
            todo.remove()
        })
    }

    //Marquer une tache comme terminee
    if (item.classList[0]==='tache-complete') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }

}

//Afficher les taches
function filtrerTache(event) {
    const todos = listeTaches.childNodes
    todos.forEach(function (todo){
        switch (event.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'completed':
                if (todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if (!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    }) 
}

//Enregistrer les taches dans le stockage local
function enregistrerLocalStorage (todo) {
    //Verifier s<il y'a deja des taches crees
    let todos 
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

//Recuperer les taches dans le stockage local
function recupererTaches (){
    //Verifier s<il y'a deja des taches crees
    let todos
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function (todo){
        //Creer une div
        const creerDiv = document.createElement('div')
        creerDiv.classList.add('todo')

        //Creer une tache li et l'ajouter dans la div
        const nouvelleTache = document.createElement('li')
        nouvelleTache.innerText = todo
        nouvelleTache.classList.add('todo-item')
        creerDiv.appendChild(nouvelleTache)

        //Creer un bouton 'tache terminee' li et l'ajouter dans la div
        const tacheComplete = document.createElement('button')
        tacheComplete.innerHTML = '<i class = "fas fa-check" ></i>'
        tacheComplete.classList.add('tache-complete')
        creerDiv.appendChild(tacheComplete)

        //Creer un bouton 'supprimer tache' li et l'ajouter dans la div
        const boutonSupprimer = document.createElement('button')
        boutonSupprimer.innerHTML = '<i class = "fas fa-trash" ></i>'
        boutonSupprimer.classList.add('bouton-supprimer')
        creerDiv.appendChild(boutonSupprimer)

        //Ajouter la div dans la liste
        listeTaches.appendChild(creerDiv)
    })
}

//Effacer une tache dans le stockage local
function effacerLocalStorage (todo) {
    let todos 
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    let index = todos.indexOf(todo.children[0].innerHTML)
    todos.splice(index, 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}