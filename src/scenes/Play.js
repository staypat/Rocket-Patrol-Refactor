class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('fastspaceship', './assets/fastspaceship.png');
        this.load.image('starfield', './assets/planetary.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
        // add spaceships (x4)
        this.ship01 = new Spaceship(this, game.config.width/2, borderUISize*4, 'spaceship', 0, 30, 3, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width/2, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 2, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width/2, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 1, game.settings.spaceshipSpeed).setOrigin(0, 0);
        this.ship04 = new Spaceship(this, game.config.width/2, borderUISize*7 + borderPadding*6, 'fastspaceship', 0, 50, 5, game.settings.spaceshipSpeed + 1).setOrigin(0, 0);
        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start : 0, end: 9, first: 0}),
            frameRate:30
        });
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B131',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.highScore = this.add.text(game.config.width - borderUISize * 11 + 17, borderUISize + borderPadding*2, 'High Score: ' + highScoreVal, {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B131', color: '#843605', align: 'right', padding: { top: 5, bottom: 5,}, fixedWidth: 0});
        // GAME OVER flag
        this.gameOver = false;
        // Time trackers
        this.currTime = game.settings.gameTimer / 1000;
        this.elapsedTime = 0;
        this.timeText = this.add.text(game.config.width - borderUISize * 15 - 4 , borderUISize + borderPadding*2, 'Time: ' + this.currTime, {fontFamily: 'Courier', fontSize: '28px', backgroundColor: '#F3B131', color: '#843605', align: 'right', padding: { top: 5, bottom: 5,}, fixedWidth: 0});
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= -3;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            if(this.currTime > 0){
                this.currTime -= 1/60;
                this.elapsedTime += 1/60;
                if(Math.ceil(this.elapsedTime) == 30){
                    this.ship01.shipSpeed += 0.06;
                    this.ship02.shipSpeed += 0.06;
                    this.ship03.shipSpeed += 0.06;
                    this.ship04.shipSpeed += 0.06;
                }
                this.timeText.setText('Time: ' + Math.ceil(this.currTime));
            }else if(this.currTime <= 0){
                this.currTime = 0;
                this.timeText.setText('Time: 0');
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', {
                    fontFamily: 'Courier',
                    fontSize: '28px',
                    backgroundColor: '#F3B131',
                    color: '#843605',
                    align: 'right',
                    padding: {
                        top: 5,
                        bottom: 5,
                    },
                    fixedWidth: 0
                }).setOrigin(0.5);
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', {
                    fontFamily: 'Courier',
                    fontSize: '28px',
                    backgroundColor: '#F3B131',
                    color: '#843605',
                    align: 'right',
                    padding: {
                        top: 5,
                        bottom: 5,
                    },
                    fixedWidth: 0
                }).setOrigin(0.5);
                this.gameOver = true;
            }
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if(this.checkCollision(this.p1Rocket, this.ship04)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket. x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.currTime += ship.timeGain;
        if(highScoreVal <= this.p1Score){
            this.highScore.text = 'High Score: ' + this.p1Score;
            highScoreVal = this.p1Score;
        }
        this.playExplosion();
    }
    playExplosion() {
        switch(Math.floor(Math.random() * 5)) {
            case 0:
                this.sound.play('sfx_explosion1');
                break;
            case 1:
                this.sound.play('sfx_explosion2');
                break;
            case 2:
                this.sound.play('sfx_explosion3');
                break;
            case 3:
                this.sound.play('sfx_explosion4');
                break;
            case 4:
                this.sound.play('sfx_explosion5');
                break;
            default:
                console.log('Error: Invalid Sound');
        }
    }
}