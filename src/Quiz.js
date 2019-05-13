import Question from './Question';
import TriviaApi from './TriviaApi';

class Quiz {

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;
    this.score = 0;
    this.scoreHistory = [];

    // TASK: Add more props here per the exercise

  }

  //Start Game function is working
  startGame() {
    this.asked = [];
    this.active = true;
    const trivia = new TriviaApi();
    trivia.getQuestions().then(res => {
        res.results.forEach(item => {
          let question = new Question();
          question.text = item.question;
          question.answers = [item.correct_answer, ...item.incorrect_answers];
          question.correctAnswer = item.correct_answer;
          question.userAnswer = '';

          this.unasked.push(question);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //this works
  moveQuestion() {
    this.asked.unshift(this.unasked.shift());
    console.log(this.asked);
    console.log(this.unasked);
  }
//this works
  updateScoreHistory() {
    if (this.asked.length === 5) {
      this.scoreHistory.push(this.score);
    }
  }
  //this works
  endGame() {
    this.active = false;
    this.score = 0;
  }
 //this works
  updateScore() {
    if (this.asked[0].userAnswer === this.asked[0].correct_answer) {
      this.score ++;
  }

}

}

export default Quiz;
