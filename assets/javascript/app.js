//create multiple choice questions
//set timer for a certain amount of time to complete quiz
//game ends when time runs out.
//then, page automatically reveals their score: Amount correct vs incorrect
//player can only click/pick one answer per question

$(document).ready(function() {
    $("#resetb, #correct, #wrong, #timeup").hide();

    var questions = [
        {
            question:"which of the plastics is most likely to wear plaid?",
            choices: ["Regina","Karen","Cady","Gretchen"],
            answer: 3
        },
        {
            question:"On what day did Aaron Samuels ask Cady what day it was?",
            choices: ["October 3rd","October 4th","September 3rd","November 4th"],
            answer: 0
        },
        {
            question:"What High School did the mean girls go to?",
            choices: ["South Shore","North Side","North Shore","South Side"],
            answer: 2
        },
        {
            question:"what do people call Regina's click?",
            choices: ["the fake girls","the plastics","the pink ladies","the plastic chicks"],
            answer: 1
        },
        {
            question:"what grade is caddy in?",
            choices: ["9th","10th","11th","12th"],
            answer: 2
        },
        {
            question:"which of the following is not one of the resources Cady Wants to cut off of Regina's?",
            choices: ["Army of skanks","Aaron Samuels","Good Physique","Her money"],
            answer: 3
        }
    ];

    var rightCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var intervalId;
    var timer = 10;
    var yourChoice = "";
    var running = false;
    var qCount = questions.length;
    var pick;
    var index;
    var newArray = [];
    var qholder = [];
    var timeout;

    $("#startb").on("click", function() {
        $("#startb").hide();
        showQuestions();
        runTimer();
        for (var i = 0; i < questions.length; i++) {
          qholder.push(questions[i]);
        }

    });

    function runTimer() {
        if(!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function decrement() {
        $("#Tremaining").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;
        if (timer === 0){
            unanswerCount++;
        

        setTimeout(function() {
            $("#questionaire").html(
            "<p>TIME IS UP! CORRECT ANSWER: " + pick.choices[pick.answer] + "<p>"
            );
        
        $("#Tremaining").hide();
        stop();
        $(".answerchoice").hide();
        $("#timeup").show();
        finish();
         }, 1800);
        }
     }
        function stop(){
            running = false;
            clearInterval(intervalId);
        }

        function showQuestions() {
            setTimeout(function(){
            $("#Tremaining").show();
            }, 1000);
            runTimer();
            index = Math.floor(Math.random() * questions.length);
            pick = questions[index];
            $("#resetb, #correct, #wrong, #timeup").hide();

            $("#questionaire").html(pick.question);
            for (var i = 0; i < pick.choices.length; i++){
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choices[i]);
                userChoice.attr("data-guessvalue", i);
                $("#answers").append(userChoice);
            }

            $(".answerchoice").on("click", function(){
                yourChoice = parseInt($(this).attr("data-guessvalue"));

                if (yourChoice === pick.answer) {
                    stop();
                    rightCount++;
                    yourChoice = "";
                    $("#questionaire").html("<p>Correct!</p>");
                    $(".answerchoice").hide();
                    $("#correct").show();
                    $("#Tremaining").hide();
                    finish(); 
                } else {
                    stop();
                    wrongCount++;
                    yourChoice = "";
                    $("#questionaire").html(
                      "<p>Wrong! The correct answer is: " +pick.choices [pick.answer] + "</p>"
                    );

                    $(".answerchoice").hide();
                    $("#wrong").show();
                    $("#Tremaining").hide();
                     finish();
                }
            });
        }

    function finish() {
        newArray.push(pick);
        questions.splice(index, 1);

        timeout2 = setTimeout(function() {
            $("#answers").empty();
            timer = 10;

        if(wrongCount + rightCount + unanswerCount === qCount){
            $("#questionaire").empty();
            $("#resetb, #correct, #wrong, #timeup").hide();
            $("#questionaire").html("<h3>Game Over! Score:</h3>");
            $("#answers").append("<h4> Correct: " + rightCount + "</h4>");
            $("#answers").append("<h4> Incorrect: " + wrongCount + "</h4>");
            $("#answers").append("<h4> Unanswered: " + unanswerCount + "</h4>");
            $("#resetb").show();

            rightCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
        } else {
           showQuestions(); 
        }
        }, 3000);
    }

    $("#resetb").on("click", function(){
        $("#resetb").hide();
        $("#answers").empty();
        $("#questions").empty();
        for (var i = 0; i < qholder.length; i++) {
            questions.push(qholder[i]);
        }
        runTimer();
        showQuestions();
    });
 
});