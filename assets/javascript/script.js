$(document).ready(() => {

  var xhr = $.get("https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=multiple");
  xhr.done(function(data) {

    console.log("success got data", data);


    let dataArray = data.results;
    let categoryDisplay = dataArray.category;
    console.log('cat disp: ' + categoryDisplay);
    for (var i = 0; i < dataArray.length; i++) {
      console.log('data array questions: ' + dataArray[i].question);

      let questions = dataArray[i].question;
      let correctAnswer = dataArray[i].correct_answer;
      console.log('correct answer: ' + correctAnswer);
      let wrongAnswers = dataArray[i].incorrect_answers;
      console.log('wrong answers ' + wrongAnswers);

      let displayCategory = $("<h1 class='text-left'>").html(categoryDisplay);
      let displayQuestions = $("<h3 class='text-left'>").html(questions);
      let displayCorrectAnswer = $("<p class='text-left'>").html(correctAnswer);
      
      let displayMultChoice = $('input:radio[name= "correct"]:checked').val();
      
      
     

      let questDiv = $("<div class='questions'>");
      let br = $('<br/>');

      questDiv.prepend(displayCategory)
      questDiv.append(displayQuestions,displayCorrectAnswer,br, displayMultChoice,br, wrongAnswers);
      $('#question-div').append(questDiv)


    }



  });

});