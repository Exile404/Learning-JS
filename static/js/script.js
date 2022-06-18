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
