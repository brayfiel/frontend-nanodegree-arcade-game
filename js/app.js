/**
 * Enemies our player must avoid
 * Variables applied to each of our instances go here,
 * we've provided one for you to get started
 * The image/sprite for our enemies, this uses
 * a helper we've provided to easily load images
 * Object:                 Enemy
 * Parent:                 None
 * Variables:
 *   speed:                Bug's speed.  Randomly set to 1 of 3 values.
 *   tileHeight:           full height of the bug tile
 *   tileWidth:            full width of the bug tile
 *   tileEmptySpaceTop:    empty space at the top of a tile that should not constitute a collision
 *   tileEmptySpaceBottom: empty space at the bottom of a tile that should not constitute a collision
 *   tileEmptySpaceLeft:   empty space at the left of a tile that should not constitute a collision
 *   tileEmptySpaceRight:  empty space at the right of a tile that should not constitute a collision
 *   height:               the actual height of bug (tile height - tile bottom - tile top)
 *   width:                the actual width of bug (tile width - tile left - tile right)
 *   x:                    the column the bug starts in
 *   y:                    the row the bug starts in
 *   direction:            direction the bug moves.  this is randomly set.  if the random number is
 *                         even then move left to right else if odd right to left.
 *   sprite:               bug image.  dependant on direction.
 */
var Enemy = function() {
    this.tileHeight = 171;
    this.tileWidth = 101;
    this.tileEmptySpaceTop = 76;
    this.tileEmptySpaceBottom = 18;
    this.speed = 50 + (this.calcSpeed() * 100);
    if (Math.floor(Math.random() * 10 % 2) === 0){
        this.direction = 1;
        this.sprite = 'images/enemy-bug.png';
        this.tileEmptySpaceLeft = 1;
        this.tileEmptySpaceRight = 2;
    } else {
        this.direction = -1;
        this.sprite = 'images/enemy-bug-reverse.png';
        this.tileEmptySpaceLeft = 2;
        this.tileEmptySpaceRight = 1;
    }
    this.height = this.tileHeight - this.tileEmptySpaceTop - this.tileEmptySpaceBottom;
    this.width = this.tileWidth - this.tileEmptySpaceLeft - this.tileEmptySpaceRight;
    this.x = Math.floor(Math.random() * 400 / 5);
    this.y = 65 + (this.calcRow() * 80);
};

/**
 * Parent:    Enemy
 * Method:    update
 * Parameter: dt
 * Update the enemy's position, required method for game
 * Parameter: dt, a time delta between ticks
 * You should multiply any movement by the dt parameter
 * which will ensure the game runs at the same speed for
 * all computers.
 * Depending on direction and if the enemy's "tail" reaches the 
 * end of the canvas the enemy will now wrap to the other side 
 * changing its row and speed.  Suicidal mode is so much more fun.
 */
Enemy.prototype.update = function(dt) {
    this.x = this.x + ((this.speed * dt) * this.direction);
    if (this.direction > 0){
        if (this.x >= 505) {
            this.x = -80;
            this.y = 65 + (this.calcRow() * 80);
        }
    } else {
        if (this.x <= -80) {
            this.x = 505;
            this.y = 65 + (this.calcRow() * 80);
        }
    }
};

/**
 * Parent:    Enemy
 * Method:    calcRow
 * Parameter: 
 * Returns:   number of row for enemy to use
 * calculate (randomizes) row of the enemy on the canvas.
 * range from 0 to and including 2.
 */
Enemy.prototype.calcRow = function() {
    var rows = 3;
    var startRow = Math.floor(Math.random() * 10 / rows);
    while (startRow >= rows){
        startRow = Math.floor(Math.random() * 10 / rows);
    }
    return startRow;
};

/**
 * Parent:    Enemy
 * Method:    calcSpeed
 * Parameter: 
 * Returns:   number for the enemy's spped calculation
 * calculate (randomizes) speed of the enemy.  range from 0 to and including 2.
 */
