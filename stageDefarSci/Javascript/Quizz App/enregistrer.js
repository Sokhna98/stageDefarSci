const enregistrer = document.getElementById('save')
const input = document.getElementById('user')

input.addEventListener('keyup', function (){
    if (input.value === '') {
        enregistrer.disabled = true
    } else {
        enregistrer.disabled = false
    }
})

enregistrer.addEventListener('click', function () {
    const score = {
        name: input.value,
        score: localStorage.getItem('mostRecentScore')
    }
    let high_scores
    if (localStorage.getItem('highScores')===null) {
        high_scores = []
    } else {
        high_scores = JSON.parse(localStorage.getItem('highScores'))
    }
    high_scores.push(score)
    high_scores.sort((a, b) => b.score - a.score)
    localStorage.setItem('highScores', JSON.stringify(high_scores))
    input.value = ''
    window.location.assign('./index.html')
})
