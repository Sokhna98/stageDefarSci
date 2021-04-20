const question = document.getElementById('question')
const reponses = Array.from(document.getElementsByClassName('texte'))
let compteur_question = document.getElementById('compteur-question')
let compteur_score = document.getElementById('compteur-score')
let barre_de_progression = document.getElementById('barre-de-progression')

let questionCourante = {}
let acceptingAnswers = false
let score = 0
let numeroQuestion = 0
let questionsRestantes = []

let questions = [
    {
        question: "Quel animal est le roitelet ?",
        choix1: "Un félin",
        choix2: "Un oiseau",
        choix3: "Un canidé",
        choix4: "Un poisson",
        reponse: "2"
    },
    {
        question: "De quel État Ouagadougou est la capitale ?",
        choix1: "Burundi",
        choix2: "Togo",
        choix3: "Burkina Faso",
        choix4: "Niger",
        reponse: "3"
    },
    {
        question: "Parmi les termes suivants, lequel est féminin ?",
        choix1: "Entracte",
        choix2: "Entête",
        choix3: "Emblème",
        choix4: "Équivoque",
        reponse: "4"
    },
    {
        question: 'Qui étatit surnommé le "Renard du désert" ?',
        choix1: "Adolf von Loos",
        choix2: "Erwin Rommel",
        choix3: "George Patton",
        choix4: "Douglas MacArthur",
        reponse: "2"
    },
    {
        question: 'Quel pays a remporté la coupe du monde de Football en 2014 ?',
        choix1: "Le Brésil",
        choix2: "L'Italie",
        choix3: "L'Argentine",
        choix4: "L'Allemagne",
        reponse: "4"
    },
    {
        question: "Par quel mot désigne-t-on une belle-mère cruelle ?",
        choix1: "Une maratre",
        choix2: "Un chenapan",
        choix3: "Une godiche",
        choix4: "Une jocrisse",
        reponse: "1"
    },
    {
        question: 'Qui était le dieu de la guerre dans la mythologie grecque ?',
        choix1: "Hadès",
        choix2: "Apollon",
        choix3: "Arès",
        choix4: "Hermès",
        reponse: "3"
    } 
]


const correct_bonus = 10
const max_questions = questions.length

function startGame () {
    numeroQuestion = 0;
    score = 0;
    questionsRestantes = [...questions]
    questionSuivante()
}

function questionSuivante () {
    if (questionsRestantes.length === 0 || numeroQuestion >= max_questions) {
        localStorage.setItem('scoreRecent', compteur_score.innerText)
        return window.location.assign("./end.html")
    }

    numeroQuestion++
    compteur_question.innerText = 'Question: ' + numeroQuestion + '/' + max_questions
    barre_de_progression.style.width = (100 / questions.length * numeroQuestion)+'%'
    const questionIndex = Math.floor(Math.random()*questionsRestantes.length)
    questionCourante = questionsRestantes[questionIndex]
    question.innerText = questionCourante.question

    reponses.forEach((choix) => {
        const nbr = choix.dataset['number']
        choix.innerText = questionCourante['choix'+nbr]
    })

    questionsRestantes.splice(questionIndex, 1)
    acceptingAnswers = true
} 

reponses.forEach((choix) => {
    choix.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const choixSelectionne = e.target
        const reponseSelectionnee = choixSelectionne.dataset['number']
        const nomClasse = reponseSelectionnee === questionCourante.reponse ? 'correct' : 'incorrect'
        if (nomClasse==='correct') {
            incrementerScore(correct_bonus)
        }
        choixSelectionne.parentElement.classList.add(nomClasse) 
        setTimeout (() => {
        choixSelectionne.parentElement.classList.remove(nomClasse)
            questionSuivante()
        }, 1000)
    })
})

function incrementerScore (nombre) {
    compteur_score.innerText = parseInt(compteur_score.innerText) + nombre
}

startGame()