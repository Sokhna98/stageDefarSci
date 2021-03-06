/** 
var button = document.querySelector('.spoiler button')
button.addEventListener('click', function(){
    this.nextElementSibling.classList.add('visible')
    this.parentNode.removeChild(this)
})

**/

(function(){
    var elements = document.querySelectorAll('.spoiler')
    var createSpoilerButton = function (element) {

        /* Creer la span.spoiler-content*/
        var span = document.createElement('span')
        span.className = "spoiler-content"
        span.innerHTML = element.innerHTML

        /*Creer le bouton */
        var button = document.createElement('button')   
        button.textContent = 'Afficher le spoiler'

        /*Ajouter les elemnets a DOM */
        element.innerHTML = ''
        element.appendChild(button)
        element.appendChild(span)

        /*On ecoute le bouton */
        button.addEventListener('click', function(){
            button.parentNode.removeChild(button)
            span.classList.add('visible')
        })
    }
    for (var i=0; i < elements.length; i++) {
        createSpoilerButton (elements[i])
    }
})()