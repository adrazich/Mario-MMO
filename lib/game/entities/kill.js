ig.module(
	'game.entities.kill'
)
.requires(
	'impact.entity'
)
.defines(function(){

	// The Collectable Coin Entity
	EntityKill = ig.Entity.extend({
		type: ig.Entity.TYPE.B,
		
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(255,0,0,0.5)',
		_wmScalable: true,

		checkAgainst: ig.Entity.TYPE.BOTH,

		update: function(){},

		check: function(other){
			if (other.currentAnim != other.anims.death){
				other.maxVel = {x: 0, y: 0};
				other.currentAnim = other.anims.death;
				other.sfxKill.play();
			}
		}
	});

});