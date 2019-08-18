/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

(function () {
    function Question (question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.displayQuestion = function () {
        console.log(this.question);

        for(var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    };

    Question.prototype.checkAnswer = function (answer, keepScore) {
        var score;

        if (parseInt(answer) === this.correctAnswer) {
            console.log("Correct answer!");
            score  = keepScore(true);
        } else {
            console.log("Wrong answer. Try harder!");
            score = keepScore(false);
        }

        this.displayScore(score);
    };

    Question.prototype.displayScore = function (score) {
        console.log('Your current score is: ' + score);
        console.log('-------------------------');
    };

    function manageScore() {
        var score = 0;

        return function (correct) {
            if (correct) {
                score += 1;
            }

            return score;
        }
    }
    var keepScore = manageScore();

    var question1 = new Question("Is JavaScript the coolest programming language in the world?", ["Yes", "No"], 0);
    var question2 = new Question("What is the name of the founder of Newton's laws?", ["John", "Adam", "Isaac"], 2);
    var question3 = new Question("What is the capital of Texas state?", ["Houston", "Dallas", "San Antonio", "Austin"], 3);

    var questions = [question1, question2, question3];

    function nextQuestion() {
        var n = Math.floor(Math.random() * questions.length);

        questions[n].displayQuestion();

        var answer = prompt('Select correct answer (just type the number). Or type exit to quit.');

        if (answer !== 'exit') {
            questions[n].checkAnswer(parseInt(answer), keepScore);

            nextQuestion();
        }
    }

    nextQuestion();
})();
