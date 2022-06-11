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