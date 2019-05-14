import Question from './Question';
import TriviaApi from './TriviaApi';
import Model from './lib/Model.js';

class Quiz extends Model{

  static DEFAULT_QUIZ_LENGTH = 2;

  constructor() {
    //look up the inheritance chain for the iherited class's constructor
    super();
    // Array of Question instances
    this.unasked = [];
    // Array of Question instances
    this.asked = [];
    this.active = false;
    this.score = 0;
    this.scoreHistory = [0];

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
        this.asked.unshift(this.unasked.shift());
        this.update();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  getCurrentQuestion() {
    return this.asked[0];
  }

  //this works
  nextQuestion() {
    if (!this.asked[0].userAnswer) {
    console.log('Please provide an answer to the question');
    }
    else {
      this.asked.unshift(this.unasked.shift());
    }
  }
//this works
  updateScoreHistory() {
    if (this.asked.length === 5) {
      this.scoreHistory.unshift(this.score);
    }
  }
  //this works
  endGame() {
    this.active = false;
    this.score = 0;
  }
 //this works
  updateScore() {
    if (this.asked[0].userAnswer === this.asked[0].correctAnswer) {
      this.score ++;
  }

}

}

export default Quiz;
