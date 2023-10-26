// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, timeValue, moveSpeed) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.timeGain = timeValue;
        this.shipSpeed = moveSpeed;
        this.direction = Math.random();
    }

    update() {
        if(this.direction <= 0.5){
            this.x -= this.shipSpeed;
        }
        if(this.direction > 0.5){
            this.flipX = true;
            this.x += this.shipSpeed;
        }
        if(this.x <= this.width && this.direction <= 0.5) {
            this.reset();
        }
        if(this.x > this.width && this.direction > 0.5) {
            this.reset();
        }
    }

    reset() {
        if(this.x <= 0 - this.width && this.direction <= 0.5 && this.texture.key != 'fastspaceship'){
            this.x = game.config.width;
        }
        if(this.x > game.config.width && this.direction > 0.5 && this.texture.key != 'fastspaceship'){
            this.x = 0 - this.width;
        }
        if(this.x <= this.width  && this.direction <= 0.5 && this.texture.key == 'fastspaceship'){
            this.x = game.config.width - this.width * 2;
        }
        if(this.x > game.config.width - this.width - borderPadding && this.direction > 0.5 && this.texture.key == 'fastspaceship'){
            this.x = this.width;
        }
    }
}