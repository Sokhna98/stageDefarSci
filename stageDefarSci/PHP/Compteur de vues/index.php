<!DOCTYPE html>
 <html>
    <head>
        <title>Se connecter</title>
        <meta charset='utf-8'>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="bootstrap.min.css">
    </head>
    <body>
        <header>
            <nav class="navbar navbar-expand navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Mon site</a>
                <div class="collapse navbar-collapse" id="navbarText">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Accueil</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Menu</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Nous contacter</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="container row w-100">
            <div class="col-md-6">
                <h2>Bienvenue sur mon site</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ea laboriosam, necessitatibus est culpa soluta veritatis dolore ducimus. Accusamus laudantium nobis ex, suscipit sit cumque dolorum totam at neque possimus!</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, labore rem ut iste sequi earum laborum sunt cupiditate repellendus et ipsa at impedit id. Voluptates ullam eveniet architecto repellendus molestias.</p>
            </div>
            <form class="form-group col-md-4">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" class="form-control" id="email" placeholder="sokhnaba@gmail.com" required>
                                
                    <label for="password">Mot de passe</label>
                    <input type="password" class="form-control" id="password" placeholder="Mot de passe" required>
                </div>
                <button class="btn btn-primary" type="submit">Se connecter</button>
            </form>
        </div>
        <footer>
            <div class="col-md-10">
                <?php 
                    require_once 'compteur.php';
                    $vues =(int)ajouterVue();
                ?>
                <strong>Il y'a eu <?= $vues; ?> visite<?php if ($vues > 1): ?>s<?php endif?> sur le site.</strong>  
            </div>
        </footer>
    </body>
</html>