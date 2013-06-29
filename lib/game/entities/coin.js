ig.module(
	'game.entities.coin'
)
.requires(
	'impact.entity'
)
.defines(function(){

	// The Collectable Coin Entity
	EntityCoin = ig.Entity.extend({
		size: {x:14, y:16},
		animSheet: new ig.AnimationSheet( 'media/smw-coin.png', 14, 16, [0] ),
		type: ig.Entity.TYPE.B,
		maxVel: {x: 0, y: 0},
		
		sound: new ig.Sound('music/smw_coin.ogg'),
		
		init: function( x, y, settings ) {
			this.addAnim( 'idle', 0.1, [0,1,2,3,2,1] );		
			this.parent( x, y, settings );
		},
		
		update: function() {
			this.parent();
			if( this.pos.y - ig.game.screen.y < -32 ) {
				this.kill();
			}
		},
		
		pickup: function() {
			ig.game.score += 500;
			this.sound.play();
			this.kill();
		}
	});

});