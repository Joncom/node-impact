var path = require('path');
var fs = require('fs');

// Setup paths
var root = __dirname;
var impactLibPath = root + '/lib';

// Alter the env to allow impact
// to run without DOM interaction.
var Canvas = function() {
    return {
        addEventListener: function() { },
        style: { },
        getContext: function() {
            // This is the context
            return {
                save: function() { },
                translate: function() { },
                rotate: function() { },
                restore: function() { },
                drawImage: function() { },
                strokeRect: function() { },
                beginPath: function() { },
                moveTo: function() { },
                lineTo: function() { },
                stroke: function() { },
                clearPath: function() { },
                scale: function() { },
                arc: function() { },
                rect: function() { },
                fill: function() { },
                fillRect: function() { }
            };
        }
    };
};
global.window = global;
global.ImpactMixin = {
    module: function() { return ig; },
    requires: function() {
        var requires = Array.prototype.slice.call(arguments);
        // Go ahead and require the proper files
        requires.forEach(function(name) {
            // Ignore any dom ready type stuff on the server.
            if (name == 'dom.ready') return;
            var path = name.replace(/\./g, '/');
            require(impactLibPath + '/' + path);
        });
        return ig;
    },
    defines: function(func) {
        func(); // immediately execute
    },
    $: function(selector) {
        return new Canvas();
    }
};
window.document = { };
window.addEventListener = function() { };

// Canvas should be the only element impact uses on the server.
window.HTMLElement = Canvas;
require(impactLibPath + '/impact/impact.js');
require(impactLibPath + '/game/main.js');
