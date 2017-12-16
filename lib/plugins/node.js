ig.module(
    'plugins.node'
)
.requires(
    'impact.game', // FIXME: Shouldn't this be "impact.impact"?
    'impact.loader'
)
.defines(function() {

    // No need to load images, etc.
    ig.Loader.inject({
        load: function() {
            ig.system.setGame(this.gameClass);
        }
    });

    // Rewrite this function to delay and allow the node class to setup.
    ig.main = function(canvasId, gameClass, fps, width, height, scale, loaderClass) {
        ig.system = new ig.System(canvasId, fps, width, height, scale || 1);
        ig.input = new ig.Input();
        ig.soundManager = new ig.SoundManager();
        ig.music = new ig.Music();
        ig.ready = true;

        var loader = new (loaderClass || ig.Loader)(gameClass, ig.resources);
        setTimeout(function() {
            loader.load();
        }, 100);
    };
});
