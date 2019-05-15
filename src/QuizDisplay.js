import Renderer from './lib/Renderer';
//import Quiz from './Quiz';

class QuizDisplay extends Renderer {

  /**
  * This function must return an HTML string
  */
  _generateIntro() {
    return `
    <header class='title' role="banner"><h1>Welcome to our trivia quiz!<h1></header>
    <h2 class='title'>Test your smarts and see how high you can score</h2>
    <button type="button" class="start-game">Start</button>
    `;
  }

  _generateAskQuestion(question) {
    return `
  <section class='title' role="region">
    <p class='title'>${question.text}</p>
      <form>
        ${question.answers.map((answer, index) => {
    return `<div class='answers'><input type="radio" name="answer" value="${answer}" id="${index}" /> <label for ="${index}">${answer}</label></div>`;
  }).join('')}
        <button type="submit">Submit</button>
      </form>
    </section>`;
  }

  _generateAnswerResponse() {
    if (this.model.asked[0].answerStatus() === 1) {
      return `
    <h3 class="title">${this.model.asked[0].text}</h3>
    <h3 class="title">You got it! The correct answer was <span class="correct">${this.model.asked[0].correctAnswer}</span></h3>
    <button type="button" class="next-question">Next</button>
    `;
    } else {
      return `
      <h3 class="title">${this.model.asked[0].text}</h3>
      <h3 class="title">You answered incorrectly.  Your answer was <span class="incorrect">${this.model.asked[0].userAnswer}</span> and the correct answer was <span class="correct">${this.model.asked[0].correctAnswer}</span></h3>
      <button type="button" class="next-question">Next</button>
      `;
    }
  }

  _generateEndofGame() {
    const scores = this.model.scoreHistory;
    if (this.model.scoreHistory[0] === Math.max(...scores)) {
      return `
    <h2 class="title">Great Job!</h2>
    <h3 class="title">Your Final Score was ${this.model.scoreHistory[0]} out of 5</h3>
    <h3 class="title">That's a new high score</h3>
    <button type ="button" class = "play-again">Play Again</button>
    `;
    }
    else {
      return `<h3 class="title">Great Job!</h3>
    <h3 class="title">Your Final Score was ${this.model.scoreHistory[0]} out of 5</h3>
    <button type ="button" class = "play-again">Play Again</button>`;
    }
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
      <p>Quiz default</p>
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
      'click .next-question': 'handleMovetoNext',
      'click .play-again': 'handleRestart'
    };
  }

  /**
  * All event handler functions should call model methods, and end with
  * model.update()
  */ 
  handleRestart() {
    this.model.restartGame();
    this.model.update();
  }

  handleStartGame() {
    this.model.startGame();
    //this.model.update();
  }

  handleSubmitAnswer() {
    event.preventDefault();
    if (!event.target.answer.value) {
      alert('Please select an answer');
      throw new Error('Please select an answer');
    }
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