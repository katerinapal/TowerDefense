
    
        import jquery from ".\\jquery.js";
        import { TowerDefense } from ".\\js\\TowerDefense.js";

        var game = new TowerDefense($('canvas')[0])

        $('#weapons #machine-gun').click(function()
        {
            game.beginPlaceObject(TowerDefense.newTurret(game, 2, 5));
        });

        $('#weapons #heavy-cannon').click(function()
        {
            game.beginPlaceObject(TowerDefense.newTurret(game, 2, 15));
        });

        $('#weapons #wall').click(function()
        {
            game.beginPlaceObject(TowerDefense.newWall(game));
        });

        $('#weapons #explode').click(function() 
        {
            game.addExplosion();
        });

        $('#pause').click(game.pause);
        $('#resume').click(game.run);
    