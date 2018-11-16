let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//Phaser objects
let platforms;
let cursors;
let player;
let game = new Phaser.Game(config);

//custom variables
let ihmManager;
let score = 0;

/*******  PHASER methods ********/
function preload ()
{
    //load assets 
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png',{ frameWidth: 32, frameHeight: 48 });
}

function create ()
{
    //order from top to bottom ....depth render !!
    this.add.image(400, 300, 'sky');
    //input keyboard
    cursors = this.input.keyboard.createCursorKeys();

    //all game's animations
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    console.log(this);

    /********************* static and dynamic objects *********************/
    //static physics objects
    platforms = new Platforms(this.physics);
    //dynamic objects
    player = new Player("John", "Doe",this.physics,cursors);
    stars = new Stars(this.physics);
    /********************* END static and dynamic objects *********************/

    //allow collisions to stop/block
    this.physics.add.collider(player.getPlayer(), platforms.getPlatformsGroup());
    this.physics.add.collider(stars.getStarsGroup(), platforms.getPlatformsGroup());

    //collision detection check
    this.physics.add.overlap(player.getPlayer(), stars.getStarsGroup(), collectStar, null, this);

    //create IHM wrapper
    ihmManager = new IHMCoreManager(this);//pass Phaser context to allow IHM creation and placement
}

function update ()
{
   player.update();
}

/******* END PHASER methods ********/

//callback for collisions
function collectStar (player, star)
{
    //update score
    score += 10;

    //update ihm
    ihmManager.updateScore(score);

    //disable star
    star.disableBody(true, true);
}