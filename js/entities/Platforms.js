class Platforms{
    constructor(physics) {
        this.platforms = physics.add.staticGroup(); //activate Arcade Physics engine
        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');
    }
    getPlatformsGroup(){
        return this.platforms;
    }
}