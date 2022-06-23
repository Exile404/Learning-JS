//console.log('hello')
// Challenge 1: Your Age in Days
function ageinDays() {
    var birthyear = prompt("What year you were born???");
    var ageInDays= (2022-birthyear)*365;
    var h1=document.createElement('h1');
    var textAnswer=document.createTextNode('You are '+ageInDays+' days old');
    h1.setAttribute('id','ageinDays');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);

}

function reset(){
    document.getElementById('ageinDays').remove();

}

function generateCat(){
    var image=document.createElement("img");
    var div=document.getElementById("flex-cat-gen")
    image.src="https://c.tenor.com/ZhfMGWrmCTcAAAAS/cute-kitty-best-kitty.gif";
    div.appendChild(image);

}
// Challenge 3
function rpsGame(choice){
    // console.log(choice)
    var user,com;
    user=choice.id;
    com=numberToChoice(randToRpsInt())
    // console.log('Comp',com);
    results=decideWinner(user,com);
    // console.log(results)
    message=finalMessage(results)
    // console.log(message)
    rpsFrontEnd(choice.id,com,message)
}

function randToRpsInt(){
    return Math.floor(Math.random()*3);
}

function numberToChoice(number){
    return ['rock','paper','scissors'][number];
}

function decideWinner(user,com){
    var rpsDatabase={
        'rock':{'scissors':1,'rock':0.5,'paper':0},
        'paper':{'scissors':0,'rock':1,'paper':0.5},
        'scissors':{'scissors':0.5,'rock':0,'paper':1},
    }
    var yourScore=rpsDatabase[user][com];
    var comScore=rpsDatabase[com][user];
    return [yourScore,comScore];
}
function finalMessage([yourScore,comScore]){
    if(yourScore === 0){
        return{'message':'You Lost!!','color':'red'};
    }
    else if(yourScore===0.5) {
        return {'message': 'You Tied!!', 'color': 'yellow'};
    }
    else
    {
        return {'message': 'You Won!!', 'color': 'green'};

    }
}

function rpsFrontEnd(humanImageChoice,botImageChoice,finalMessage){
    var imagesDatabase={
        'rock':document.getElementById('rock').src,
        'paper':document.getElementById('paper').src,
        'scissors':document.getElementById('scissors').src,
    }
    // remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv=document.createElement('div');
    var botDiv=document.createElement('div');
    var messageDiv=document.createElement('div');

    humanDiv.innerHTML="<img src='"+imagesDatabase[humanImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
    messageDiv.innerHTML="<h1 style='color: "+finalMessage['color']+"; font-size: 60px; padding: 30px;'>"+finalMessage['message']+"</h1>"
    botDiv.innerHTML="<img src='"+imagesDatabase[botImageChoice]+"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,24,1)'>";

    document.getElementById('flex-box-rpx-div').append(humanDiv);
    document.getElementById('flex-box-rpx-div').append(messageDiv)
    document.getElementById('flex-box-rpx-div').append(botDiv);

}
// Challenge 4:
let all_buttons=document.getElementsByTagName('button');
// console.log(all_buttons);
let copyAllButtons=[];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}
console.log(copyAllButtons);

function buttonColorChange(clickObject){
    if(clickObject.value==='red'){
        buttonsRed();
    }
    else if(clickObject.value==='green'){
        buttonsGreen();
    }
    else if(clickObject.value==='reset'){
        buttonColorReset();
    }
    else if(clickObject.value==='random'){
        randomColors();
    }
}

function buttonsRed(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}
function buttonsGreen(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}
function buttonColorReset(){
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    let choices=['btn-primary','btn-danger','btn-warning','btn-success'];
    for(let i=0;i<all_buttons.length;i++){
        let rand=Math.floor(Math.random()*4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[rand]);
    }
}

//Final Challenge: Blackjack

