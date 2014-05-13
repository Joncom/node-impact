ig.module('game.entities.drone')
.requires(
    'impact.entity'
)
.defines(function() {

    EntityDrone = ig.Entity.extend({

        timer: null,

        init: function(x, y, settings) {
            this.parent(x, y, settings);

            // Set entity in motion.
            this.vel.x = 16;
            this.vel.y = 16;

            this.timer = new ig.Timer(1);
        },

        update: function() {
            this.parent();
            if(this.timer.delta() >= 0) {
                this.timer.reset();
                console.log(
                    "Drone " + this.id +
                    " is at x=" + this.pos.x.round() +
                    ", y=" + this.pos.y.round() + ".");
            }
        }

    });

});