Enemy.prototype.calcSpeed = function() {
    var speed_levels = 3;
    var start_speed = Math.floor(Math.random() * 10 / speed_levels);
    while (start_speed === speed_levels){
        start_speed = Math.floor(Math.random() * 10 / speed_levels);
    }
    return start_speed;
};

/**
 * Parent:    Enemy
 * Method:    top
 * Parameter: 
 * Returns:   number calculated real top edge of the bug
 */
Enemy.prototype.top = function() {
    return this.y - this.height;
};

/**
 * Parent:    Enemy
 * Method:    bottom
 * Parameter: 
 * Returns:   number calculated real bottom edge of the bug
 */
Enemy.prototype.bottom = function() {
    return this.y - this.tileEmptySpaceBottom;
};

/**
 * Parent:    Enemy
 * Method:    left
 * Parameter: 
 * Returns:   number calculated real left edge of the bug
 */
Enemy.prototype.left = function() {
    return this.x + this.tileEmptySpaceLeft;
};

/**
 * Parent:    Enemy
 * Method:    right
 * Parameter: 
 * Returns:   number calculated real right edge of the bug
 */
Enemy.prototype.right = function() {
    return this.x + this.tileEmptySpaceLeft + this.width;
};

/**
 * Parent:    Enemy
 * Method:    render
 * Parameter: 
 * Returns:
 * Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
 * Now write your own player class
 * This class requires an update(), render() and
 * a handleInput() method.
 * Object:      Player
 * Parent:      Enemy
 * Additional Variables:
 *   xUpdate:   distance the player with move left or right based on keyboard input
 *   yUpdate:   distance the player with move up or down based on keyboard input
 *   lives:     counter of player's lives left.  starts at 5 and reduces to 0.
 *   score:     counter of player's score.  starts at 0 and keeps going up.
 *   gemBlue:   counter of blue gems the player captured.  starts at 0 and keeps going up.
 *   gemGreen:  counter of green gems the player captured.  starts at 0 and keeps going up.
 *   gemOrange: counter of orange gems the player captured.  starts at 0 and keeps going up.
 */
var Player = function() {
    Enemy.call(this);
    this.sprite = 'images/char-boy.png';
    this.y = 405;
    this.x = 202;
    this.height = 83;
    this.width = 67;
    this.tileHeight = 171;
    this.tileWidth = 101;
    this.tileEmptySpaceTop = 62;
    this.tileEmptySpaceBottom = 15;
    this.tileEmptySpaceLeft = 18;
    this.tileEmptySpaceRight = 17;
    this.xUpdate = 0;
    this.yUpdate = 0;
    this.lives = 5;
    this.score = 0;
    this.gemBlue = 0;
    this.gemGreen = 0;
    this.gemOrange = 0;
};

/**
 * Parent:      Player
 * Method:
 * In order to get the fall through to Enemy's methods
 */
Player.prototype = Object.create(Enemy.prototype);

/**
 * Parent:    Player
 * Method:    update
 * Parameter: 
 * Returns:   
 * takes the values set by keyboard input (xUpdate, yUpdate) 
 * are applied to the players x and y position and reset to 0.
 */
Player.prototype.update = function() {
    this.x = this.x + this.xUpdate;
    this.xUpdate = 0;
    this.y = this.y + this.yUpdate;
    this.yUpdate = 0;
};

/**
 * Parent:    Player
 * Method:    dead
 * Parameter: 
 * Returns:   
 * this method is called when a player collides with a bug.  
 * it resets the player's location to the bottom of the canvas.
 * it decreases the number of player lives by 1.  flashes a  
 * "You Lose" message at the top of the screen and 
 * sets the stage for the "Game Over" message if the
 * number of lives reduces to 0 or less.  
 */
Player.prototype.dead = function (){
    this.y = 405;
    this.yUpdate = 0;
    this.lives = player.lives - 1;
    updatePlayerStats();
    if (this.lives <= 0){
        banner.update("Game Over!!!", 170, 30);
        loadBugs(0);
    } else {
        banner.update("You Lose!!!", 175, 30);
    }
};

