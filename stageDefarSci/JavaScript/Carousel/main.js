class CarouselTouchPlugin {

    /**
    * @param {Carousel} carousel 
    */
    constructor (carousel) {
        carousel.container.addEventListener('dragstart', e => e.preventDefault() )
        carousel.container.addEventListener('mousedown', this.startDrag.bind(this))
        carousel.container.addEventListener('touchstart', this.startDrag.bind(this))
        window.addEventListener('mousemove', this.drag.bind(this))
        window.addEventListener('touchmove', this.drag.bind(this))
        window.addEventListener('touchend', this.endDrag.bind(this))
        window.addEventListener('mouseup', this.endDrag.bind(this))
        window.addEventListener('touchcancel', this.endDrag.bind(this))
        this.carousel = carousel
    }

    /**
    * Demarre le deplacement au toucher
    * @param {MouseEvent | TouchEvent} e 
    */
    startDrag (e) {
        if (e.touches) {
            if (e.touches.length > 1) {
                return
            }   else {
                e = e.touches[0]
            } 
        }
        this.origin = {x: e.screenX, y: e.screenY}
        this.width =  this.carousel.containerWidth
        this.carousel.desactiverTransition()
    }

    /**
    * Demarre le deplacement au toucher
    * @param {MouseEvent | TouchEvent} e 
    */
    drag (e) {
        if (this.origin) {
            let point = e.touches ? e.touches[0] : e
            let translate = {x: point.screenX - this.origin.x , y: point.screenY - this.origin.y}
            if (e.touches && Math.abs(translate.x) > Math.abs(translate.y)) {
                e.preventDefault()
                e.stopPropagation()
            } else if (e.touches) {
                return
            }
            let baseTranslate = this.carousel.itemCourant * -100 / this.carousel.items.length
            this.lastTranslate = translate
            this.carousel.translate(baseTranslate + 100 * translate.x / this.width)
        }
    }

    /**
    * Fin du deplacement
    * @param {MouseEvent | TouchEvent} e 
    */
    endDrag(e){
        if (this.origin && this.lastTranslate) {
            this.carousel.activerTransition()
            if (Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2) {
                if (this.lastTranslate < 0) {
                    this.carousel.next()
                } else  {
                    this.carousel.prev()
                }
            } else {
                this.carousel.allerAItem(this.carousel.itemCourant)
            }
        }
        this.origin = null
    }
}






class Carousel {

