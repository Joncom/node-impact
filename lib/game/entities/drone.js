ig.module('game.entities.drone')
.requires(
    'plugins.node'
)
.defines(function() {

    EntityDrone = ig.Entity.extend({
        size: { x: 32, y: 32 },
        speed: 20,
        timer: null,
        freq: 1,
        init: function(x, y, settings) {
            this.parent(x, y, settings);

            var self = this;
            var half = this.speed / 2;
            this.moveInterval = setInterval(function() {
                self.vel.x = Math.floor(Math.random() * self.speed - half);
                self.vel.y = Math.floor(Math.random() * self.speed - half);
            }, 2000);

            this.timer = new ig.Timer(1/this.freq);
        },
        kill: function() {
            this.parent();
            clearInterval(this.moveInterval);
        },
        update: function() {
            this.parent();
            if(this.timer.delta() >= 0) {
                this.timer.reset();
                console.log("Drone " + this.id + " says hi.");
            }
        }
    });

});
