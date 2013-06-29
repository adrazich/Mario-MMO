ig.module(
	'game.entities.mushroom'
)
.requires(
	'impact.entity'
)
.defines(function(){

	// The Collectable Coin Entity
	EntityMushroom = ig.Entity.extend({
		size: {x:14, y:16},
		animSheet: new ig.AnimationSheet( 'media/smw-powerups.png', 16, 16, [0] ),
		
		maxVel: {x: 100, y: 400},

		type: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.PASSIVE,
		
		sfxPickup: new ig.Sound('music/smw_powerup.ogg'),
		
		init: function( x, y, settings ) {
			this.addAnim( 'idle', 1, [0] );	

			this.vel.x = 30;
			this.vel.y = 400;
			this.accel.x = 10;
			this.accel.y = 800;

			this.parent( x, y, settings );
		},
		
		update: function(){
			this.parent();
			if( this.pos.y - ig.game.screen.y < -32 ) {
				this.kill();
			}
		},
		
		pickup: function() {
			ig.game.score += 1000;
			this.sfxPickup.play();
			this.kill();
		}
	});

});