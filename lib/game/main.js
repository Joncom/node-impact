ig.module(
	'game.main'
)
.requires(
    'plugins.node',
    'game.levels.field',
    'game.entities.drone'
)
.defines(function() {

    MyGame = ig.Game.extend({
        tickTimer: new ig.Timer(1),
        init: function() {
            this.loadLevel(LevelField);
            ig.game.spawnEntity(EntityDrone, 0, 0);
        },

        update: function() {
            this.parent();

            // Output heartbeat so we know the game is running.
            if(this.tickTimer.delta() >= 0) {
                this.tickTimer.reset();
                console.log("Tick");
            }
        }
    });

    ig.main('#canvas', MyGame, 60, 320, 240, 2);

});
