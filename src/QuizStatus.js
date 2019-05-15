import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {

  template() {
    const highScore = this.model.scoreHistory;
    if (!this.model.active && this.model.asked.length === 5) {
      return `<div class='status-elements div-1'>Progress: Inactive</div>
      <div class='status-elements div-2'>High score = ${Math.max(...highScore)}</div>
      <div class='status-elements div-3'>Score = ${this.model.scoreHistory[0]}</div>`;
    }
    else if (!this.model.active) { 
      return `<div class='status-elements div-1'>Progress: Inactive</div>
        <div class='status-elements div-2'>High score = ${Math.max(...highScore)}</div>
        <div class='status-elements div-3'>Score = ${this.model.score}</div>`;
    }
    else {
      return `
    <div class='status-elements div-1'>Progress: ${this.model.asked.length} of ${this.model.asked.length + this.model.unasked.length}</div>
    <div class='status-elements div-2'>High score = ${Math.max(...highScore)}</div>
    <div class='status-elements div-3'>Score = ${this.model.score}</div>
    `;}
  }

}

export default QuizStatus;

