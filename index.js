let gamePattern = [];
let userClickedPattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
var started = false;

let level = 0;


//sound function

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();}




//math and stuff you know



function nextSequence() {

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];


  gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);   

 $("#level-title").text("Level " + level);
 level++;
    userClickedPattern = [];
}


// button flashing and sound playing on click test


// $("#green").click(function() {
//     playSound("green");
//     $("#green").addClass("pressed");
//     setTimeout(function() {
//         $("#green").removeClass("pressed");
//     }, 100);
  
// });

// $("#red").click(function() {
//     playSound("red");
 
//     $("#red").addClass("pressed");
//     setTimeout(function() {
//         $("#red").removeClass("pressed");
//     } , 100);
// } );

// $("#yellow").click(function() {
//     playSound("yellow");
//     $("#yellow").addClass("pressed");
//     setTimeout(function() {
//         $("#yellow").removeClass("pressed");
//     } , 100);
// } );  

// $("#blue").click(function() {
//     playSound("blue");
//     $("#blue").addClass("pressed");
//     setTimeout(function() {
//         $("#blue").removeClass("pressed");
//     } , 100);
// } );


//user clicking on button

$(".btn").click(function() {

    if (started === false) {
        
        alert("You have to press a keyboard button to start the game");

    }
    else {
    // (this) is the button that was clicked, ("id") is the id of the button that holds the color value
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    $(this).addClass("pressed");
checkAnswer(userClickedPattern.length - 1);
    }
});

 
  




// game start
$(document).keypress(function() {

    // ! makes started = true, so it will start the game and not restart on keypress
if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
}});

//start over if failed
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    setTimeout(function() {
        $(".btn").removeClass("pressed");
    } , 100);

}

// check answers

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");
        // this function removes the animation from the on click event
        setTimeout(function() {
            $(".btn").removeClass("pressed");
        } , 100);
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        } , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
