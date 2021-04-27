<?php

    function ajouterVue (): string {
        $fichier = dirname(__FILE__) . DIRECTORY_SEPARATOR . "compteur" ;
        $fichier2 = $fichier . '-' . date ('Y-m-d');
        incrementerContenuFichier($fichier);
        incrementerContenuFichier($fichier2);
        return file_get_contents($fichier);
    }

    function incrementerContenuFichier ($fichier) : void{
        $compteur = 1;
        if (file_exists($fichier)) {
            $compteur = (int)file_get_contents($fichier);
            $compteur++;   
        }
        file_put_contents($fichier, $compteur);
    }

?>