/**
 * Parent:    Player
 * Method:    handleInput
 * Parameter: key
 * Returns:   
 * handle the keyboard events
 *   right: move player full tile to the right (update xUpdate).  stop at end of gameboard.
 *   left:  move player full tile to the left (update xUpdate).  stop at beginning of gameboard.
 *   up:    move player full tile up (update yUpdate).  if player makes it to top of gameboard then
 *          increase score and reset player position to bottom of gameboard.
 *   down:  move player full tile down (update yUpdate).  stop at bottom of gameboard.
 */
Player.prototype.handleInput = function(key){
    if (key === "left"){
        if (this.x - this.tileWidth >= 0){
            this.xUpdate = this.tileWidth * -1;
        }
    } else if (key === "right"){
        if (this.x + this.tileWidth <= 404){
            this.xUpdate = this.tileWidth;
        }
    } else if (key === "up"){
        if(this.y - (this.tileHeight - 88) >= -20){
            this.yUpdate = (this.tileHeight - 88) * -1;
        }
        if(this.y + this.yUpdate <= 0){
            this.score = this.score + 100;
            this.y = 405;
            this.yUpdate = 0;
            loadBugs(allEnemies.length);
            updatePlayerStats();
            banner.update("You Win!!!", 200, 30);
        }
    } else if (key === "down"){
        if(this.y + this.tileHeight - 88 <= 405){
            this.yUpdate = this.tileHeight - 88;
        }
    }
};

/**
 * Parent:    Player
 * Method:    changeSprite
 * Parameter: newImage
 * Returns:   
 * changes the avatar used to represent the player
 */
Player.prototype.changeSprite = function(newImage){
    this.sprite = newImage;
};

/**
 * Parent:    None
 * Object:    Banner
 * Parameter: 
 * Returns:   
 * instantiates the banner object.
 * Variables:
 *  x:       horizontal position of the banner on the canvas
 *  y:       vertical position of the banner on the canvas
 *  message: message to be displayed
 *  winColor:  colors to cycle through when displaying a winning message
 *  loseColor: colors to cycle through when displaying a losing message
 *  colorPointer: pointer use as a starting point for cycling through the color arrays
 *  displayTimes: speed at which the colors are displayed
 */
var Banner = function() {
    this.y = 0;
    this.x = 0;
    this.message = "";
    this.winColor = ["Brown", "Magenta", "Red", "Yellow", "Orange"];
    this.loseColor = ["Black", "DarkBlue", "Blue", "Cyan", "Gray" ];
    this.colorPointer = 0;
    this.displayTimes = 0;
};

/**
 * Parent:    Banner
 * Method:    update
 * Parameter: 
 *  message:  message to be displayed
 *  x:        column for message to start in
 *  y:        row for message to start in
 * preps the banner object to display the appropriate msg in the appropriate location
 */
Banner.prototype.update = function(message, x, y) {
    this.message = message;
    this.x = x;
    this.y = y;
    this.displayTimes = 0;
    this.colorPointer = 0;
};

/**
 * Parent:    Banner
 * Method:    render
 * Parameter: 
 * paint the winner or loser msg, cycle through colors as you display it,
 * white out msg area when done.
 */
Banner.prototype.render = function() {
    var my_gradient = ctx.createLinearGradient(0,0,170,0);
    if (this.message.length > 0){
        ctx.font="30px Georgia";
        if (this.message === "You Lose!!!"){
            my_gradient.addColorStop(0.00,this.loseColor[this.colorPointer % this.loseColor.length]);
            this.colorPointer++;
            my_gradient.addColorStop(0.33,this.loseColor[this.colorPointer % this.loseColor.length]);
            this.colorPointer++;
            my_gradient.addColorStop(0.66,this.loseColor[this.colorPointer % this.loseColor.length]);
            this.colorPointer++;
            my_gradient.addColorStop(1.00,this.loseColor[this.colorPointer % this.loseColor.length]);
            this.colorPointer++;            
        } else {
            my_gradient.addColorStop(0.00,this.winColor[this.colorPointer % this.winColor.length]);
            this.colorPointer++;
            my_gradient.addColorStop(0.33,this.winColor[this.colorPointer % this.winColor.length]);
            this.colorPointer++;
            my_gradient.addColorStop(0.66,this.winColor[this.colorPointer % this.winColor.length]);
            this.colorPointer++;
            my_gradient.addColorStop(1.00,this.winColor[this.colorPointer % this.winColor.length]);
            this.colorPointer++;
        }
        ctx.fillStyle = my_gradient;
        ctx.fillText(this.message,this.x,this.y);
        if(this.colorPointer >= 30){
            this.colorPointer = 0;
        }
        this.displayTimes++;
        if (this.displayTimes >= 30){
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 600,this.y + 10);
            this.message = "";
        }
    }
};

