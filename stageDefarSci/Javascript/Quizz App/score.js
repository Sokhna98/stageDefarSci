const ul = document.getElementById('listeScores')
const high_scores = JSON.parse(localStorage.getItem('highScores'))

ul.innerHTML = 
    high_scores.map (score => {
        return `<li class="li-score">${score.name}: ${score.score}</li>`
    }).join("")