class Portfolio {

    /**
     * @param {string} selector 
     */
    constructor (selector){
        this.activeContent = null
        this.activeItem = null
        this.container = document.querySelector(selector)
        if (this.container == null) {
            throw new Error ("L'element @{selector} n'existe pas")
        }
        this.children = Array.prototype.slice.call(this.container.querySelectorAll('.js-item'))
        this.children.forEach ((child) => {
            child.addEventListener ('click', (e) => {
                e.preventDefault()
                this.show (child)
           })
        })
    }


    /**
    * Afficher le contenu d'un element 
    * @param {HTMLElement} content 
    */
    show (child) {
        let offset = 0
        if (this.activeContent !== null){
            this.slideUp(this.activeContent)
            if (this.activeContent.offsetTop < child.offsetTop) {
                offset = this.activeContent.offsetHeight
            }
        }
        if (this.activeItem === child) {
            this.activeContent = null
            this.activeItem = null
        } 
        else{
            let content = child.querySelector('.js-body').cloneNode(true)
            child.after (content)
            this.slideDown(content)
            this.scrollTo(child, offset)
            this.activeContent = content
            this.activeItem = child
        }
    }


    /**
    * Afficher l'element avec un effet d'animation
    * @param {HTMLElement} content 
    */
    slideDown (element) {
        let height = element.offsetHeight
        element.style.height = '0px' 
        element.style.transitionDuration = '.5s'
        element.offsetHeight 
        element.style.height = height + 'px'
        window.setTimeout (function () {
            element.style.height = null
        }, 500)
    }


    /**
    * Masquer un element avec un effet d'animation
    * @param {HTMLElement} content 
    */
    slideUp (element) {
        let height = element.offsetHeight        
        element.style.height = height + 'px'
        element.offsetHeight
        element.style.height = '0px' 
        window.setTimeout (function () {
            element.parentNode.removeChild(element)
        }, 500)
    }


    /**
    * Fait defiler la fenetre jusqu'a l'element
    * @param {NHTMLElement} element
    * @param {int} offset
    */
    scrollTo (element, offset = 0) {
        window.scrollTo ({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop - offset
        })
    }
}

new Portfolio('#js-portfolio-1')
new Portfolio('#js-portfolio-2') 