let blackjackGame={
    'you':{'scoreSpan':"#your-blackjack-result",'div':'#your-box','score':0},
    'dealer':{'scoreSpan':"#dealer-blackjack-result",'div':'#dealer-box','score':0},
    'cards':['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
    'cardsMap':{'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]},
    'wins':0,
    'losses':0,
    'draws':0,
    'isStand':false,
    'turnsover':false,
    'clickbutton':false,

}


const YOU=blackjackGame["you"]
const DEALER=blackjackGame["dealer"]

const hitSound=new Audio('static/sounds/swish.m4a');

const winSound=new Audio('static/sounds/cash.mp3');

const lossSound= new Audio('static/sounds/aww.mp3')

document.querySelector('#blackjack-hit').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand').addEventListener('click',dealerLogic);
document.querySelector('#blackjack-deal').addEventListener('click',blackjackDeal);




function showCard(card,activePlayer){
    if(activePlayer['score']<=21){
    let cardImage=document.createElement('img');
    cardImage.src=`static/images/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(cardImage);
    hitSound.play();
    }

}

function blackjackHit(){
    if(blackjackGame["isStand"]===false) {
        let card = randomCards()

        showCard(card, YOU);
        updateScore(card, YOU);
        showScore(YOU)
    }

}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

async function dealerLogic(){
    blackjackGame["isStand"]=true;
    if(blackjackGame['clickbutton']===false) {
        blackjackGame["clickbutton"]=true;
        while (DEALER["score"] < 16 && blackjackGame['isStand'] === true) {
            let card = randomCards()
            console.log(card)
            showCard(card, DEALER);
            updateScore(card, DEALER);
            showScore(DEALER);
            await sleep(1000);
        }

        blackjackGame["turnsover"] = true;
        let winner = computeWinner();
        showResult(winner);
    }
}

function blackjackDeal(){
    if(blackjackGame["turnsover"]===true) {
        let yourImages = document.querySelector("#your-box").querySelectorAll('img');
        let dealerImages = document.querySelector("#dealer-box").querySelectorAll('img');
        for (let i = 0; i < yourImages.length; i++) {
            yourImages[i].remove();
        }
        for (let i = 0; i < dealerImages.length; i++) {
            dealerImages[i].remove();
        }

        YOU['score'] = 0;
        DEALER['score'] = 0;

        document.querySelector('#your-blackjack-result').textContent = 0;
        document.querySelector('#dealer-blackjack-result').textContent = 0;
        document.querySelector('#your-blackjack-result').style.color = '#ffffff';
        document.querySelector('#dealer-blackjack-result').style.color = '#ffffff';
        document.querySelector('#blackjack-result').textContent = "Let's Play";
        document.querySelector('#blackjack-result').style.color = '#000000';
        blackjackGame["isStand"] = false;
        blackjackGame["turnsover"] = false;
        blackjackGame["clickbutton"]=false;
    }
}

function  showScore(activePlayer){
    if(activePlayer['score']>21) {
        document.querySelector(activePlayer['scoreSpan']).textContent="BUST";
        document.querySelector(activePlayer['scoreSpan']).style.color="red";
    }
    else {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];

    }
}
function randomCards(){
    let randomInd=Math.floor(Math.random()*13);
    return blackjackGame["cards"][randomInd];

}



function updateScore(card,activePlayer){
    if(card==='A') {
        if (activePlayer['score' + blackjackGame["cardsMap"][card][1] <= 21]) {
            activePlayer['score']+=blackjackGame["cardsMap"][card][1];
        }
        else
        {
            activePlayer['score']+=blackjackGame["cardsMap"][card][0];
        }
    }
    else {
        activePlayer['score'] += blackjackGame["cardsMap"][card];
    }
}




function computeWinner(){
    let winner;

    if(YOU['score']<=21){
        if(YOU['score']>DEALER['score'] || (DEALER['score']>21)){
            console.log("YOU WON!!!");
            blackjackGame["wins"]++;
            winner=YOU;

        }
        else if(YOU['score']<DEALER['score']){
            console.log("YOU LOST!!!!!");
            winner=DEALER;
        }
        else if(YOU["score"]===DEALER["score"])
        {
            console.log("YOU DREW!!!!!")
        }
    }
    else if(YOU['score']>21 && DEALER['score']<=21){
        console.log("YOU LOST!!!");
        winner=DEALER;
        blackjackGame["losses"]++;
    }
    else if(YOU['score']>21 && DEALER['score']>21){
        console.log("YOU DREW!!!");
        blackjackGame["draws"]++;
    }
    console.log("Winner is",winner);
    return winner;
}


function showResult(winner){
    if(blackjackGame["turnsover"]===true) {


        let message, messageColor;
        if (winner === YOU) {
            document.querySelector('#wins').textContent = blackjackGame["wins"];
            message = 'You won!!!';
            messageColor = 'Green';
            winSound.play();
        } else if (winner === DEALER) {
            document.querySelector('#losses').textContent = blackjackGame["losses"];
            message = 'You lost!!!';
            messageColor = 'red';
            lossSound.play();
        } else {
            document.querySelector('#draws').textContent = blackjackGame["draws"];
            message = 'You drew!!!';
            messageColor = 'black';
        }
        document.querySelector('#blackjack-result').textContent = message;
        document.querySelector('#blackjack-result').style.color = messageColor;
    }

}
