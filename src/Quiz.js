import Question from './Question';

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
    this.active = true;
    //placeholder- getAPI
  }
  moveQuestion() {
    this.asked.push(this.unasked.shift());
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

  // updateScore() {
  //   if (Question.userAnswer && this.userAnswer === this.correctAnswer) {
  //     return 1;
  //   } else if (this.userAnswer && this.userAnswer !== this.correctAnswer) {
  //     return 0;
  //   } else {
  //     return -1;
  //   }
  // }

}

export default Quiz;
