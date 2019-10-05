
//Create a list that holds all of your cards
const cards = ["fa-diamond", "fa-diamond",
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-anchor", "fa-anchor",
    "fa-bolt", "fa-bolt",
    "fa-cube", "fa-cube",
    "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle",
    "fa-bomb", "fa-bomb"];

initGame();

let allCards = document.querySelectorAll(".card");//list of all cards
let opendCard = [];
let moves = 0;
let CountMatchingCards = 0;
let counter = 0;
let minutesTime = 0;
let secTime = 0;
let gameEnd = false;
let starsStringRaiting ="three";
let stars = document.querySelectorAll(".fa-star");//list of all stars
let menuteTimeHTML = document.querySelector(".minutes");
let secTimeHTML = document.querySelector(".seconds");
let DmenuteTimeHTML = document.querySelector(".Dminutes");
let DsecTimeHTML = document.querySelector(".Dseconds");
let testFlag = 0;
let playAgainFlag = false;
let timer;
let playerMoves = document.querySelector(".moves");
let resatrt = document.querySelector(".restart");//holde the retart Button
let dialogMessageParagraph= document.querySelector(".pMessage");
let restartIsClick=false;
let dialogMessge=document.getElementById("dialogMessge");
let yesButton=false;
//this function counting for the timer  


/**
* @description To calculate the time, repeat the seconds and reset it
*/
function startTimer() {
    timer = setInterval(function timeIt() {
        if (!gameEnd || yesButton || restartIsClick) {
            // counting
            secTime++;
            
         secTimeHTML.innerHTML = secTime;
            menuteTimeHTML.innerHTML = minutesTime;
        
            // If 1 minute is over
            if (secTime == 60) {
                minutesTime++;
                secTime = 0;
            }
        }
    }, 1000);
}//end of startTimer function

/**
* @description To cshow dialog Message After the user Win
*/
function dialog (){
    clearTimeout(timer);
           //  dialogMessageParagraph.innerHTML="Congratulations your time is : "+minutesTime +" : "+secTime+" Your rating is : "+starsStringRaiting+"  "+" <br> <h5>Would you like to play again ?</h5>";
           dialogMessageParagraph.innerHTML=`Congratulations your time is : ${minutesTime}  : ${secTime}  Your rating is : ${starsStringRaiting}    <br> <h5>Would you like to play again ?</h5>`;

           dialogMessge.showModal();          
}

// start  code
startTimer();
cardEventListener();
stars[0].classList.add("coloerdStar");
stars[1].classList.add("coloerdStar");
stars[2].classList.add("coloerdStar");

/**
* @description write the shuffeld card to HTML page .
*/
function initGame() {
    let deck = document.querySelector(".deck");//holde the ul
    //الشفل رح ترجع لي ارري بأسماء الكارات عشوائية و الماب ترجع لي نص ال اتش تي ام ال بعد ما توزع بعشوائية
    let cardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });
    deck.innerHTML = cardHTML.join("");
}

/**
* @description build HTML list items code
* @param {string} card - the card rfom the cards Array
*/
function generateCard(card) {
    //the idea that we add the data-card attrubute to compare if its match or not 
    return ` <li class="card" data-card="${card}"> <i class="fa ${card}"></i>`;
}


// Shuffle function from http://stackoverflow.com/a/2450976

/**
* @description Shuffle function from http://stackoverflow.com/a/2450976
* @param {array} cards (list of all ul items)
* @returns {araay} shuffeld array
*/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


/**
* @description lesten to the card clicked
*/
function cardEventListener() {
    if(yesButton){
     console.log("yes 2 Button is clicked!") 
      
    }
    
    if(restartIsClick){
        console.log("I'm in cardEventListener After click restart ")
    }

    allCards.forEach(function (card) {
        if(restartIsClick){
            console.log("I'm in  allCards.forEach After click restart ")
        }
        
        //this for each execute  on each item in an array element (each card)
        card.addEventListener("click", function (e) {//to heare the Event 
            // thanks for Ahmad who's help me to solve this problem :)
                   if(this.classList.contains("open")){
                       console.log("this card is alredy open !");
                       return;
                   }
            if(restartIsClick){
                console.log("I'm in card.addEventListener After click restart ")
            }

            if (!card.classList.contains("open" & !card.classList.contains("show"))) {//if the card not opend before
                //here increment the moves 
                moves++;
                playerMoves.innerHTML = moves;
                if (moves > 14 && moves <20) {
                    //2 star 
                    starsStringRaiting = "two stars ";
                    
                    stars[2].classList.remove("coloerdStar");

                } else if  (moves> 20 && moves< 30 ) {
                    //1 stars
                    starsStringRaiting = "one star ";
                    stars[1].classList.remove("coloerdStar");
                    

                } 
                
                opendCard.push(card);// to counting the opened card
                card.classList.add("open", "show"); //add two class (open and show ) for the clicked card
                //To prevent the user from opening more than two cards
                if (opendCard.length == 2) {
                    //if match
                    if (opendCard[0].dataset.card == opendCard[1].dataset.card) {
                        console.log("Match");
                        CountMatchingCards = CountMatchingCards + 2; 
                        console.log("the open until now are : " + CountMatchingCards);
                        
                            opendCard[0].classList.add("match");
                            opendCard[0].classList.add("show");
                            opendCard[0].classList.add("open");

                            opendCard[1].classList.add("match");
                            opendCard[1].classList.add("show");
                            opendCard[1].classList.add("open");
                            opendCard = []; //to empty the array
                        if (CountMatchingCards == 16) {//i put it in timeout cuse i noteced that its realy fast than show the last card .                 
                            gameEnd = true; 
                            dialog();  
                        }//end if the game end 
                        //window.confirm("Congratulations your  time is : " + minutesTime + " : " + secTime + " and you got  : " + starsStringRaiting);
                        

                    } //end if  match

                    else {
                        //if not match 
                        console.log("Not Match");
                        // shakit
                        opendCard[0].classList.add("notMatch");
                        opendCard[1].classList.add("notMatch");


                        setTimeout(function () {
                            opendCard.forEach(function (card) {
                                card.classList.remove("open", "show","notMatch");
                                
                                opendCard = [];//to empty the array
                            });
                        }, 1000);

                    } //end else if not match



                }//end if the opend cards are 2


                //we need to close the cards and prevent the user to open more than two .

            }//end if the cards have not open and show 
        });  // end of add event listener for each card 
    });// end of add  for each card 
}

/**
* @description Reset cards, time, ratings and then start again
*/
function restartGame(){
    console.log("the restart clicked the values : gameEnd="+gameEnd+"  yes butons"+yesButton);
    restartIsClick=true;
    playAgainFlag = true;
    minutesTime = 0;
    secTime = 0;
    moves = 0;
    CountMatchingCards=0;
    secTimeHTML.innerHTML = secTime;
    menuteTimeHTML.innerHTML = minutesTime;
    playerMoves.innerHTML = moves;
    initGame();
    allCards = document.querySelectorAll(".card"); 
    clearTimeout(timer);
    startTimer();   
    cardEventListener();
}


resatrt.addEventListener("click", function () {
   
    restartGame();

});
//dialog Buttons 
document.querySelector("#noButton").addEventListener("click",function(){
    clearTimeout(timer);
    secTimeHTML.innerHTML = secTime;
    menuteTimeHTML.innerHTML = minutesTime;
    dialogMessge.close();
})
document.querySelector("#yesButton").addEventListener("click",function(){
    console.log("the 1 yes button clicked");
    yesButton=true;
    restartGame();
    dialogMessge.close();
 })

