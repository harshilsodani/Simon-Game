let userClickedPattern = [];

let gamePattern = [];

let buttonColours = ["red", "blue", "green", "yellow"];

let level = 0;

let started = false;

$(document).keydown(function () {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function () {

    let userchosenColour = $(this).attr("id");
    userClickedPattern.push(userchosenColour);

    playSound(userchosenColour);
    animatePress(userchosenColour);

    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
})

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        if (gamePattern.length === userClickedPattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {
        console.log("wrong");
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");

        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();

    }
}

function nextSequence() {

    userClickedPattern = [];

    level = level + 1;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentcolour) {

    $("#" + currentcolour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentcolour).removeClass("pressed");
    }, 100)

}

function startOver() {
    started = false;
    gamePattern = [];
    level = 0;
}



