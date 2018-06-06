var words = ["cowboys", "patriots", "eagles", "49ers", "packers", 
"raiders", "giants", "seahawks", "steelers", "vikings", "bears",
"broncos", "jets", "redskins", "panthers", "browns", "bills", "lions",
"ravens", "rams", "saints", "texans", "chargers", "colts", "dolphins", 
"cardinals", "falcons", "titans", "chiefs", "jaguars", "buccaneers", 
"bengals"];

var images = ["cowboys.jpg", "patriots.jpg", "eagles.jpg", "49ers.jpg", "packers.jpg", 
"raiders.jpg", "giants.jpg", "seahawks.jpg", "steelers.jpg", "vikings.jpg", "bears.jpg",
"broncos.jpg", "jets.jpg", "redskins.jpg", "panthers.jpg", "browns.jpg", "bills.jpg", "lions.jpg",
"ravens.jpg", "rams.jpg", "saints.jpg", "texans.jpg", "chargers.jpg", "colts.jpg", "dolphins.jpg", 
"cardinals.jpg", "falcons.jpg", "titans.jpg", "chiefs.jpg", "jaguars.jpg", "buccaneers.jpg", 
"bengals.jpg"];

var gameWord = "";
var gameWordArray = [];
var wins = 0;
var gameWon = false;
var wordCount = 0;
var key = "";
var indexes = [];
var guessCounter = 15;
var displayArray = [];
var guessedLetters = [];
var occurances = 0;
var image = "";
var random = 0;
var imageChosen = "";
var winImage = "";
var lossCounter = 0;
var gameStart = true;

function pickWord() {
    random = Math.floor(Math.random() * words.length);
    gameWord = words[random];
}

function updateGameWord() {
    for (var i = 0; i < gameWord.length; i++) {
        gameWordArray.push(gameWord.charAt(i));
}

for (var i = 0; i < gameWordArray.length; i++) {
    displayArray.push("_ ");
}
}

var winsDiv = document.getElementById("wins-counter");
var displayDiv = document.getElementById("word-display");
var guessesDiv = document.getElementById("guesses");
var usedLettersDiv = document.getElementById("letters-guessed");
var outcomeDiv = document.getElementById("outcomeBox");
var previousDiv = document.getElementById("previous-outcome");


function update () {
winsDiv.textContent = "You have " + wins + " wins!";
displayDiv.textContent = displayArray.join(" ");
guessesDiv.textContent = "You have " + guessCounter + " guesses left!";
usedLettersDiv.textContent = "Letters guessed: " + guessedLetters.join(" ");
}

function createPic(picture) {
    image = new Image(200);
    image.src = picture;
    console.log(picture);
    outcomeDiv.appendChild(image);
}
var nflLogo = "assets/images/nfl.jpg"
pickWord();
updateGameWord();
createPic(nflLogo);
update();

function deletePic() {
    image.parentNode.removeChild(image);

    }
    
    
    function getIndexes(arr, val) {
    for (var i = 0; i < arr.length; i++) {
        if (val === arr[i]) {
            indexes.push(i);
        }
    }
    }
    
    function multipleOccurances() {
    for (var i = 0; i < indexes.length; i++) {
        displayArray[indexes[i]] = key;
    }
    
    }
    
    function lettersGuessed() {
    var guessed = gameWordArray.indexOf(this.key);
    if (guessed === -1) {
        guessedLetters.push(key);
    }
    }
    
    
    
    function gameWin() {
    wins++;
    imageChosen = images[random];
    winImage = "assets/images/" + imageChosen;
    if (lossCounter === 0) {
        deletePic();
        createPic(winImage);
    } else {
        outcomeDiv.textContent = "";
        createPic(winImage);
    }
    }
    
    function restart() {
    pickWord();
    gameWordArray = [];
    gameWon = false;
    wordCount = 0;
    indexes = [];
    guessCounter = 15;
    displayArray = [];
    guessedLetters = [];
    updateGameWord();
    update();
    }
    
    function checkWon() {
    if (wordCount === gameWordArray.length) {
        gameWon = true;
    } 
    }
    
    function gameLost() {
    displayArray = gameWordArray;
    update();
    outcomeDiv.innerHTML = "You lost!";
    lossCounter++;
    }
    
    function changeDisplay() {
    
    if (indexes.length > 1) {
        if (displayArray.indexOf(key) === -1) {
            occurances = indexes.length;
            multipleOccurances();
            wordCount = wordCount + occurances;
        }
    }
    
    if (indexes.length === 1) {
        if (displayArray.indexOf(key) === -1) {
            displayArray[indexes[0]] = key;
            wordCount++;
        }
    }
    
    }
    
    
    
    document.addEventListener("keyup", function(){
    key = event.key;
    guessCounter--;
    getIndexes(gameWordArray, key);
    changeDisplay();
    lettersGuessed();
    update();
    indexes = [];
    checkWon();
    if (gameWon) {
        gameWin();
        restart();
    };
    if (guessCounter === 0) {
        displayArray = gameWordArray;
        update();
        gameLost();
        setTimeout(restart, 3000);
    }
    })