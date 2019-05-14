import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {

  template() {
    const highScore = this.model.scoreHistory;
    if (!this.model.active && this.model.asked.length === 5) {
      return `<div>Progress: Inactive</div>
      <div>High score = ${Math.max(...highScore)}</div>
      <div>Score = ${this.model.scoreHistory[0]}</div>`;
    }
    else if (!this.model.active) { 
        return `<div>Progress: Inactive</div>
        <div>High score = ${Math.max(...highScore)}</div>
        <div>Score = ${this.model.score}</div>`;
    }
    else {
    return `
    <div>Progress: ${this.model.asked.length} of ${this.model.asked.length + this.model.unasked.length}</div>
    <div>High score = ${Math.max(...highScore)}</div>
    <div>Score = ${this.model.score}</div>
    `;}
}

//do we need update functions?

}

export default QuizStatus;
