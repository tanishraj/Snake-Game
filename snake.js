/**
 * Created by Tanish Raj on 3/26/2017.
 */

/**
 * Setting for the areas
 */
var snakeX = 2;
var snakeY = 3;
var height = 40;
var width = 40;
var interval = 100;
var increment = 1;

/**
 * Game Variables
 */
var length = 0;
var tailX = [snakeX];
var tailY = [snakeY];
var fX;
var fY;
var running = false;
var gameOver = false;
var direction = -1; // up=0, down=-1, left=1, right=2
var int;
var score = 0;


/**
 * Music Variables
 */
function playAudio() {
    document.getElementById("audio").play();
}

function playAudioOver() {
    document.getElementById("audioOver").play();
}

/**
 * entry point of the game
 */
function run(){
    init();
    int = setInterval(gameLoop, interval);
}

function init(){
    createMap();
    createSnake();
    createFruit();
}

/**
 * Generate the map for the snake
 */
function createMap() {
    document.write("<table>");
    for(var y = 0; y < height; y++){
        document.write("<tr>");
        for(var x = 0; x < width; x++){
            if(x == 0 || x == width -1 || y == 0 || y == height -1){
                document.write("<td class='wall' id='"+ x + "-" + y + "'></td>");
            }
            else{
                document.write("<td class='blank' id='"+ x + "-" + y +"'></td>");
            }
        }
        document.write("</tr>");
    }
    document.write("</table>");
}

/**
 *  Generating snake for the map
 */
function get(x,y){
    return document.getElementById(x+"-"+y);
}

function set(x,y,value){
    get(x,y).setAttribute("class",value);
}

function createSnake() {
    set(snakeX,snakeY,"snake")
}

/**
 *  Generating fruit for the snake
 */
function createFruit() {
    var found = false;
    while(!found && (length < (width -2) * (height-2) + 1)){
        var fruitX = rand(1, width-1);
        var fruitY = rand(1, height-1);
        if(getType(fruitX,fruitY) == "blank"){
            found = true;
        }
    }
    set(fruitX, fruitY, "fruit");
    fX = fruitX;
    fY = fruitY;
}

function rand(min, max){
    return Math.floor(Math.random() * (max-min) + min);
}

function getType(x,y) {
    return get(x,y).getAttribute("class");
}

/**
 * Adding Even Listener
 */
window.addEventListener("keydown", function key(){
    var key = event.keyCode;

    //If Key is W set direction up
    if(direction != -1 && (key == 119 || key == 87 || key == 38)){
        direction = 0;
    }

    //If Key is S set direction down
    else if(direction != 0 && (key == 115 || key == 83 || key == 40)){
        direction = -1;
    }

    //If Key is A set direction left
    else if(direction != 2 && (key == 97 || key == 65 || key == 37)){
        direction = 1;
    }

    //If Key is D set direction right
    else if(direction != 1 && (key == 100 || key == 68 || key == 39)){
        direction = 2;
    }

    if(!running){
        running = true;
    }
    else if(key == 32){
        running = false;
    }
})

function gameLoop(){
    if(running && !gameOver){
        update();
    }
    else if(gameOver){
        clearInterval(int);
    }
}

function update(){
    set(fX, fY, "fruit");
    updateTail();
    set(tailX[length], tailY[length], "blank");
    if(direction == 0){
        snakeY--;
    }
    else if(direction == -1){
        snakeY++;
    }
    else if(direction == 1){
        snakeX--;
    }
    else if(direction == 2){
        snakeX++;
    }

    set(snakeX, snakeY, "snake");

    for(var i = tailX.length-1; i >= 0; i--){
        if(snakeX == tailX[i] && snakeY == tailY[i]){
            playAudioOver();
            gameOver = true;
            break;
        }
    }

    if(snakeX == 0 || snakeX == width-1 || snakeY == 0 || snakeY == height-1) {
        playAudioOver();
        gameOver = true;
    }

    else if(snakeX == fX && snakeY == fY){
        playAudio();
        createFruit();
        length+=increment;
        score+=1;
    }

    document.getElementById("score").innerHTML = score;
}

function updateTail(){
    for(var i = length; i>0; i--){
        tailX[i] = tailX[i-1];
        tailY[i] = tailY[i-1];
    }
    tailX[0] = snakeX;
    tailY[0] = snakeY;
}

run();