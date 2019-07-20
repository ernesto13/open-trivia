$(document).ready(() => {

  var xhr = $.get("https://opentdb.com/api.php?amount=15&category=9&difficulty=easy&type=boolean");
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
      let displayQuestions = $("<div class='text-left h4'>").html(questions);
      //       let displayQuestions = $('<ul>').html('<li>' +  questions + '</li>');


      let displayCorrectAnswer = $("<p class='text-left'>").html(correctAnswer);
      let displayWrongAnswer = $("<p class='text-left'>").html(wrongAnswers)
      //       let displayMultChoice = $('input:radio[name= "correct"]:checked').val(correctAnswer);



      //        let staticSource = giphySearch[i].images.original_still.url;
      let radioBtn = $("<input>");
      radioBtn.attr("type", 'radio');
      radioBtn.attr('name', 'correct');
      radioBtn.attr('value', correctAnswer)
      radioBtn.attr('data-index', i);

      radioBtn.prepend(displayCorrectAnswer);




      let questDiv = $("<div class='questions list-group-item'>");
      let br = $('<br/>');

      questDiv.prepend(displayCategory)
      //       questDiv.append(radioBtn)
      questDiv.append(displayQuestions, br, displayCorrectAnswer, displayWrongAnswer, radioBtn);
      $('#question-div').append(questDiv)


    }



  });

});