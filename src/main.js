// Patrick Hu
// Rocket Patrol: Fired Up
// Time it took to complete the project: 8 hours
// Mods chosen:
//  1-Point Tier: 
//   -Track a high score that persists across scenes and display it in the UI
//   -Implement the speed increase that happens after 30 seconds in the original game
//   -Randomize each spaceship's movement direction at the start of each play
//   -Create a new scrolling tile sprite for the background
//  3-Point Tier: 
//   -Create 4 new explosion sound effects and randomize which one plays on impact
//   -Display the time remaining (in seconds) on the screen
//  5-Point Tier: 
//   -Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
//   -Implement a new timing/scoring mechanism that adds time to the clock for successful hits
// Citations: My implementations are all original work except for create 4 new explosion sound effects and randomize which one plays on impact.
// That one was taken from Nathan's CleanPop.

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}
let game = new Phaser.Game(config);
// reserve keyboad vars
let keyF, keyR, keyLEFT, keyRIGHT;
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// high score tracker
let highScoreVal = 0;