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

  startGame() {
    this.asked = [];
    this.active = true;
    TriviaApi.getQuestions() 
      .then(res => {
        res.results.forEach(item => this.unasked.push(item));
      })
      .catch((err) => {
        console.log(err);
      })
  }
  moveQuestion() {
    this.asked.unshift(this.unasked.shift());
    console.log(this.asked);
    console.log(this.unasked);
  }
  updateScoreHistory() {
    if (this.asked.length === 5) {
      this.score.History.push(this.score);
    }
  }
  endGame() {
    this.active = false;

  }

  updateScore() {
    if (this.asked[0].userAnswer === this.asked[0].correctAnswer) {
      this.score ++;
  }

}

export default Quiz;