/**
 * Parent:    Enemy
 * Object:    GameOver
 * Parameter: 
 * paint the game over graphic across the canvas on random rows.
 */
var GameOver = function() {
    Enemy.call(this);
    this.sprite = 'images/game-over-bug.png';
    this.direction = 1;
    this.y = 80 + (this.calcRow() * 80);
    this.x = -400;
    this.speed = 75;
    this.xUpdate = 0;
    this.yUpdate = 0;
};

/**
 * Parent:      GameOver
 * Method:
 * In order to get the fall through to Enemy's methods
 */
GameOver.prototype = Object.create(Enemy.prototype);

/**
 * Parent:    GameOver
 * Method:    update
 * Parameter: dt
 * Returns:   
 * applies the speed and direction, set at instantiation, to the 
 * location of the game over graphic.  when the graphic reaches 
 * the end of the row randomize the next row it will appear on.
 */
GameOver.prototype.update = function(dt) {
    this.x = this.x + ((this.speed * dt) * this.direction);
    if (this.x >= 505) {
        this.x = -400;
        this.y = 80 + (this.calcRow() * 80);
    }
};

/**
 * Parent:    Enemy
 * Object:    Gem
 * Parameter: 
 * Additional Variables:
 *   height: height the gem sprite will be shrunk to
 *   width:  width the gem sprite will be shrunk to
 * instantiate the gem objects.  gem objects do not get displayed 
 * unless active is set to true.  the gem can be one of three colors 
 * (sprites) along with respective scoring (spritesScore)
 */
var Gem = function() {
    Enemy.call(this);
    this.spriteIndex = 0;
    this.sprites = ['images/Gem Blue.png', 'images/Gem Green.png',
        'images/Gem Orange.png'];
    this.spritesDescription = ['Blue', 'Green',
        'Orange'];
    this.spritesType = ['score', 'score', 'score'];
    this.spritesScore = [25, 50, 75];
    this.sprite = "";
    this.speed = 0;
    this.active = false;
    this.xShift = 15;
    this.yShift = 60;
    this.y = 0;
    this.x = 0;
    this.height = 80;
    this.width = 70;
};

/**
 * Parent:    Gem
 * Method:    
 * Parameter: 
 * In order to get the fall through to Enemy's methods
 */
Gem.prototype = Object.create(Enemy.prototype);

/**
 * Parent:    Gem
 * Method:    centerX
 * Parameter: 
 * Returns:   number calculated horizontal center on canvas
 * location on the canvas of the horizontal center of the gem sprite's width
 * takes the x location of the gem sprite and adds half the 
 * sprites width and returns it as the location of the sprites 
 * horizontal center on the canvas.
 */
Gem.prototype.centerX = function() {
    return this.x + (this.width / 2);
};

/**
 * Parent:    Gem
 * Method:    centerY
 * Parameter: 
 * Returns:   number calculated vertical center on canvas
 * location on the canvas of the vertical center of the gem sprite's height
 * takes the y location of the gem sprite and adds half the 
 * sprites height and returns it as the location of the sprites 
 * vertical center on the canvas.
 */
Gem.prototype.centerY = function() {
    return this.y - (this.height / 2);
};

/**
 * Parent:    Gem
 * Method:    dead
 * Parameter: 
 * player lands on gem.  gem gets deactivated.  and the appropriate
 * player gem counter and player score are updated.
 */
