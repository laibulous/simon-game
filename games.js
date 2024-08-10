var buttonColors=["red", "blue", "green", "yellow"];
var userClickedPattern=[];
var gamePattern=[];

var level=0;
var started=false;
var highScore=0;
var isMuted=false;
var volume=1;

$("#start-btn").on("click", function(){
    startGame();    
});

$(".btn").on("click", function(){
            
    $(this).fadeOut(100).fadeIn(100);
    var userChosenColor=$(this).attr("id");

    playSounds(userChosenColor);
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    
    checkAnswer(userClickedPattern.length-1);
});

$("#mute-button").on("click", function(){
    isMuted=!isMuted;
    $("#mute-button").text(isMuted?"UnMute":"Mute");
});
$("#volume-slider").on("input", function(){
    volume=$(this).val();
})

if(localStorage.getItem("highScore")){
    highScore= parseInt(localStorage.getItem("highScore"));
    $("#high-score").text("High Score:"+highScore);
}

$("#guide-btn").on("click", function(){
    window.location.href = './guide.html';
});

function startGame(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=true;
    $("#level-title").text("Score: 0");
    $("#start-btn").text("Restart Game");
    nextSequence();
}

function playSounds(buttonPressed){
    if(!isMuted){
     var audio= new Audio("./sounds/"+buttonPressed+".mp3");
     audio.volume=volume;
    audio.play();
    }
    

}

function nextSequence(){
    userClickedPattern=[];
    var score=(level*(level+1))/2; 
    level++;
    $("#level-title").text("Score: "+score);
   
    var randomNumber= Math.floor(Math.random()*4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    var buttonID="#"+randomChosenColor;
    setTimeout( function(){
        $(buttonID).fadeOut(100).fadeIn(100);     
        playSounds(randomChosenColor);
    }, 1000);
   
    if(score>highScore){
        highScore=score;
        localStorage.setItem("highScore", highScore);
        $("#high-score").text("High Score:"+highScore);
    }
    
}

function animatePress(currentColor){
    var colorID="#"+currentColor;
    $(colorID).addClass("pressed");
    setTimeout(function(){
        $(colorID).removeClass("pressed");
    },100);
}       
   

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    
}
   


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
       if(gamePattern.length===userClickedPattern.length){
        nextSequence();
       }
    }
    else{
        playSounds("wrong");
        $("h1").text("Game Over :(");
        $("#score").text("Score: 0");
        $("body").addClass("game-over");

        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}






