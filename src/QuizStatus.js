import Renderer from './lib/Renderer';

class QuizStatus extends Renderer {

  template() {
    const highScore = this.model.scoreHistory;
    let highScoreHistory = this.model.score;
    let progressBar = 'Inactive';

    if (!this.model.active && this.model.asked.length === 5) {
      highScoreHistory= this.model.scoreHistory[0];
    }
    
    if (this.model.active) {
      progressBar= this.model.asked.length + ' of ' + (this.model.asked.length + this.model.unasked.length);
    }
      
    return `
    <div class='status-elements div-1'>Progress: ${progressBar}</div>
    <div class='status-elements div-2'>High score = ${Math.max(...highScore)}</div>
    <div class='status-elements div-3'>Score = ${highScoreHistory}</div>
    `
  }
}

export default QuizStatus;