Gem.prototype.dead = function (){
    this.active = false;
    if (this.spriteIndex === 0){
        player.gemBlue = player.gemBlue + 1;
    } else if(this.spriteIndex === 1){
        player.gemGreen = player.gemGreen + 1;
    } else if (this.spriteIndex === 2){
        player.gemOrange = player.gemOrange + 1;
    }
    player.score = player.score + this.spritesScore[this.spriteIndex];
    updatePlayerStats();
};

/**
 * Parent:    Gem
 * Method:    activate
 * Parameter: 
 * when a Gem goes active the color and score are randomly set
 * the row and col are randomly set and checked against the existing gems to make sure
 * no two land on each other.
 */
Gem.prototype.activate = function (){
    var looper = 0;
    var exists = true;
    this.spriteIndex = Math.floor(Math.random() * 10 / 3);
    while (this.spriteIndex >= 3){
        this.spriteIndex = Math.floor(Math.random() * 10 / 3);
    }
    this.sprite = this.sprites[this.spriteIndex];
    while(exists){
        exists = false;
        this.y = 65 + (this.calcRow() * 80);
        this.x = 0  + (this.calcCol() * 101);
        looper = 0;
        while(looper < allGems.length){
            if (allGems[looper].active && 
                allGems[looper].x === this.x && 
                allGems[looper].y === this.y){
                exists = true;
            }
            looper = looper + 1;
        }
    }
    this.active = true;
};

/**
 * Parent:    Gem
 * Method:    calcCol
 * Parameter: 
 * Returns:   number pointer to random column
 * calculate random column for the gem on the canvas
 */
Gem.prototype.calcCol = function() {
    var cols = 5;
    var startCol = Math.floor(Math.random() * 10 / 2);
    while (startCol >= cols){
        startCol = Math.floor(Math.random() * 10 / 2);
    }
    return startCol;
};

/**
 * Parent:    Gem
 * Method:    render
 * Parameter: 
 * Returns:   
 * Draw the gem on the screen, here the image is shrunk to the size specified in width and height
 */
Gem.prototype.render = function() {
    if (this.active){
        ctx.drawImage(Resources.get(this.sprite), this.x + this.xShift, this.y + this.yShift, 
            this.width, this.height);
    }
};

/**
 * Now instantiate your objects.
 * Place all enemy objects in an array called allEnemies
 * Place the player object in a variable called player
 * Variables:
 * gameOver = instantiate the game over animation
 * banner = instantiate the game over animation
 * allEnemies = create an array of bug objects
 * player = instantiate the player object
 * allGems = create an array of Gem objects.  in this case three Gems
 */
var gameOver = new GameOver();
var banner = new Banner();
var allEnemies = [];
var player = new Player();
var allGems = [new Gem(), new Gem(), new Gem()];

/**
 * create the initial easy level with three bugs
 */
loadBugs(3);

/**
 * initialize display of score, lives and gem counts
 */
updatePlayerStats();

/**
 * create the number of bug specified by bugAmount.
 * left in the possibility of multiple bugs being stacked on each other
 * makes it more interesting that some bus might have not been created and 
 * then they sneak out from the stack.
 */
function loadBugs(bugAmount) {
    var looper = 0;
    while (allEnemies.length > 0){
        allEnemies.pop();
    }
    while (looper < bugAmount){
        allEnemies.push(new Enemy());
        looper++;
    }
}

/**
 * updated the display of the score, lives and gem counts on the screen
 */
function updatePlayerStats() {
    var score = document.getElementById("playerScore");
    var lives = document.getElementById("playerLives");
    var blue = document.getElementById("blueGems");
    var green = document.getElementById("greenGems");
    var orange = document.getElementById("orangeGems");
    score.value = player.score;
    lives.value = player.lives;
    blue.value = player.gemBlue;
    green.value = player.gemGreen;
    orange.value = player.gemOrange;
}

/**
 * changes the graphic used to represent the player
 */
function changePlayerSprite(spriteName) {
    player.changeSprite(spriteName);
}

/**
 * This listens for key presses and sends the keys to your
 * Player.handleInput() method. You don't need to modify this.
 */
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

