class TriviaApi {

  constructor() {
  this.BASE_URL = 'https://opentdb.com/api.php?amount=5&type=multiple';
  }
  
  getQuestions() {
    fetch(`${BASE_URL}`)
      .then(res => res.json())
      .catch((err) => {
        console.log(err);
      })
  }

}

export default TriviaApi;
