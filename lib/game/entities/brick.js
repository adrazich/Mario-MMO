ig.module(
	'game.entities.brick'
)
.requires(
	'impact.entity'
)
.defines(function(){

	EntityBrick = ig.Entity.extend({
		size: {x:16, y:16},
		animSheet: new ig.AnimationSheet( 'media/smw-brick.png', 16, 16, [0] ),
		
		maxVel: {x: 0, y: 0},
		velHit: 200,
		fallingAccel: 1000,

		defaultPos: null,

		type: ig.Entity.TYPE.B,
		checkAgainst: ig.Entity.TYPE.A,
		collides: ig.Entity.COLLIDES.FIXED,
		
		sfxHit: new ig.Sound('music/smw_shell_ricochet.ogg'),
		sfxDeath: new ig.Sound('music/smw_break_block.ogg'),
		
		init: function( x, y, settings ){
			this.addAnim('idle', 0.1, [0,1,2,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
			this.addAnim('hit', 1, [0]);

			this.parent(x, y, settings);
			
			this.defaultPos = {x:this.pos.x, y:this.pos.y};
		},
		
		update: function(){
			if (this.currentAnim == this.anims.hit){
				// make sure this brick goes back to it's original location
				if (this.pos.y > this.defaultPos.y) this.pos.y = this.defaultPos.y;

				// stop the brick if it is back to default location
				if (this.pos.y >= this.defaultPos.y){
					this.maxVel.y = 0;
					this.vel.y = 0;
					this.accel.y = 0;
					this.pos.y = this.defaultPos.y;
					this.currentAnim = this.anims.idle;
				} else this.accel.y = this.fallingAccel;
			}

			this.parent();
		},

		check: function(other){
			// is the player hitting the brick from below?
			if (other.pos.y > this.pos.y + this.size.y*.5 && this.currentAnim != this.anims.hit){
				this.sfxHit.play();

				this.maxVel.y = this.velHit;
				this.vel.y = -this.velHit;
				this.pos.y = this.pos.y -1;
				this.currentAnim = this.anims.hit;
			}
		},

		kill: function(){
			this.sfxDeath.play();

			this.parent();
		}
	});

});