ig.module(
	'game.entities.powerup'
)
.requires(
	'impact.entity',

	'game.entities.mushroom'
)
.defines(function(){

	EntityPowerup = ig.Entity.extend({
		size: {x:16, y:16},
		animSheet: new ig.AnimationSheet( 'media/smw-powerup.png', 16, 16, [0] ),
		
		maxVel: {x: 0, y: 0},
	
		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		
		sfxHit: new ig.Sound('music/smw_shell_ricochet.ogg'),
		sfxPowerupAppears: new ig.Sound('music/smw_powerup_appears.ogg'),
		
		init: function( x, y, settings ){
			this.addAnim('idle', 0.2, [0,1,2,3]);
			this.addAnim('hit', 1, [4]);

			this.parent(x, y, settings);
		},
		
		update: function(){
			this.parent();
		},

		check: function(other){
			// is the player hitting the brick from below?
			if (other.pos.y > this.pos.y + this.size.y*.5 && this.currentAnim != this.anims.hit){
				this.sfxHit.play();
				this.sfxPowerupAppears.play(1);

				ig.game.spawnEntity(EntityMushroom, this.pos.x, this.pos.y-this.size.y);

				this.currentAnim = this.anims.hit;
			}
		}
	});

});