    /**
    * This callback type is called `requestCallback` and is displayed as a global symbol.
    *
    * @callback moveCallback
    * @param {number} index
    */
   
    
    /**
    * @param {HTMLElement} element 
    * @param {Object} options 
    * @param {Object} [options.nbrDeDefilement=1] Nombre d'éléments à faire défiler 
    * @param {Object} [options.slidesVisible=1] Nombre d'éléments visibles dans un slide
    * @param {boolean} [options.bouclage=false] Boucle en fin de carousel ?
    * @param {boolean} [options.navigation=true] Flèches de navigation ?
    * @param {boolean} [options.pagination=false] Boutons de pagination
    * @param {boolean} [options.infini=false] Défilement infini
    */
    constructor (element, options = {}) {
        this.element = element
        this.options = Object.assign({}, {
            nbrDeDefilement: 1,
            slidesVisible: 1,
            bouclage: false,
            navigation: false,
            pagination: false,
            infini:false
        }, options)
        if (this.options.bouclage && this.options.infini){
            throw new Error ("Un carousel ne peut etre a la fois en boucle te en infini")
        }
        let children = [].slice.call(element.children)
        this.estMobile = false
        this.itemCourant = 0
        this.moveCallbacks = []
        this.offset = 0

        // Modification du DOM
        this.root = this.creerUneDiv('carousel')
        this.container = this.creerUneDiv('carousel-container')
        this.root.setAttribute('tabindex','0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.creerUneDiv('carousel-item')
            item.appendChild(child)
            return item
        })
        if (this.options.infini) {
            this.offset = this.slidesVisible + this.options.nbrDeDefilement
            if (this.offset > children.length) {
                console.error("Vous n'avez pas assez d'elements dans le carousel", element)
            }
            this.items = [
                ...this.items.slice(this.items.length - this.offset).map(item => item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true)),
            ]
            this.allerAItem(this.offset, false)
        }
        this.items.forEach (item => this.container.appendChild(item))
        console.log(this.items)
        this.changerStyle()
        if (this.options.navigation === true) {
            this.creerNavigation()
        }
        if (this.options.pagination === true) {
            this.creerPagination()
        }

        // Evenements
        this.moveCallbacks.forEach(cb => cb (this.itemCourant))
        this.changerTailleFenetre()
        window.addEventListener('resize', this.changerTailleFenetre.bind(this))
        this.root.addEventListener('keyup', e => {
            if (e.key === 'ArrowRight' || e.key === 'Right') {
                this.next()
            } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
                this.prev()
            }
        })
        if (this.options.infini) {
            this.container.addEventListener('transitionend', this.resetInfini.bind(this))
        }
 
        new CarouselTouchPlugin(this)
    }

    /**
    * Applique les bonnes dimensions aux elements du carousel
    */
    changerStyle () {
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100) + "%"
        this.items.forEach(item => item.style.width = ( (100 / this.slidesVisible)/ratio ) + "%")
    }

    /**
    * Créer les fleches de navigation
    */
    creerNavigation () {
        let boutonNext = this.creerUneDiv('carousel-next')
        let boutonPrev = this.creerUneDiv('carousel-prev')
        this.root.appendChild(boutonNext)
        this.root.appendChild(boutonPrev)
        boutonNext.addEventListener('click', this.next.bind(this))
        boutonPrev.addEventListener('click', this.prev.bind(this))
        if (this.options.bouclage === true) {
            return
        }
        this.cacherLesBoutons (index => {
            if (index === 0) {
                boutonPrev.classList.add('carousel-prev-hidden')
            } else {
                boutonPrev.classList.remove('carousel-prev-hidden')
            }
            if (this.items[this.itemCourant + this.slidesVisible]=== undefined) {
                boutonNext.classList.add('carousel-next-hidden')
            } else {
                boutonNext.classList.remove('carousel-next-hidden')
            }
        })
    }

    /**
    * Créer les boutons de pagination
    */
    creerPagination () {
        let pagination = this.creerUneDiv('carousel-pagination')
        let buttons = []
        this.root.appendChild(pagination)
        for (let i = 0; i < (this.items.length - 2 * this.offset) ; i= i + this.options.slidesVisible) {
            let button = this.creerUneDiv('carousel-pagination-button')
            button.addEventListener('click', () => this.allerAItem(i + this.offset))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.cacherLesBoutons (index => {
            let count = this.items.length - 2 * this.offset
            let activeButton = buttons[Math.floor ((index - this.offset) % count / this.options.nbrDeDefilement)]
            if (activeButton) {
                buttons.forEach (button => button.classList.remove('carousel-pagination-button-active'))
                activeButton.classList.add('carousel-pagination-button-active')
            }
        })
    }

    translate (percent) {
        this.container.style.transform = 'translate3d('+ percent + '%, 0, 0)'
    }

    next () {
        this.estMobile ?  this.allerAItem(this.itemCourant +1) : this.allerAItem(this.itemCourant + this.options.nbrDeDefilement)
    }

    prev () {
        this.estMobile ?  this.allerAItem(this.itemCourant -1) : this.allerAItem(this.itemCourant - this.options.nbrDeDefilement)
    }

    /**
    * Déplace le carousel vers l'element ciblé
    * @param {number} index 
    * @param {boolean} [animation = true]
    */
    allerAItem(index, animation = true) {
        if (index < 0) {
            if (this.options.bouclage) {
                index = this.items.length -this.slidesVisible 
            } else  {
                return
            }
        } else if ( index >= this.items.length || (this.items[this.itemCourant + this.slidesVisible]=== undefined && index > this.itemCourant)) {
            if (this.options.bouclage) {
                index =0
            } else  {
                return
            }
        }
        let translateX = index * -100 / this.items.length
        if (animation === false) {
            this.desactiverTransition()
        }
        this.translate (translateX)
        this.container.offsetHeight //Forcer le repaint
        if (animation === false) {
            this.activerTransition()
        }
        this.itemCourant = index
        this.moveCallbacks.forEach(cb => cb(index))
    }
    /**
     * Deplace le container pour donner l'impression d'un slide infini
     */
    resetInfini () {
        if (this.itemCourant <= this.options.nbrDeDefilement) {
            this.allerAItem(this.itemCourant + (this.items.length - 2 * this.offset), false)
        }
        else if (this.itemCourant >= this.items.length - this.offset) {
            this.allerAItem(this.itemCourant - (this.items.length - 2 * this.offset), false)
        }
    }

    /**
    * Rajoute un ecouteur qui ecoute le deplacement du carousel
    * @param {moveCallback} cb 
    */
    cacherLesBoutons(cb) {
        this.moveCallbacks.push(cb)
    }

    changerTailleFenetre () {
        let mobile = window.innerWidth < 800
        if (mobile !== this.estMobile ) {
            this.estMobile = mobile
            this.changerStyle()
            this.moveCallbacks.forEach (cb => cb (this.itemCourant))
        }
    }

    /**
    * 
    * @param {string} className
    * @returns {HTMLElement}
    */
    creerUneDiv (className) {
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }

    desactiverTransition () {
        this.container.style.transition = 'none'
    }
    
    activerTransition () {
        this.container.style.transition = ''
    }

    /**
    * @returns {number}
    */
    get slidesVisible() {
        return this.estMobile ? 1 : this.options.slidesVisible
    }

    /**
    * @returns {number}
    */
    get containerWidth () {
        return this.container.offsetWidth
    }

    /**
    * @returns {number}
    */
    get carouselWidth() {
        return this.root.offsetWidth
    }

}

let onReady = function () {

    new Carousel (document.querySelector("#carousel1"), {
        slidesVisible: 3,
        nbrDeDefilement: 1,
        navigation: true,
        pagination: true,
        infini: true
    })

    new Carousel (document.querySelector("#carousel2"), {
        slidesVisible: 3,
        nbrDeDefilement: 2,
        navigation: true,
        pagination: true,
        infini: true
    })

    new Carousel (document.querySelector("#carousel3"), {
        slidesVisible: 2,
        nbrDeDefilement: 1,
        navigation: true,
        pagination: true,
        infini: true
    })
}

if (document.readyState !== 'loading') {
    onReady()
}

document.addEventListener('DOMContentLoaded', onReady)