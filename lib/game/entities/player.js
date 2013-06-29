ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({
	font: new ig.Font( 'media/04b03.font.png' ),
	
	// The players (collision) size is a bit smaller than the animation
	// frames, so we have to move the collision box a bit (offset)
	size: {x: 16, y:24},
	offset: {x: 0, y: 0},
	
	maxVel: {x: 200, y: 250},
	friction: {x: 600, y: 0},
	
	type: ig.Entity.TYPE.A, // Player friendly group
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,
	
	animSheet: new ig.AnimationSheet( 'media/mario-16x24.png', 16, 24, [0] ),	
	
	// These are our own properties. They are not defined in the base
	// ig.Entity class. We just use them internally for the Player
	flip: false,
	accelGround: 400,
	accelAir: 250,
	accelFalling: 500,
	jump: 300,
	health: 10,
	flip: false,
	lastPos: this.pos,

	// sound effects
	sfxJump: new ig.Sound('music/smb3_jump.ogg'),
	sfxKill: new ig.Sound('music/smw_lost_a_life.ogg'),

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		// Add the animations
		this.addAnim( 'idle', 1, [0] );
		this.addAnim( 'run', 0.07, [0,1] );
		this.addAnim( 'jump', 1, [2] );
		this.addAnim( 'down', 1, [3] );
		this.addAnim( 'death', 0.5, [4,5,4,5,4,5,4,5,4,5,4,5,4,5] );
	},
	
	update: function() {
		// check for death
		if (this.currentAnim == this.anims.death && this.currentAnim.sequence.length-1 === this.currentAnim.frame){
			this.kill();
		}
		
		// move left or right
		var accel = this.standing ? this.accelGround : this.accelAir;
		if( ig.input.state('left') ) {
			this.accel.x = -accel;
			this.flip = true;
		}
		else if( ig.input.state('right') ) {
			this.accel.x = accel;
			this.flip = false;
		}
		else {
			this.accel.x = 0;
		}

		// fall faster then jumping in the air
		if (ig.input.state('jump')){
			if (lastPos.y > this.pos.y)
				this.accel.y = this.accelAir;
			else
				this.accel.y = this.accelFalling;
		}
		
		// jump
		if( this.standing && ig.input.pressed('jump') ) {
			this.vel.y = -this.jump;
			this.sfxJump.play();
		}
		
		if (this.currentAnim == this.anims.death){
		} else if (ig.input.state('down')){
			this.currentAnim = this.anims.down;
		} else if( this.vel.y < 0 ) {
			// set the current animation, based on the player's speed
			this.currentAnim = this.anims.jump;
		} else if( this.vel.x != 0 ) {
			this.currentAnim = this.anims.run;
		} else {
			this.currentAnim = this.anims.idle;
		}
		
		this.currentAnim.flip.x = this.flip;

		lastPos = this.pos;
		
		// move!
		this.parent();
	},

	kill: function(){
		this.parent();
	},

	check: function( other ) {
		if (other.pickup != undefined) other.pickup();
	},

	draw: function(){
		//this.font.draw( 'y:'+this.pos.y+' - last y:'+lastPos.y, 2, 20 );

		this.parent();
	}
});


});