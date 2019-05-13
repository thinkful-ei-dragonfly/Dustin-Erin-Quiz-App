class Question {
  constructor() {
  this.text = '',
  this.answers = [],
  this.correctAnswer = '',
  this.userAnswer = '';
  }

  submitAnswer(answer) {
    this.userAnswer = answer;
  }

  answerStatus() {
    if (this.userAnswer && this.userAnswer === this.correctAnswer) {
      return 1;
    } else if (this.userAnswer && this.userAnswer !== this.correctAnswer) {
      return 0;
    } else {
      return -1;
    }
  }
}

export default Question;
