class Calculatrice {

    constructor (operande1, operande2) {
        this.operande1 = operande1
        this.operande2 = operande2
        this.clear()
    }

    clear(){
        this.contenuOperande1 = ''
        this.contenuOperande2 = ''
        this.operation = undefined
    }

    effacer (){
        this.contenuOperande2 = this.contenuOperande2.toString().slice(0, -1)
    }

    ajouterNombre (nombre) {
        if (nombre ==='.' && this.contenuOperande2.includes('.')) return
        this.contenuOperande2 = this.contenuOperande2.toString() + nombre.toString()
    }

    choixOperation (operation){
        if (this.contenuOperande2 === '') {
            return
        }   
        if (this.contenuOperande1 !== '') {
            this.effectuerOperation()
        }
        this.operation = operation
        this.contenuOperande1 = this.contenuOperande2 + this.operation
        this.contenuOperande2 = ''
    }

    effectuerOperation(){
        let resultat
        const ope1 = parseFloat(this.contenuOperande1)
        const ope2 = parseFloat(this.contenuOperande2)
        if (isNaN(ope1) || isNaN(ope2)) return
        switch (this.operation) {
            case '+':
                resultat = ope1 + ope2
                break
            case '-':
                resultat = ope1 - ope2
                break
            case 'x':
                resultat = ope1 * ope2
                break
            case '÷':
                resultat = ope1 / ope2
                break
            default :
                return
        }
        this.contenuOperande1 = this.contenuOperande1 + this.contenuOperande2
        this.contenuOperande2 = resultat
        this.operation = undefined
    }

    affichage () {
        this.operande2.innerText = this.contenuOperande2
        this.operande1.innerText = this.contenuOperande1
    }

}

const nombres = document.querySelectorAll('#chiffre')
const operations = document.querySelectorAll('#operation')
const egal = document.querySelector('#egal')
const del = document.querySelector('#del')
const ac = document.querySelector('#ac')
const negatif = document.querySelector("#negatif")
const operande1 = document.querySelector(".element-precedent")
const operande2 = document.querySelector(".element-courant")

const calculatrice = new Calculatrice (operande1, operande2)


//Ecouteurs d'evenements
nombres.forEach(bouton => {
    bouton.addEventListener('click', () => {
        calculatrice.ajouterNombre(bouton.innerText)
        calculatrice.affichage()
    })
})

operations.forEach(bouton => {
    bouton.addEventListener('click', () => {
        calculatrice.choixOperation(bouton.innerText)
        calculatrice.affichage()
    })
})

egal.addEventListener('click', bouton => {
    calculatrice.effectuerOperation()
    calculatrice.affichage()
})

ac.addEventListener('click', bouton => {
    calculatrice.clear()
    calculatrice.affichage()
})

del.addEventListener('click', bouton => {
    calculatrice.effacer()
    calculatrice.affichage()
})

negatif.addEventListener('click', bouton => {
    calculatrice.contenuOperande2 = - calculatrice.contenuOperande2
    calculatrice.affichage()
})