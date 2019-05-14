import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {

  template() {
    if (!this.model.active) {
      return `<div>Game not started</div>`
    } else {
      const highScore = this.model.scoreHistory;
    return `
    <div>Question ${this.model.asked.length} of ${this.model.asked.length + this.model.unasked.length}</div>
    <div>High score = ${Math.max(...highScore)}</div>
    <div>Score = ${this.model.score}</div>
    `}
}

//do we need update functions?

}

export default QuizStatus;

