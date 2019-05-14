import $ from 'jquery';
import Quiz from './Quiz';
import QuizDisplay from './QuizDisplay';
import QuizStatus from './QuizStatus';


function main() {
  const quiz = new Quiz();
  const status = new QuizStatus(quiz, '.status');
  const display = new QuizDisplay(quiz, '.display');
  window.quiz = quiz;  // adding `q` to `window`, so you can examine it in console
}

$(main);

