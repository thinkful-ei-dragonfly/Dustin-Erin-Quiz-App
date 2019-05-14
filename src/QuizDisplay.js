import Renderer from './lib/Renderer';
//import Quiz from './Quiz';

class QuizDisplay extends Renderer {

  /**
  * This function must return an HTML string
  */
 _generateIntro() {
   return `
    <div>Welcome to our trivia quiz!</div>
    <button type="button" class="start-game">Start</button>
    `
 }

 _generateAskQuestion(question) {
  return `
  <div>
    <p>${question.text}</p>
      <form>
        ${question.answers.map((answer, index) => {
          return `<input type="radio" name="answer" value="${answer}" id="${index}" /> <label for ="${index}">${answer}</label>`;
        }).join('')}
        <button type="submit">Submit</button>
      </form>
    </div>`;
  }

  _generateAnswerResponse() {
    if (this.model.asked[0].answerStatus() === 1) {
    return `
    <div>${this.model.asked[0].text}</div>
    <div>You got it! The correct answer was ${this.model.asked[0].correctAnswer}</div>
    <button type="button" class="next-question">Next</button>
    `
    } else {
      return `
      <div>${this.model.asked[0].text}</div>
      <div>You answered incorrectly.  Your answer was ${this.model.asked[0].userAnswer} and the correct answer was ${this.model.asked[0].correctAnswer}</div>
      <button type="button" class="next-question">Next</button>
      `
    }
  }

  _generateEndofGame() {
    return `<div>End of Game</div>`
  }

  template() {
    // if quiz is inactive and no questions are asked yet, then
    // we're at the intro state of app
    if (!this.model.active && this.model.asked.length === 0) {
      return this._generateIntro();
    }

    const question = this.model.getCurrentQuestion();

    if (this.model.active && (question && !question.userAnswer)) {
      return this._generateAskQuestion(question);
    }

    if (this.model.active && (question && question.userAnswer)) {
      return this._generateAnswerResponse();
    }

    if (!this.model.active && this.model.asked.length === 5) {
      return this._generateEndofGame();
    }

    else {
      return `
      <div>Quiz default</div
      `;
    }
  }

  //display._generate info: never intended to be called directly

  /**
  * This function must return an object
  */
  getEvents() {
    return {
      'click .start-game': 'handleStartGame',
      'submit form': 'handleSubmitAnswer',
      'click .next-question': 'handleMovetoNext'
    };
  }

  /**
  * All event handler functions should call model methods, and end with
  * model.update()
  */ 
  handleStartGame() {
    this.model.startGame();
    //this.model.update();
  }

  handleSubmitAnswer() {
    event.preventDefault();
    this.model.asked[0].submitAnswer(event.target.answer.value);
    console.log(event.target.answer.value);
    //this.model.nextQuestion();
    this.model.updateScore();
    this.model.update();
  }

  handleMovetoNext() {
    if (this.model.unasked.length === 0) {
      this.model.updateScoreHistory();
      this.model.endGame();
      this.model.update();
    } else {
    this.model.nextQuestion();
    this.model.update();
  }
}
}

export default QuizDisplay;