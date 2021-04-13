// Definition des variables
let musique_courante = document.querySelector(".musique-courante");
let icone_musique = document.querySelector(".icone-musique");
let nom_musique = document.querySelector(".nom-musique");
let nom_chanteur = document.querySelector(".nom-chanteur");

let playpause_btn = document.querySelector(".musique-en-pause");
let next_btn = document.querySelector(".musique-suivante");
let prev_btn = document.querySelector(".musique-precedente");

let defiler_musique = document.querySelector(".defiler-musique");
let defiler_volume = document.querySelector(".defiler-volume");
let temps_courant = document.querySelector(".temps-courant");
let duree_totale = document.querySelector(".duree-totale");

let index_musique = 0;
let isPlaying = false;
let updateTimer;

let musique_en_cours = document.createElement('audio');

// Liste de musiques 
let liste_musiques = [
    {
        name: "Faramareen",
        artist: "Wally B. Seck",
        image: "images/wally.jpg",
        path: "sons/wally.mp4"
    },
    {
        name: "Bukki yi",
        artist: "Youssou Ndour",
        image: "images/youssoundour.jpg",
        path: "sons/youssoundour.mp4"
    },
    {
        name: "Retro",
        artist: "Thione B. Seck",
        image: "images/thione.jpg",
        path: "sons/thione.mp4",
    },
    {
        name: "Musico",
        artist: "Titi",
        image: "images/titi.jpg",
        path: "sons/titi.mp4",
    },
    {
        name: "Deliya",
        artist: "Baba Maal",
        image: "images/babamaal.jpg",
        path: "sons/babamaal.mp4",
    },
    {
        name: "Téré Doundou",
        artist: "Viviane ndour",
        image: "images/viviane.jpg",
        path: "sons/viviane.mp4",
    }
]


// Fonctions

function chargerMusique(index_musique) {
    clearInterval(updateTimer);
    initialiserValeurs();
    
    musique_en_cours.src = liste_musiques[index_musique].path;
    musique_en_cours.load();
    
    icone_musique.style.backgroundImage = "url(" + liste_musiques[index_musique].image + ")";
    nom_musique.textContent = liste_musiques[index_musique].name;
    nom_chanteur.textContent = liste_musiques[index_musique].artist;
    musique_courante.textContent = "Sokhna's PlayList " + (index_musique + 1) + " SUR " + liste_musiques.length;
    
    updateTimer = setInterval(modifierDefilement, 1000);
    
    musique_en_cours.addEventListener("ended", nextMusique);
    
    couleurPageAleatoire();
}
    
function couleurPageAleatoire() {
    let red = Math.floor(Math.random() * 256) + 64;
    let green = Math.floor(Math.random() * 256) + 64;
    let blue = Math.floor(Math.random() * 256) + 64;
    
    let couleur = "rgb(" + red + ", " + green + ", " + blue + ")";

    document.body.style.background = couleur;
}
    
function initialiserValeurs() {
    temps_courant.textContent = "00:00:00";
    duree_totale.textContent = "00:00:00";
    defiler_musique.value = 0;
    defiler_volume.value = 100
}

function pauseOrPlayMusique() {
    if (!isPlaying) playMusique();
    else pauseMusique();
}
    
function playMusique() {
    musique_en_cours.play();
    isPlaying = true;

    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
    
function pauseMusique() {
    musique_en_cours.pause();
    isPlaying = false;
    
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}
        
function nextMusique() {
    if (index_musique < liste_musiques.length - 1)
        index_musique += 1;
    else index_musique = 0;
    
    chargerMusique(index_musique);
    playMusique();
}
        
function prevMusique() {
    if (index_musique > 0)
        index_musique -= 1;
    else index_musique = liste_musiques.length;
        
    chargerMusique(index_musique);
    playMusique();
}
        
function bouger() {
    aller_a = musique_en_cours.duration * (defiler_musique.value / 100);    
    musique_en_cours.currentTime = aller_a;
}
            
function changerVolume() {
    musique_en_cours.volume = defiler_volume.value / 100;
}
            
function modifierDefilement() {

    let seekPosition = 0;
    
    if (!isNaN(musique_en_cours.duration)) {
        seekPosition = musique_en_cours.currentTime * (100 / musique_en_cours.duration);
        defiler_musique.value = seekPosition;
    
        let heures_courantes = Math.floor(musique_en_cours.currentTime / 3600);
        let reste = musique_en_cours.currentTime % 3600
        let minutes_courantes = Math.floor(reste / 60);
        let secondes_courantes = Math.floor(reste % 60)

        let heures_totales = Math.floor(musique_en_cours.duration / 3600);
        let reste2 = musique_en_cours.duration % 3600
        let minutes_totales = Math.floor(reste2 / 60);
        let secondes_totales = Math.floor(reste2 % 60)

        if (secondes_courantes < 10) { secondes_courantes = "0" + secondes_courantes; }
        if (secondes_totales < 10) { secondes_totales = "0" + secondes_totales; }
        if (minutes_courantes < 10) { minutes_courantes = "0" + minutes_courantes; }
        if (minutes_totales < 10) { minutes_totales = "0" + minutes_totales; }
        if (heures_courantes < 10) { heures_courantes = "0" + heures_courantes; }
        if (heures_totales < 10) { heures_totales = "0" + heures_totales; }
    
        temps_courant.textContent = heures_courantes + ":" + minutes_courantes + ":" + secondes_courantes;
        duree_totale.textContent = heures_totales + ":" + minutes_totales + ":" + secondes_totales;
    }
}
            
chargerMusique(index_musique);
