ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'game.entities.player',
	'game.entities.coin',
	'game.entities.kill',

	'game.levels.main'
)
.defines(function(){

MyGame = ig.Game.extend({

	gravity: 50,
	
	// Load Fonts
	font: new ig.Font( 'media/04b03.font.png' ),

	music: new ig.Sound('music/smw_overworld_theme.ogg'),

	init: function() {
		// Initialize your game here; bind keys etc.
		ig.input.bind( ig.KEY.A, 'left' );
		ig.input.bind( ig.KEY.D, 'right' );
		ig.input.bind( ig.KEY.S, 'down' );
		ig.input.bind( ig.KEY.SPACE, 'jump' );

		// fullscreen the window
		ig.system.resize($(window).width(),$(window).height());

		// load music
		ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
		ig.Sound.channels = 4;
		ig.Sound.enabled = true;
		//this.music.play();

		// start level
		this.loadLevel(LevelMain);

		// clear
		ig.game.clearColor = '#b9ddf3';
	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		// screen follows the player
		var player = this.getEntitiesByType( EntityPlayer )[0];
		if( player ) {
			this.screen.x = player.pos.x - ig.system.width/2;
			this.screen.y = player.pos.y - ig.system.height/2;
		}
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();

		this.font.draw( 'Controls A, D, S, Spacebar', 2, 2 );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled up by a factor of 2
ig.main( '#canvas', MyGame, 60, 768, 480, 1 );

});

// resize the window on resize
window.onresize = function(){
	ig.system.resize($(window).width(), $(window).height());
};
