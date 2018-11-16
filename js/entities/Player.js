class Player {
    // méthode constructor
    constructor(firstname, lastname, physics, cursors) {
      this.firstname = firstname;
      this.lastname = lastname;

      this.cursors = cursors;

      this.player = physics.add.sprite(100, 450, 'dude');
      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

    }
  
    sayName() {
      return `${this.firstname} ${this.lastname}`;
    }

    getPlayer(){
        return this.player;
    }

    collectStar(player, star) {
        console.log("collision avec une star");
        star.disableBody(true, true);
    }

    update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
    
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
    
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
    
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-330);
        }
    }
  }
  