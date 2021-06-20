var buttonColors = ["red", "yellow", "green", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

$(".btn").click(function () {
  var userChoosenColor = $(this).attr("id");
  userClickedPattern.push(userChoosenColor);
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChooseColor = buttonColors[randomNumber];
  gamePattern.push(randomChooseColor);
  $("#" + randomChooseColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChooseColor);
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

var gameStart = false;
$(document).on("keyup", function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

$("#start").click(function () {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
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
    $(document).keyup(startOver());
  }
}

function startOver() {
  level = 0;
  gameStart = 0;
  gamePattern = [];
}
